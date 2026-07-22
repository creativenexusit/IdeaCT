const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_DOCUMENT_TYPES = ["application/pdf"];
const BLOCKED_EXTENSIONS = [".exe", ".zip", ".js", ".bat", ".php", ".sh", ".cmd"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024; // 20MB

export type FileValidationResult = { valid: true } | { valid: false; reason: string };

/**
 * Server-side file upload validation per Phase 10: "File upload allow-list:
 * JPG, PNG, WEBP for images and PDF for documents; reject EXE, ZIP, JS, BAT,
 * and PHP; validate MIME type, file size, and extension on the server, not
 * only in the browser."
 *
 * This validates the shape of an upload before it would be forwarded to
 * Cloudinary. Actual Cloudinary upload isn't wired in this sandbox (no
 * credentials), but this validation logic is real and unit-testable.
 */
export function validateUpload(file: {
  name: string;
  type: string;
  size: number;
}): FileValidationResult {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

  if (BLOCKED_EXTENSIONS.includes(extension)) {
    return { valid: false, reason: `File type ${extension} is not allowed.` };
  }

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isDocument = ALLOWED_DOCUMENT_TYPES.includes(file.type);

  if (!isImage && !isDocument) {
    return {
      valid: false,
      reason: "Only JPG, PNG, WEBP images and PDF documents are allowed.",
    };
  }

  const maxSize = isImage ? MAX_IMAGE_SIZE_BYTES : MAX_DOCUMENT_SIZE_BYTES;
  if (file.size > maxSize) {
    return {
      valid: false,
      reason: `File exceeds the ${maxSize / (1024 * 1024)}MB limit for this file type.`,
    };
  }

  return { valid: true };
}
