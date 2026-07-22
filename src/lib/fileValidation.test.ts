import { describe, it, expect } from "vitest";
import { validateUpload } from "./fileValidation";

describe("validateUpload", () => {
  it("accepts a JPEG under the size limit", () => {
    const result = validateUpload({ name: "photo.jpg", type: "image/jpeg", size: 1_000_000 });
    expect(result.valid).toBe(true);
  });

  it("accepts a PDF under the document size limit", () => {
    const result = validateUpload({ name: "brochure.pdf", type: "application/pdf", size: 10_000_000 });
    expect(result.valid).toBe(true);
  });

  it("rejects an EXE by extension even with a spoofed MIME type", () => {
    const result = validateUpload({ name: "virus.exe", type: "image/jpeg", size: 1000 });
    expect(result.valid).toBe(false);
  });

  it("rejects a ZIP file", () => {
    const result = validateUpload({ name: "archive.zip", type: "application/zip", size: 1000 });
    expect(result.valid).toBe(false);
  });

  it("rejects a PHP file", () => {
    const result = validateUpload({ name: "shell.php", type: "application/x-httpd-php", size: 1000 });
    expect(result.valid).toBe(false);
  });

  it("rejects an oversized image", () => {
    const result = validateUpload({ name: "huge.png", type: "image/png", size: 6 * 1024 * 1024 });
    expect(result.valid).toBe(false);
  });

  it("rejects a disallowed MIME type even with an allowed-looking extension", () => {
    const result = validateUpload({ name: "fake.jpg", type: "application/octet-stream", size: 1000 });
    expect(result.valid).toBe(false);
  });
});
