import type { Metadata } from "next";
import Link from "next/link";
import { getExpertTeam } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Expert Team",
  description: "Meet IdeaCT's regulatory, quality, and manufacturing consultancy experts.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const expertTeam = await getExpertTeam();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Our Practitioners</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Expert <span className="text-glow-gradient">Consultant Team</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            Each member of our team has direct, hands-on experience in pharmaceutical regulatory environments, quality audits, and clinical operations.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {expertTeam.map((member, idx) => (
            <ScrollReveal key={member._id} delay={idx * 100}>
              <Card className="text-center group hover:scale-[1.02]">
                <div className="h-20 w-20 mx-auto rounded-full bg-surface-sunken border-2 border-border group-hover:border-primary/50 transition-colors flex items-center justify-center text-2xl font-black text-text-muted group-hover:text-primary overflow-hidden">
                  {member.profileImage ? (
                    <img src={member.profileImage} alt={member.fullName} className="w-full h-full object-cover" />
                  ) : (
                    member.fullName.charAt(0)
                  )}
                </div>
                <p className="font-bold text-text-primary mt-4 group-hover:text-primary transition-colors">{member.fullName}</p>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">{member.designation}</p>
                <p className="text-xs text-text-muted mt-1">{member.experience} yrs experience</p>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                  {(member.specialization as string[]).slice(0, 2).map((s: string) => (
                    <span key={s} className="text-[9px] px-2 py-0.5 rounded-full bg-surface-sunken border border-border text-text-secondary font-medium">
                      {s}
                    </span>
                  ))}
                </div>
                <Link href={`/team/${member._id}`} className="inline-block mt-4 text-xs text-primary hover:text-primary-hover font-bold transition-colors">
                  View Profile →
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
