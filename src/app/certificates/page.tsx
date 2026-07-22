import type { Metadata } from "next";
import { getCertificates } from "@/lib/content";
import { Card } from "@/components/Card";
import { CertificateDownloadButton } from "@/components/CertificateDownloadButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditations & Certificates",
  description: "Official certifications, ISO accreditations, and regulatory audit approvals of IdeaCT.",
  alternates: { canonical: "/certificates" },
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Accreditations</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Quality & <span className="text-glow-gradient">Compliance Credentials</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            We hold ourselves to the highest standards of professional practice. Review our official ISO certifications and verified regulatory registrations.
          </p>

          {/* Trainee Certificate CTA Banner */}
          <div className="mt-8 glass p-6 rounded-2xl border border-primary bg-primary max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="font-bold text-text-primary text-lg">Looking for your Course Certificate?</h2>
              <p className="text-sm text-text-secondary">Trainees can verify and download their workshop completion certificates online by entering their Name and registered Phone Number.</p>
            </div>
            <a
              href="/certificates/verify"
              className="inline-flex items-center justify-center min-h-11 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(19,84,146,0.3)] transition-all shrink-0 w-full sm:w-auto text-center"
            >
              Verify & Download Certificate
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, idx) => (
            <ScrollReveal key={cert._id} delay={idx * 100}>
              <Card className="flex flex-col justify-between h-full group">
                <div>
                  <div className="aspect-[4/3] rounded-xl bg-surface-sunken border border-border mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-primary/30 transition-colors">
                    {cert.certificateImage || (cert.pdf && cert.pdf.includes("res.cloudinary.com") && cert.pdf.endsWith(".pdf")) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cert.certificateImage || (cert.pdf ? cert.pdf.replace(".pdf", ".jpg") : "")}
                        alt={cert.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent" />
                        <Award className="h-12 w-12 text-primary animate-float" strokeWidth={1.5} />
                        <span className="text-[10px] tracking-widest text-text-muted font-bold uppercase mt-4">Verified Credential Document</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-bold text-text-primary text-lg group-hover:text-primary transition-colors leading-snug">
                    {cert.title}
                  </h2>
                  <p className="text-sm text-text-secondary mt-2">
                    Issued by <span className="text-text-secondary font-medium">{cert.issuedBy}</span> on {cert.issueDate instanceof Date ? cert.issueDate.toLocaleDateString() : String(cert.issueDate)}
                  </p>
                </div>
                <CertificateDownloadButton pdf={cert.pdf} image={cert.certificateImage} title={cert.title} />
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
