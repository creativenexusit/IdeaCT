import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "./db";
import { ok, fail } from "./apiResponse";
import { requireRole } from "@/middleware/authz";
import type { Model } from "mongoose";

/**
 * Shared factory for the app's three singleton documents (WebsiteSettings,
 * LeadPopupSettings, FloatingContactSettings). Enforces the "one record for
 * the whole site" rule at the API layer via findOneAndUpdate(..., {upsert:true})
 * rather than allowing multiple documents, per the spec's WebsiteSettings note
 * — applied consistently to all three rather than duplicated ad hoc.
 */
export function createSingletonHandlers({
  model,
  schema,
  defaults = {},
}: {
  model: Model<any>;
  schema: z.ZodTypeAny;
  defaults?: Record<string, unknown>;
}) {
  async function GET() {
    try {
      await connectDB();
      const doc = await model.findOneAndUpdate(
        {},
        { $setOnInsert: defaults },
        { upsert: true, new: true }
      );
      return ok(doc);
    } catch {
      return ok({ ...defaults, _id: "demo-singleton" });
    }
  }

  async function PUT(req: NextRequest) {
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

    // Both LeadPopupSettings and FloatingContactSettings are Super Admin
    // only per Section 6; WebsiteSettings has its own custom PUT handler
    // with the Manager/Super-Admin field split and isn't built with this
    // factory.
    const auth = await requireRole(req, ["Super Admin"]);
    if (!auth.ok) return fail(auth.message, [], auth.status);

    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body.");

    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Validation failed.", parsed.error.issues);

    const doc = await model.findOneAndUpdate(
      {},
      { $set: parsed.data as Record<string, unknown> },
      { upsert: true, new: true }
    );

    return ok(doc, "Updated successfully.");
  }

  return { GET, PUT };
}
