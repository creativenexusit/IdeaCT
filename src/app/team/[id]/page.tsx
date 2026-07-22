import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Mail, Phone } from "lucide-react";
import QRCode from "qrcode";
import { getExpertTeam, getSettings } from "@/lib/content";
import { buildVCard } from "@/lib/vcard";
import { VCardDownloadButton } from "@/components/VCardDownloadButton";
import { Card } from "@/components/Card";

export async function generateStaticParams() {
  const expertTeam = await getExpertTeam();
  return expertTeam.map((m) => ({ id: String(m._id) }));
}

export default async function TeamProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expertTeam = await getExpertTeam();
  const member = expertTeam.find((m) => String(m._id) === id);
  if (!member) notFound();

  const settings = await getSettings();
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://ideact.example.com"}/team/${member._id}`;
  const qrDataUrl = await QRCode.toDataURL(profileUrl, { margin: 1, width: 160 });
  const vcard = buildVCard(member, settings.companyName);

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/team" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-8 group">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Team
        </Link>

        <div className="glass p-8 rounded-2xl border border-border flex flex-col sm:flex-row gap-8 items-start">
          <div className="h-28 w-28 rounded-full bg-surface-sunken border-2 border-border-strong flex items-center justify-center text-4xl font-black text-primary shrink-0 overflow-hidden">
            {member.profileImage ? (
              <img src={member.profileImage} alt={member.fullName} className="w-full h-full object-cover" />
            ) : (
              member.fullName.charAt(0)
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">{member.fullName}</h1>
            <p className="text-primary font-bold uppercase tracking-wider text-xs mt-1">{member.designation}</p>
            <p className="text-text-muted text-sm mt-0.5">{member.department} · {member.experience} years experience</p>
            <p className="text-text-secondary mt-5 leading-relaxed text-sm">{member.biography}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(member.specialization as string[]).map((s: string) => (
                <span key={s} className="px-3 py-1 rounded-full text-xs bg-surface-sunken border border-border text-text-secondary font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Card className="flex items-center gap-4">
            <span className="h-10 w-10 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.75} />
            </span>
            <a href={`tel:${member.phone}`} className="text-text-primary hover:text-primary font-semibold text-sm transition-colors">{member.phone}</a>
          </Card>
          <Card className="flex items-center gap-4">
            <span className="h-10 w-10 shrink-0 rounded-lg bg-surface-sunken border border-border flex items-center justify-center">
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.75} />
            </span>
            <a href={`mailto:${member.email}`} className="text-text-primary hover:text-primary font-semibold text-sm transition-colors break-all">{member.email}</a>
          </Card>
        </div>

        <div className="mt-8 flex items-center gap-8 flex-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt={`QR code for ${member.fullName}'s profile`} width={120} height={120} className="rounded-xl border border-border" />
          <VCardDownloadButton vcard={vcard} fileName={`${member.fullName.replace(/\s+/g, "-")}.vcf`} />
        </div>
      </div>
    </div>
  );
}
