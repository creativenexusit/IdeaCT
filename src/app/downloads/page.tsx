import type { Metadata } from "next";
import { getDownloads } from "@/lib/content";
import { Card } from "@/components/Card";
import { DownloadButton } from "@/components/DownloadButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Downloads & Resources",
  description: "Company profiles, training catalogues, and regulatory brochures available for download.",
  alternates: { canonical: "/downloads" },
};

export default async function DownloadsPage() {
  const downloads = await getDownloads();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Resources</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Brochures & <span className="text-glow-gradient">Downloadable Materials</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            Access our official company profile, training catalogues, and compliance brochures. All documents are verified and regularly updated.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((file, idx) => (
            <ScrollReveal key={file._id} delay={idx * 100}>
              <Card className="flex flex-col justify-between h-full group">
                <div>
                  <div className="h-40 rounded-xl bg-surface-sunken border border-border mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-primary/30 transition-colors">
                    {file.file && file.file.includes("res.cloudinary.com") && file.file.endsWith(".pdf") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={file.file.replace(".pdf", ".jpg")} alt={file.title} className="object-cover w-full h-full" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                        <FileText className="h-12 w-12 text-primary animate-float" strokeWidth={1.5} />
                      </>
                    )}
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-surface-sunken border border-border text-[10px] uppercase font-bold text-secondary">
                    {file.category}
                  </span>
                  <h2 className="font-bold text-text-primary text-lg mt-3 group-hover:text-primary transition-colors leading-snug">
                    {file.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-1">{file.fileSize}</p>
                </div>
                <div className="mt-6">
                  <DownloadButton fileId={file._id.toString()} fileUrl={file.file} label="Download" initialCount={file.downloadCount} />
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
