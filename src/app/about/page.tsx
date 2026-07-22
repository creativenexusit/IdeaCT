import type { Metadata } from "next";
import { getSettings, getLeadership } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about IdeaCT's mission, vision, history, and leadership team.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSettings();
  const leadership = await getLeadership();

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Title banner */}
      <div className="border-b border-border bg-surface-sunken py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="eyebrow">Company Profile</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
              About <span className="text-glow-gradient">IdeaCT</span>
            </h1>
            <p className="text-text-secondary mt-6 text-lg max-w-3xl leading-relaxed">
              {settings.aboutUs}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission & Vision */}
        <ScrollReveal className="grid sm:grid-cols-2 gap-6">
          <Card>
            <span className="eyebrow">Mission</span>
            <p className="text-text-secondary mt-4 leading-relaxed text-sm">
              {settings.mission}
            </p>
          </Card>
          <Card>
            <span className="eyebrow">Vision</span>
            <p className="text-text-secondary mt-4 leading-relaxed text-sm">
              {settings.vision}
            </p>
          </Card>
        </ScrollReveal>

        {/* History */}
        <ScrollReveal className="mt-20">
          <div className="glass p-8 rounded-2xl border border-border">
            <span className="eyebrow">Company History</span>
            <h2 className="text-2xl font-bold text-text-primary mt-4">Our Foundation</h2>
            <p className="text-text-secondary mt-4 leading-relaxed text-sm">
              {settings.companyHistory}
            </p>
          </div>
        </ScrollReveal>

        {/* Leadership */}
        <ScrollReveal className="mt-20">
          <span className="eyebrow">Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-4 mb-8">
            Expert Management
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {leadership.map((leader) => (
              <Card key={leader._id} className="hover:border-primary/40 relative overflow-hidden group">
                <div className="h-14 w-14 rounded-full bg-surface-sunken border border-border flex items-center justify-center text-text-secondary font-bold text-lg">
                  {leader.name.charAt(0)}
                </div>
                <p className="font-bold text-text-primary text-lg mt-5 group-hover:text-primary transition-colors">
                  {leader.name}
                </p>
                <p className="text-xs text-primary font-semibold tracking-wider uppercase mt-1">
                  {leader.designation}
                </p>
                <p className="text-text-secondary text-sm mt-4 leading-relaxed">
                  {leader.biography}
                </p>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
