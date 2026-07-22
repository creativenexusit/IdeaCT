import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CalendarDays, Clock, MapPin, User } from "lucide-react";
import { getTrainings } from "@/lib/content";
import { InquiryForm } from "@/components/InquiryForm";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const trainings = await getTrainings();
  return trainings.map((tr) => ({ slug: tr.slug }));
}

export default async function TrainingDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trainings = await getTrainings();
  const training = trainings.find((tr) => tr.slug === slug);
  if (!training) notFound();

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="border-b border-border bg-surface-sunken py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/training" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> All Programs
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">{training.category.name}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">{training.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {training.banner && (
            <ScrollReveal>
              <div className="aspect-video rounded-2xl border border-border relative overflow-hidden shadow-md">
                <img
                  src={training.banner}
                  alt={training.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          )}

          {training.description && (
            <ScrollReveal delay={100}>
              <p className="text-text-secondary leading-relaxed text-base whitespace-pre-line">{training.description}</p>
            </ScrollReveal>
          )}

          {(() => {
            const details = [
              { icon: User, label: "Lead Trainer", value: training.trainer },
              { icon: Clock, label: "Duration", value: training.duration },
              { icon: MapPin, label: "Location", value: training.location },
              { icon: CalendarDays, label: "Next Schedule", value: training.schedule instanceof Date ? training.schedule.toLocaleDateString() : String(training.schedule || '') },
            ].filter(d => d.value && d.value.trim() !== "" && d.value !== "TBA" && d.value !== "undefined");

            if (details.length === 0) return null;

            return (
              <ScrollReveal delay={150}>
                <h2 className="font-bold text-text-primary text-xl mb-6">Program Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {details.map(({ icon: Icon, label, value }) => (
                    <Card key={label} className="flex items-start gap-4 py-4 px-5">
                      <span className="h-9 w-9 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted">{label}</p>
                        <p className="text-text-primary font-semibold text-sm mt-0.5">{value}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            );
          })()}
        </div>

        <div>
          <div className="sticky top-24">
            <p className="text-xs uppercase font-bold tracking-wider text-text-secondary mb-4">Register for This Program</p>
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
