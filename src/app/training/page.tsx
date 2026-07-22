import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, User , } from "lucide-react";
import { getTrainings } from "@/lib/content";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Explore IdeaCT's pharmaceutical GMP training workshops and professional development programs.",
  alternates: { canonical: "/training" },
};

export default async function TrainingPage() {
  const trainings = await getTrainings();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Professional Development</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            cGMP & Regulatory <span className="text-glow-gradient">Training Programs</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            Practical, certification-oriented workshops led by active pharmaceutical regulatory practitioners.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainings.map((tr, idx) => (
              <ScrollReveal key={tr._id} delay={idx * 100}>
                <div className="glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    {tr.banner ? (
                      <div className="relative h-48 w-full overflow-hidden bg-surface-sunken border-b border-border">
                        <img
                          src={tr.banner}
                          alt={tr.title}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-b border-border">
                        <CalendarDays className="h-12 w-12 text-primary/30" strokeWidth={1.5} />
                      </div>
                    )}

                    <div className="p-6">
                      <span className="px-2.5 py-0.5 rounded bg-surface-sunken border border-border text-[10px] uppercase font-bold text-secondary">
                        {tr.category.name}
                      </span>
                      <h2 className="font-bold text-text-primary text-xl mt-4 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {tr.title}
                      </h2>
                      <p className="text-text-secondary text-sm mt-3 leading-relaxed line-clamp-3">
                        {tr.description}
                      </p>
                      <div className="mt-5 space-y-2.5">
                        {[
                          { icon: User, label: tr.trainer },
                          { icon: Clock, label: tr.duration },
                          { icon: MapPin, label: tr.location },
                          { icon: CalendarDays, label: tr.schedule instanceof Date ? tr.schedule.toLocaleDateString() : String(tr.schedule || 'TBA') },
                        ].map(({ icon: Icon, label }) => {
                          if (!label || label === "TBA") return null;
                          return (
                            <div key={label} className="flex items-center gap-2.5 text-sm text-text-secondary">
                              <Icon className="h-4 w-4 text-primary shrink-0" strokeWidth={1.75} />
                              <span>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-4 border-t border-border">
                    <Button href={`/training/${tr.slug}`} variant="outline" className="w-full">
                      View Program Details
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
