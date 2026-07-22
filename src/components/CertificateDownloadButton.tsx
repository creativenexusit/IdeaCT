"use client";

import { Button } from "./Button";
import { FileDown, Eye, FileX } from "lucide-react";

function toForceDownloadUrl(url: string): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("fl_attachment")) return url;
  if (url.includes("/raw/upload/")) return url; // Raw files don't support transformations
  return url.replace("/upload/", "/upload/fl_attachment:ideact_certificate.pdf/");
}

function toViewUrl(url: string): string {
  if (!url) return url;
  if (url.toLowerCase().endsWith(".pdf")) {
    return `/api/view-pdf?url=${encodeURIComponent(url)}`;
  }
  return url;
}

/**
 * Renders working View + Download actions for a certificate record.
 * Prefers the PDF file; falls back to the certificate image if no PDF was
 * uploaded. If neither exists, shows a disabled "Not available yet" state
 * instead of a dead button.
 */
export function CertificateDownloadButton({
  pdf,
  image,
  title,
}: {
  pdf?: string;
  image?: string;
  title: string;
}) {
  const file = pdf || image;

  if (!file) {
    return (
      <Button variant="outline" disabled className="mt-6 w-full flex items-center justify-center gap-2 opacity-50">
        <FileX className="h-4 w-4" /> Not available yet
      </Button>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        onClick={() => window.open(toViewUrl(file), "_blank", "noopener,noreferrer")}
        className="w-full flex items-center justify-center gap-2"
      >
        <Eye className="h-4 w-4" /> View
      </Button>
      <a
        href={toForceDownloadUrl(file)}
        download={`${title.replace(/[^\w\- ]+/g, "").trim() || "certificate"}`}
        rel="noopener noreferrer"
        className="min-h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface hover:bg-surface-hover text-xs font-bold text-text-primary hover:text-primary transition-all"
      >
        <FileDown className="h-4 w-4" /> Download
      </a>
    </div>
  );
}
