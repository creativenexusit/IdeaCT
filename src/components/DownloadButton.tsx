"use client";

import { useState } from "react";
import { Button } from "./Button";
import { DownloadCloud, Eye } from "lucide-react";

/** Adds a Cloudinary "force attachment" flag so the browser downloads the
 * file instead of just navigating to it (works for PDFs/docs hosted on
 * Cloudinary's /raw/ or /image/ delivery URLs). Falls back to the plain
 * URL for non-Cloudinary links. */
function toForceDownloadUrl(url?: string): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("fl_attachment")) return url;
  if (url.includes("/raw/upload/")) return url; // Raw files don't support transformations
  return url.replace("/upload/", "/upload/fl_attachment:ideact_document.pdf/");
}

function toViewUrl(url: string): string {
  if (!url) return url;
  if (url.toLowerCase().endsWith(".pdf")) {
    return `/api/view-pdf?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export function DownloadButton({
  fileId,
  fileUrl,
  label = "Download",
  initialCount,
  showView = true,
}: {
  fileId: string;
  fileUrl?: string;
  label?: string;
  initialCount: number;
  showView?: boolean;
}) {
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  async function trackDownload() {
    try {
      const res = await fetch(`/api/downloads/${fileId}/increment`, { method: "POST" });
      const data = await res.json();
      if (data.success) setCount(data.data.downloadCount);
    } catch {
      // Best effort file count increment — never blocks the actual download
    }
  }

  function handleView() {
    if (!fileUrl) return;
    window.open(toViewUrl(fileUrl), "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <div className={showView ? "grid grid-cols-2 gap-2" : ""}>
        {showView && (
          <Button
            variant="outline"
            onClick={handleView}
            disabled={!fileUrl}
            className="w-full flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4 text-primary" /> View
          </Button>
        )}
        <a
          href={toForceDownloadUrl(fileUrl)}
          download={label}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (!pending) {
              setPending(true);
              trackDownload().finally(() => setPending(false));
            }
          }}
          className={`w-full flex items-center justify-center gap-2 min-h-11 rounded-xl border border-border bg-surface hover:bg-surface-hover text-xs font-bold text-text-primary hover:text-primary transition-all ${
            (!fileUrl || pending) ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <DownloadCloud className="h-4 w-4 text-primary" /> {label}
        </a>
      </div>
      <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 text-center tracking-wider">{count} downloads logged</p>
    </div>
  );
}

