"use client";

export function VCardDownloadButton({ vcard, fileName }: { vcard: string; fileName: string }) {
  function handleDownload() {
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="min-h-11 px-5 rounded-xl border border-border text-sm font-medium text-text-primary hover:bg-background"
    >
      Download vCard
    </button>
  );
}
