import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import { InquiryForm } from "@/components/InquiryForm";
import { Card } from "@/components/Card";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with IdeaCT for pharmaceutical consultancy and training inquiries.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
        <div>
          <ScrollReveal>
            <span className="eyebrow">Connect With Us</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
              Get in Touch with <span className="text-glow-gradient">Our Experts</span>
            </h1>
            <p className="text-text-secondary mt-4 text-base max-w-xl">
              Have questions about regulatory approvals, GMP audits, or training schedules? Reach out to our lead consultants today.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150} className="mt-8 space-y-4">
            <Card className="flex items-start gap-4">
              <span className="h-10 w-10 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Registered Office</p>
                <p className="text-sm text-text-primary mt-1">{settings.address}</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <span className="h-10 w-10 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Direct Line</p>
                <p className="text-sm text-text-primary mt-1">{settings.phone}</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <span className="h-10 w-10 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Email Inquiries</p>
                <p className="text-sm text-text-primary mt-1">{settings.email}</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <span className="h-10 w-10 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Business Hours</p>
                <p className="text-sm text-text-primary mt-1">{settings.businessHours}</p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Interactive placeholder map */}
          <ScrollReveal delay={200} className="mt-8">
            <div className="aspect-video rounded-2xl bg-gradient-teal-blue/5 border border-border flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,84,146,0.06)_0%,transparent_60%)] animate-pulse-glow" />
              <MapPin className="h-8 w-8 text-primary animate-float" />
              <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-3">Dhaka HQ Coordinates Location Map</span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100}>
          <InquiryForm />
        </ScrollReveal>
      </div>
    </div>
  );
}
