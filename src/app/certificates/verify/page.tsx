"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Award, FileDown, Search, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

type TraineeCert = {
  _id: string;
  recipientName: string;
  recipientPhone: string;
  courseTitle: string;
  issueDate: string;
  certificateUrl: string;
  certificateNumber?: string;
};

export default function CertificateVerifyPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TraineeCert[] | null>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Please fill in your registered phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setResults(null);

    try {
      // Use the generic API handler with search parameter
      const res = await fetch(`/api/trainee-certificates?limit=100&search=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to search certificates.");
        setLoading(false);
        return;
      }

      const items: TraineeCert[] = data.data.items ?? [];
      
      // Perform strict validation matching phone
      const matched = items.filter(
        (item) => item.recipientPhone.trim() === phone.trim()
      );

      setResults(matched);
      if (matched.length === 0) {
        setError("No certificates found matching this phone number. Please try again or contact support.");
      }
    } catch {
      setError("Could not reach the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden bg-background py-16">
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-glow pointer-events-none" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/certificates" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-8 group">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Credentials
        </Link>

        <div className="text-center mb-10">
          <span className="eyebrow">Verification System</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-3 tracking-tight">
            Download Trainee <span className="text-glow-gradient">Certificates</span>
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto mt-3">
            Enter your registered Phone Number below to search and download your official training completion certificates.
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-md mx-auto p-6 sm:p-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-semibold text-text-secondary">
                Registered Phone Number *
              </label>
              <input
                id="phone"
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01711223344"
                className="w-full bg-surface-sunken border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text-primary rounded-xl px-4 py-3 text-xs outline-none transition-all"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400 leading-normal">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(19,84,146,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Find My Certificate
                </>
              )}
            </button>
          </form>
        </Card>

        {/* Results Area */}
        {results && results.length > 0 && (
          <div className="mt-12 space-y-6 max-w-xl mx-auto">
            <h2 className="font-bold text-text-primary text-lg border-b border-border pb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Verified Certificate Results ({results.length})
            </h2>

            {results.map((cert) => (
              <Card key={cert._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-surface-sunken border border-border text-[9px] uppercase font-bold text-secondary">
                    Verified Trainee Certificate
                  </span>
                  <h3 className="font-bold text-text-primary text-base mt-2">{cert.courseTitle}</h3>
                  <p className="text-xs text-text-secondary">
                    Recipient: <span className="text-text-primary font-semibold">{cert.recipientName}</span>
                  </p>
                  {cert.certificateNumber && (
                    <p className="text-[10px] text-text-muted font-mono">Reg #: {cert.certificateNumber}</p>
                  )}
                  <p className="text-[10px] text-text-muted">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                </div>

                <a
                  href={cert.certificateUrl && cert.certificateUrl.includes("res.cloudinary.com") && !cert.certificateUrl.includes("fl_attachment") && !cert.certificateUrl.includes("/raw/upload/") ? cert.certificateUrl.replace("/upload/", "/upload/fl_attachment:ideact_certificate.pdf/") : cert.certificateUrl}
                  download
                  rel="noopener noreferrer"
                  className="min-h-10 px-4 inline-flex items-center gap-2 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-primary text-xs font-bold text-text-primary hover:text-primary transition-all shrink-0 w-full sm:w-auto justify-center"
                >
                  <FileDown className="h-4 w-4" />
                  Download
                </a>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
