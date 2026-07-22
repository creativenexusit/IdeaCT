import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ok, fail } from "@/lib/apiResponse";
import { validateUpload } from "@/lib/fileValidation";
import { requireRole } from "@/middleware/authz";
import { logActivity } from "@/services/activityLog";

/**
 * Validates an incoming file against the Phase 10 allow-list, then uploads
 * it to Cloudinary. This is real, functional upload code — it's just
 * untestable in this sandbox because no CLOUDINARY_* credentials exist
 * here. If the env vars are unset, it reports that clearly (503) instead
 * of either crashing or silently pretending to succeed.
 */
export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["Super Admin", "Manager"]);
  if (!auth.ok) return fail(auth.message, [], auth.status);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return fail(
      "Cloudinary is not configured on this server (CLOUDINARY_CLOUD_NAME / " +
        "CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET are not set).",
      [],
      503
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const folder = (form?.get("folder") as string) || "general";

  if (!file || typeof file === "string") {
    return fail("A file is required.");
  }

  const validation = validateUpload({ name: file.name, type: file.type, size: file.size });
  if (!validation.valid) {
    return fail(validation.reason, [], 415);
  }

  // Accept any reasonable folder name (letters, numbers, hyphens, underscores)
  if (!/^[a-z0-9_-]+$/i.test(folder)) {
    return fail(`Invalid folder name "${folder}". Use only letters, numbers, hyphens, or underscores.`);
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const stream = cloudinary.uploader.upload_stream(
        { folder: `ideact/${folder}`, resource_type: isPdf ? "raw" : "auto" },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed with no result."));
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        }
      );
      stream.end(buffer);
    });

    void logActivity({
      actorEmail: auth.user.email,
      action: "file_upload",
      description: `${auth.user.email} uploaded a file to ${folder}.`,
    });

    return ok(uploadResult, "File uploaded successfully.", 201);
  } catch (err) {
    return fail(`Cloudinary upload failed: ${err instanceof Error ? err.message : String(err)}`, [], 502);
  }
}
