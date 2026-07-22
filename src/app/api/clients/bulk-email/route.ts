import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/db";
import Client from "@/models/Client";
import { ok, fail } from "@/lib/apiResponse";
import { dbErrorMessage } from "@/lib/crudFactory";
import { sendBulkClientEmail } from "@/services/mailer";
import { requireRole } from "@/middleware/authz";
import { logActivity } from "@/services/activityLog";

const bulkEmailSchema = z.object({
  clientIds: z.array(z.string()).min(1, "Select at least one client."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(1, "Message is required."),
});

/**
 * Sends the same branded email to every selected client's contact email in
 * one go. Individual failures (missing/invalid email, SMTP hiccup for a
 * specific recipient) don't block the rest of the batch — the response
 * reports exactly who succeeded and who didn't.
 */
export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["Super Admin", "Manager"]);
  if (!auth.ok) return fail(auth.message, [], auth.status);

  try {
    await connectDB();
  } catch (err) {
    return fail(dbErrorMessage(err), [], 503);
  }

  const body = await req.json().catch(() => null);
  if (!body) return fail("Invalid JSON body.");

  const parsed = bulkEmailSchema.safeParse(body);
  if (!parsed.success) return fail("Validation failed.", parsed.error.issues);

  const { clientIds, subject, message } = parsed.data;

  type ClientLean = { _id: unknown; companyName: string; contactEmail?: string };
  const clients = (await Client.find({
    _id: { $in: clientIds },
    isDeleted: { $ne: true },
  }).lean()) as ClientLean[];

  const withEmail = clients.filter((c) => c.contactEmail);
  const withoutEmail = clients.filter((c) => !c.contactEmail);

  if (withEmail.length === 0) {
    return fail(
      "None of the selected clients have a Contact Email on file. Add one via Edit before sending.",
      [],
      400
    );
  }

  const results = await sendBulkClientEmail(
    withEmail.map((c) => ({ name: c.companyName, email: c.contactEmail as string })),
    subject,
    message
  );

  void logActivity({
    action: "content_update",
    description: `Sent a bulk email ("${subject}") to ${results.sent.length} client(s).`,
    collectionName: "Client",
    recordId: clientIds.join(","),
  });

  return ok(
    {
      sent: results.sent,
      failed: [
        ...results.failed,
        ...withoutEmail.map((c) => ({ name: c.companyName, reason: "No contact email on file" })),
      ],
    },
    `Email sent to ${results.sent.length} of ${clients.length} selected client(s).`
  );
}
