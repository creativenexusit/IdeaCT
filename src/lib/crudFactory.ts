import { NextRequest } from "next/server";
import type { Model } from "mongoose";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { ok, fail } from "./apiResponse";
import { logActivity } from "@/services/activityLog";
import {
  getServices, getServiceCategories, getTrainings, getTrainingCategories,
  getClients, getPortfolio, getExpertTeam, getLeadership,
  getBlogs, getBlogCategories, getGalleryItems, getCertificates,
  getDownloads, getFaqs, getTestimonials, getPartners,
} from "@/lib/content";

// Map from Mongoose model name → content getter
const MOCK_GETTERS: Record<string, () => Promise<any[]>> = {
  Service: getServices,
  ServiceCategory: getServiceCategories,
  Training: getTrainings,
  TrainingCategory: getTrainingCategories,
  Client: getClients,
  Portfolio: getPortfolio,
  ExpertTeam: getExpertTeam,
  Leadership: getLeadership,
  Blog: getBlogs,
  BlogCategory: getBlogCategories,
  Gallery: getGalleryItems,
  Certificate: getCertificates,
  Download: getDownloads,
  Faq: getFaqs,
  Testimonial: getTestimonials,
  Partner: getPartners,
};

/**
 * Generic CRUD handler factory shared by every collection route.
 */

type CrudOptions = {
  model: Model<any>;
  collectionName?: string;
  createSchema: z.ZodTypeAny;
  updateSchema?: z.ZodTypeAny;
  filterableFields?: string[];
  searchableFields?: string[];
  populate?: string[];
  /** Field names that hold Cloudinary image URLs — old images are auto-deleted */
  imageFields?: string[];
};

export function dbErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("DATABASE_URL")) {
    return "The database is not configured on this server yet (DATABASE_URL is not set).";
  }
  if (
    msg.includes("ETIMEDOUT") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("querySrv") ||
    msg.includes("server selection")
  ) {
    return (
      "Could not reach the MongoDB Atlas cluster (network/DNS timeout). " +
      "In MongoDB Atlas, open Network Access and make sure this server's " +
      "public IP is in the allow list (or temporarily allow 0.0.0.0/0 to test), " +
      "then try again."
    );
  }
  if (msg.includes("Authentication failed") || msg.includes("bad auth")) {
    return "MongoDB authentication failed. Double-check the username/password in DATABASE_URL.";
  }
  return `Database error: ${msg}`;
}

export function buildSort(sort: string | null) {
  switch (sort) {
    case "oldest":
      return { createdAt: 1 };
    case "alphabetical":
      return { title: 1, name: 1 } as Record<string, 1 | -1>;
    case "newest":
    default:
      return { createdAt: -1 };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Cloudinary helpers
// ─────────────────────────────────────────────────────────────────────────────

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return false;
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  return true;
}

/**
 * Extracts the Cloudinary public_id from a secure_url.
 * e.g. "https://res.cloudinary.com/demo/image/upload/v123/ideact/hero/abc.jpg"
 *   → "ideact/hero/abc"
 */
function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

/** Fire-and-forget: delete an image from Cloudinary by URL */
async function deleteCloudinaryImage(url: string) {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return;
  const publicId = extractPublicId(url);
  if (!publicId) return;
  if (!configureCloudinary()) return;
  try {
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch (err) {
    console.warn("[cloudinary] Failed to delete image:", publicId, err);
  }
}

/** Compare old and new image fields and delete replaced Cloudinary images */
async function cleanupReplacedImages(
  oldDoc: Record<string, any>,
  newData: Record<string, any>,
  imageFields: string[]
) {
  for (const field of imageFields) {
    const oldVal = oldDoc[field];
    const newVal = newData[field];

    if (Array.isArray(oldVal)) {
      // It's an array of URLs (e.g., gallery images)
      const newUrls = Array.isArray(newVal) ? newVal : [];
      for (const oldUrl of oldVal) {
        if (oldUrl && typeof oldUrl === "string" && !newUrls.includes(oldUrl)) {
          void deleteCloudinaryImage(oldUrl);
        }
      }
    } else if (oldVal && typeof oldVal === "string") {
      // It's a single URL string
      if (newVal !== oldVal) {
        void deleteCloudinaryImage(oldVal);
      }
    }
  }
}

/** Delete all Cloudinary images from a record when it is archived/deleted */
async function cleanupAllImages(
  doc: Record<string, any>,
  imageFields: string[]
) {
  for (const field of imageFields) {
    const val = doc[field];
    if (Array.isArray(val)) {
      for (const url of val) {
        if (url && typeof url === "string") {
          void deleteCloudinaryImage(url);
        }
      }
    } else if (val && typeof val === "string") {
      void deleteCloudinaryImage(val);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUD factory
// ─────────────────────────────────────────────────────────────────────────────

export function createCrudHandlers({
  model,
  collectionName,
  createSchema,
  updateSchema,
  filterableFields = [],
  searchableFields = [],
  populate = [],
  imageFields = [],
}: CrudOptions) {
  const label = collectionName ?? model.modelName;

  async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, Number(searchParams.get("page")  ?? 1));
    const limit  = Math.max(1, Number(searchParams.get("limit") ?? 20));
    const search = searchParams.get("search")?.toLowerCase() ?? "";

    try {
      await connectDB();

      const sort   = buildSort(searchParams.get("sort"));
      const filter: Record<string, unknown> = { isDeleted: { $ne: true } };
      const status = searchParams.get("status");
      if (status) filter.status = status;
      for (const field of filterableFields) {
        const value = searchParams.get(field);
        if (value !== null) {
          filter[field] = value === "true" ? true : value === "false" ? false : value;
        }
      }
      if (search && searchableFields.length > 0) {
        filter.$or = searchableFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        }));
      }

      let query = model
        .find(filter)
        .sort(sort as Record<string, 1 | -1>)
        .skip((page - 1) * limit)
        .limit(limit);
      for (const p of populate) query = query.populate(p);
      const [items, total] = await Promise.all([query.exec(), model.countDocuments(filter)]);
      return ok({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
    } catch {
      // DB unavailable — serve mock data so the admin panel is usable offline
      const getter = MOCK_GETTERS[label];
      if (getter) {
        try {
          let allItems = await getter();
          if (search) {
            allItems = allItems.filter((item: any) =>
              searchableFields.some((f) => String(item[f] ?? "").toLowerCase().includes(search))
            );
          }
          const total = allItems.length;
          const items = allItems.slice((page - 1) * limit, page * limit);
          return ok({
            items,
            pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
          });
        } catch {}
      }
      return ok({ items: [], pagination: { page, limit, total: 0, totalPages: 1 } });
    }
  }

  async function POST(req: NextRequest) {
    try {
      await connectDB();
    } catch (err: any) {
      return fail(dbErrorMessage(err), [], 503);
    }
    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body.");

    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed.", parsed.error.issues);
    }

    try {
      const created = await model.create(parsed.data as Record<string, unknown>);
      void logActivity({
        action: "content_create",
        description: `Created a ${label} record.`,
        collectionName: label,
        recordId: String(created._id),
      });
      return ok(created, "Created successfully.", 201);
    } catch (err: any) {
      if (err?.code === 11000) {
        return fail("A record with this value already exists.", [err.keyValue], 409);
      }
      return fail("Failed to create record.", [String(err?.message ?? err)], 500);
    }
  }

  async function PUT(req: NextRequest) {
    try {
      await connectDB();
    } catch (err: any) {
      return fail(dbErrorMessage(err), [], 503);
    }
    const body = await req.json().catch(() => null);
    if (!body?._id) return fail("An _id is required to update a record.");

    const schema = updateSchema ?? (createSchema as z.ZodObject<z.ZodRawShape>).partial();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed.", parsed.error.issues);
    }

    // Fetch existing record BEFORE update so we can compare image URLs
    try {
      const existing = imageFields.length > 0
        ? await model.findOne({ _id: body._id, isDeleted: { $ne: true } }).lean()
        : null;

      const updated = await model.findOneAndUpdate(
        { _id: body._id, isDeleted: { $ne: true } } as Record<string, unknown>,
        { $set: parsed.data as Record<string, unknown> },
        { new: true }
      );

      if (!updated) return fail("Record not found.", [], 404);

      // Delete replaced Cloudinary images in the background
      if (existing && imageFields.length > 0) {
        void cleanupReplacedImages(
          existing as Record<string, any>,
          parsed.data as Record<string, any>,
          imageFields
        );
      }

      void logActivity({
        action: "content_update",
        description: `Updated a ${label} record.`,
        collectionName: label,
        recordId: String(updated._id),
      });
      return ok(updated, "Updated successfully.");
    } catch (err: any) {
      if (err?.code === 11000) {
        return fail("A record with this value already exists.", [err.keyValue], 409);
      }
      return fail("Failed to update record.", [String(err?.message ?? err)], 500);
    }
  }

  async function DELETE(req: NextRequest) {
    try {
      await connectDB();
    } catch (err: any) {
      return fail(dbErrorMessage(err), [], 503);
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return fail("An id query parameter is required.");

    // Fetch before soft-delete so we can clean up Cloudinary images
    try {
      const existing = imageFields.length > 0
        ? await model.findOne({ _id: id, isDeleted: { $ne: true } }).lean()
        : null;

      const deleted = await model.findOneAndUpdate(
        { _id: id, isDeleted: { $ne: true } },
        { $set: { isDeleted: true } },
        { new: true }
      );

      if (!deleted) return fail("Record not found.", [], 404);

      // Delete Cloudinary images in the background
      if (existing && imageFields.length > 0) {
        void cleanupAllImages(existing as Record<string, any>, imageFields);
      }

      void logActivity({
        action: "content_delete",
        description: `Archived a ${label} record.`,
        collectionName: label,
        recordId: String(deleted._id),
      });
      return ok(deleted, "Deleted successfully.");
    } catch (err: any) {
      return fail("Failed to delete record.", [String(err?.message ?? err)], 500);
    }
  }

  return { GET, POST, PUT, DELETE };
}
