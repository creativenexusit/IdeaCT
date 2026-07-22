import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { getPortfolio } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const portfolio = await getPortfolio();
  return portfolio.map((p) => ({ slug: p.slug }));
}

export default async function PortfolioDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const item = portfolio.find((p) => p.slug === slug);
  if (!item) notFound();

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="border-b border-border bg-surface-sunken py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> All Case Studies
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">{item.industry}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">{item.title}</h1>
          <Link href={`/clients/${item.client.slug}`} className="inline-block mt-2 text-primary text-sm font-bold hover:underline">
            {item.client.companyName}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {item.gallery && item.gallery.length > 0 ? (
          <div className="mb-12 space-y-6">
            <ScrollReveal>
              <div className="aspect-video rounded-2xl border border-border flex items-center justify-center relative overflow-hidden">
                 <img src={item.gallery[0]} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
            {item.gallery.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {item.gallery.slice(1).map((img: string, i: number) => (
                  <ScrollReveal key={i} delay={i * 50}>
                    <div className="aspect-video rounded-xl border border-border overflow-hidden">
                      <img src={img} alt={`${item.title} gallery ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <ScrollReveal>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/8 to-secondary/8 border border-border mb-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,84,146,0.07)_0%,transparent_60%)]" />
              <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Project Engagement Summary</span>
            </div>
          </ScrollReveal>
        )}

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: AlertCircle, label: "The Challenge", content: item.challenge, color: "text-red-400" },
            { icon: Lightbulb, label: "Our Solution", content: item.solution, color: "text-secondary" },
            { icon: TrendingUp, label: "Outcomes Achieved", content: item.outcome, color: "text-accent-green" },
          ].map(({ icon: Icon, label, content, color }, idx) => (
            <ScrollReveal key={label} delay={idx * 100}>
              <Card className="h-full">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="h-8 w-8 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
                    <Icon className={`h-4 w-4 ${color}`} strokeWidth={1.75} />
                  </span>
                  <h2 className={`font-bold text-sm uppercase tracking-wider ${color}`}>{label}</h2>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{content}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
