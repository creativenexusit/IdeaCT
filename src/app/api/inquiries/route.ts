import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { inquirySchema } from "@/validations/inquiry";
import { createCrudHandlers, dbErrorMessage } from "@/lib/crudFactory";
import { ok, fail } from "@/lib/apiResponse";
import { notifyNewInquiry } from "@/services/mailer";
import { sendToGoogleSheets } from "@/services/sheets";
import { rateLimit, clientIp } from "@/lib/rateLimit";

const base = createCrudHandlers({
  model: Inquiry,
  createSchema: inquirySchema,
  updateSchema: inquirySchema.extend({
    inquiryStatus: z.string().optional(),
    notes: z.string().optional(),
  }).partial(),
  filterableFields: ["inquiryStatus", "service", "assignedTo"],
  searchableFields: ["name", "email", "company"],
});

export const GET = base.GET;
export const DELETE = base.DELETE;

export async function PUT(req: NextRequest) {
  const cloned = req.clone();
  const res = await base.PUT(cloned as unknown as NextRequest);
  
  // If the update succeeded and the admin typed a reply message, send the email!
  if (res.status === 200) {
    try {
      const body = await req.json();
      if (body.replyMessage && body.replyMessage.trim() !== "") {
        const { sendBulkClientEmail } = await import("@/services/mailer");
        await sendBulkClientEmail(
          [{ name: body.name, email: body.email }],
          `Re: ${body.subject || "Your Inquiry"}`,
          body.replyMessage
        );
      }
    } catch (err) {
      console.error("[inquiries] Failed to send reply email:", err);
    }
  }
  return res;
}

// Overrides the generic POST so a successful submission also triggers the
// SMTP admin notification (and optional auto-reply) required by Phase 7.
export async function POST(req: NextRequest) {
  // Rate limit first — this is a cheap in-memory check and shouldn't require
  // a DB connection to enforce, per Phase 10.
  const { allowed } = rateLimit(`inquiry:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return fail("Too many submissions. Please try again later.", [], 429);
  }

  try {
    await connectDB();
  } catch (err) {
    return fail(dbErrorMessage(err), [], 503);
  }

  const body = await req.json().catch(() => null);
  if (!body) return fail("Invalid JSON body.");

  // Remove empty string service to prevent Mongoose ObjectId cast error
  if (body.service === "") {
    delete body.service;
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return fail("Validation failed.", parsed.error.issues);

  try {
    const created = await Inquiry.create(parsed.data);

    // Fire-and-forget: a slow SMTP server or Webhook should never block the API response.
    notifyNewInquiry(created).catch((err) =>
      console.error("[inquiries] Failed to send notification email:", err)
    );

    sendToGoogleSheets(parsed.data).catch((err) =>
      console.error("[inquiries] Failed to send data to Google Sheets:", err)
    );

    return ok(created, "Inquiry submitted successfully.", 201);
  } catch (err) {
    console.error("[inquiries] Database error during creation:", err);
    return fail("Failed to save inquiry due to a database error.", [], 500);
  }
}
