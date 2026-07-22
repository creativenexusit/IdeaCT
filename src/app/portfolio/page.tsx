import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolio } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description: "Case studies and completed regulatory projects delivered by IdeaCT.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Our Work</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Regulatory <span className="text-glow-gradient">Case Studies</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            Real-world pharmaceutical challenges solved by our consultancy team — from multi-market registration programs to quality system remediations.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {portfolio.map((item, idx) => (
            <ScrollReveal key={item._id} delay={idx * 100}>
              <Card className="h-full flex flex-col justify-between group">
                <div>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/8 to-secondary/8 border border-border mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-primary/25 transition-colors">
                    {item.gallery && item.gallery.length > 0 ? (
                      <img src={item.gallery[0]} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,84,146,0.06)_0%,transparent_60%)] group-hover:opacity-150 transition-opacity" />
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Engagement Overview</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">{item.industry}</span>
                  <h2 className="font-bold text-text-primary text-xl mt-2 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-1">Client: {item.client.companyName}</p>
                  <p className="text-text-secondary text-sm mt-4 leading-relaxed line-clamp-2">{item.challenge}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <Link href={`/portfolio/${item.slug}`} className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover font-semibold transition-colors group/link">
                    Read Case Study <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
