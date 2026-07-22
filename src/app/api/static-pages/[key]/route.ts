import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import StaticPage from "@/models/StaticPage";
import { ok, fail } from "@/lib/apiResponse";
import { dbErrorMessage } from "@/lib/crudFactory";
import { requireRole } from "@/middleware/authz";
import { logActivity } from "@/services/activityLog";

const VALID_KEYS = ["privacy-policy", "terms"];

const updateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

/**
 * CMS-managed static content blocks (Phase 8: "Privacy Policy and Terms
 * and Conditions, both stored as CMS-managed static content blocks,
 * editable by Super Admin"). Auto-creates a default document on first GET
 * so the page always has *something* to render, same upsert pattern as
 * the singleton settings.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) return fail("Unknown page key.", [], 404);

  try {
    await connectDB();
  } catch (err) {
    return fail(dbErrorMessage(err), [], 503);
  }

  const doc = await StaticPage.findOneAndUpdate(
    { key },
    { $setOnInsert: { key, title: key === "privacy-policy" ? "Privacy Policy" : "Terms and Conditions", content: "" } },
    { upsert: true, new: true }
  );

  return ok(doc);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!VALID_KEYS.includes(key)) return fail("Unknown page key.", [], 404);

  const auth = await requireRole(req, ["Super Admin"]);
  if (!auth.ok) return fail(auth.message, [], auth.status);

  try {
    await connectDB();
  } catch (err) {
    return fail(dbErrorMessage(err), [], 503);
  }

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return fail("Validation failed.", parsed.error.issues);

  const doc = await StaticPage.findOneAndUpdate(
    { key },
    { $set: parsed.data },
    { upsert: true, new: true }
  );

  void logActivity({
    actorEmail: auth.user.email,
    action: "content_update",
    description: `${auth.user.email} updated the ${key} static page.`,
    collectionName: "StaticPage",
    recordId: key,
  });

  return ok(doc, "Page updated successfully.");
}
