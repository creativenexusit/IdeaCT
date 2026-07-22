import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ClipboardCheck, Factory, TrendingUp, ArrowRight } from "lucide-react";
import { getServices, getServiceCategories } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

const SERVICE_ICONS: Record<string, typeof ShieldCheck> = {
  "regulatory-affairs": ShieldCheck,
  "quality-assurance": ClipboardCheck,
  "manufacturing-consultancy": Factory,
  "market-access": TrendingUp,
};

export const metadata: Metadata = {
  title: "Consultancy Services",
  description: "Regulatory affairs, quality assurance, manufacturing consultancy, and market access services from IdeaCT.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();
  const serviceCategories = await getServiceCategories();
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="border-b border-border bg-surface-sunken py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="eyebrow">Our Services</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
              Pharmaceutical <span className="text-glow-gradient">Consultancy Services</span>
            </h1>
            <p className="text-text-secondary mt-4 max-w-2xl text-base leading-relaxed">
              Four core practice areas, each staffed by consultants who've worked inside the regulatory and clinical systems they now advise on.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {serviceCategories.map((cat) => (
                <span key={cat._id} className="text-xs px-3 py-1.5 rounded-full border border-border bg-surface-sunken text-text-secondary font-semibold">
                  {cat.name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.category.slug] ?? ShieldCheck;
            return (
              <ScrollReveal key={service._id} delay={i * 60}>
                <div className="glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    {service.thumbnail ? (
                      <div className="relative h-48 w-full overflow-hidden bg-surface-sunken border-b border-border">
                        <img
                          src={service.thumbnail}
                          alt={service.title}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-b border-border">
                        <Icon className="h-12 w-12 text-primary/30" strokeWidth={1.5} />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <span className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-surface-sunken border border-border group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(19,84,146,0.2)] transition-all">
                          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted bg-surface-sunken border border-border px-2 py-1 rounded">
                          {service.category.name}
                        </span>
                      </div>
                      <h2 className="font-bold text-text-primary text-lg mt-5 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-text-secondary mt-3 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-4 border-t border-border">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover font-semibold transition-colors group/link"
                    >
                      Explore Service <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
