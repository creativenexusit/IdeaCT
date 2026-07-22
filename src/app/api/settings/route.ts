import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import WebsiteSettings from "@/models/WebsiteSettings";
import { ok, fail } from "@/lib/apiResponse";
import { requireRole } from "@/middleware/authz";
import { logActivity } from "@/services/activityLog";

// Fields a Manager is allowed to touch (Phase 2 field-level permission rule).
// Everything else (companyName, logo, favicon, seo, smtp, cloudinary) is
// Super Admin only.
const MANAGER_EDITABLE_FIELDS = [
  "aboutUs",
  "mission",
  "vision",
  "companyHistory",
  "email",
  "phone",
  "address",
  "mapUrl",
  "businessHours",
  "socialLinks",
] as const;

const settingsSchema = z.record(z.string(), z.any());

export async function GET() {
  try {
    await connectDB();
    const settings = await WebsiteSettings.findOneAndUpdate(
      {},
      { $setOnInsert: { companyName: "IdeaCT" } },
      { upsert: true, new: true }
    );
    return ok(settings);
  } catch (err) {
    const { getSettings } = require("@/lib/content");
    const settings = await getSettings();
    return ok(settings);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
  } catch (err) {
    return fail(
      err instanceof Error && err.message.includes("DATABASE_URL")
        ? "The database is not configured on this server yet (DATABASE_URL is not set)."
        : `Database error: ${err instanceof Error ? err.message : String(err)}`,
      [],
      503
    );
  }

  const auth = await requireRole(req, ["Super Admin", "Manager"]);
  if (!auth.ok) return fail(auth.message, [], auth.status);

  const body = await req.json().catch(() => null);
  if (!body) return fail("Invalid JSON body.");

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return fail("Validation failed.", parsed.error.issues);

  let update = parsed.data;

  if (auth.user.role === "Manager") {
    const disallowed = Object.keys(update).filter(
      (key) => !MANAGER_EDITABLE_FIELDS.includes(key as (typeof MANAGER_EDITABLE_FIELDS)[number])
    );
    if (disallowed.length > 0) {
      return fail(
        `Manager role cannot edit: ${disallowed.join(", ")}. Super Admin only.`,
        [],
        403
      );
    }
  }

  const settings = await WebsiteSettings.findOneAndUpdate(
    {},
    { $set: update },
    { upsert: true, new: true }
  );

  void logActivity({
    actorEmail: auth.user.email,
    action: "settings_change",
    description: `${auth.user.email} updated Website Settings (${Object.keys(update).join(", ")}).`,
  });

  return ok(settings, "Settings updated successfully.");
}
