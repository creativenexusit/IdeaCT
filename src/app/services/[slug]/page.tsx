import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { getServices, getFaqs } from "@/lib/content";
import { InquiryForm } from "@/components/InquiryForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getServices();
  const faqs = await getFaqs();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceFaqs = faqs.filter((f) => f.service === service._id);

  return (
    <div className="relative overflow-hidden bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
      />
      <div className="border-b border-border bg-surface-sunken py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> All Services
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">{service.category.name}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
                {service.title}
              </h1>
            </div>
            {service.thumbnail && (
              <div className="w-full md:w-80 h-44 shrink-0 rounded-2xl overflow-hidden border border-border shadow-md">
                <img
                  src={service.thumbnail}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {service.description && (
            <ScrollReveal>
              <p className="text-text-secondary text-base leading-relaxed whitespace-pre-line">{service.description}</p>
            </ScrollReveal>
          )}

          {service.features && service.features.length > 0 && (
            <ScrollReveal delay={100}>
              <h2 className="font-bold text-text-primary text-xl mb-5">Key Features</h2>
              <div className="space-y-3">
                {(service.features as string[]).map((f: string) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span className="text-text-secondary text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {service.benefits && service.benefits.length > 0 && (
            <ScrollReveal delay={150}>
              <h2 className="font-bold text-text-primary text-xl mb-5">Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {(service.benefits as string[]).map((b: string) => (
                  <div key={b} className="glass p-4 rounded-xl border border-border flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-secondary shrink-0" />
                    <span className="text-text-secondary text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {service.process && service.process.length > 0 && (
            <ScrollReveal delay={200}>
              <h2 className="font-bold text-text-primary text-xl mb-6">Our Process</h2>
              <div className="space-y-4">
                {(service.process as string[]).map((step: string, i: number) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center text-xs font-black text-primary shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 glass p-4 rounded-xl border border-border">
                      <p className="text-text-primary font-semibold text-sm">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {serviceFaqs.length > 0 && (
            <ScrollReveal delay={250}>
              <h2 className="font-bold text-text-primary text-xl mb-5">Frequently Asked Questions</h2>
              <FaqAccordion items={serviceFaqs} />
            </ScrollReveal>
          )}
        </div>

        <div>
          <div className="sticky top-24">
            <p className="text-xs uppercase font-bold tracking-wider text-text-secondary mb-4">Inquire About This Service</p>
            <InquiryForm preselectedService={String(service._id)} />
          </div>
        </div>
      </div>
    </div>
  );
}
