import type { Metadata } from "next";
import Link from "next/link";
import { getClients } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Corporate Clients",
  description: "Pharmaceutical manufacturers, distribution groups, and health systems IdeaCT has partnered with.",
  alternates: { canonical: "/clients" },
};

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Partnerships</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Corporate <span className="text-glow-gradient">Clients & Partners</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            We partner with leading pharmaceutical manufacturers, local distributors, and multinational biotechs to navigate regulatory complexities and maintain compliance.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client, idx) => (
            <ScrollReveal key={client._id} delay={idx * 75}>
              <Link href={`/clients/${client.slug}`}>
                <Card className="hover:scale-[1.02] flex flex-col justify-between items-center h-40 text-center !p-4">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 font-bold text-text-primary group-hover:text-primary text-base w-full overflow-hidden">
                    {client.logo && <img src={client.logo} alt={client.companyName} className="h-12 w-auto max-w-full object-contain" />}
                    <span className="line-clamp-2 text-sm">{client.companyName}</span>
                  </div>
                  <div className="w-full pt-3 mt-2 border-t border-border">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-primary truncate">
                      {client.industry}
                    </p>
                    <p className="text-[10px] text-text-muted font-medium mt-1 truncate">
                      {client.country}
                    </p>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
