import { notFound } from "next/navigation";
import Link from "next/link";
import { getClients, getPortfolio, getServices } from "@/lib/content";
import { Card } from "@/components/Card";
import { ChevronLeft, Globe, ArrowUpRight } from "lucide-react";

export async function generateStaticParams() {
  const clients = await getClients();
  return clients.map((c) => ({ slug: c.slug }));
}

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clients = await getClients();
  const portfolio = await getPortfolio();
  const services = await getServices();
  const client = clients.find((c) => c.slug === slug);
  if (!client) notFound();

  const relatedProjects = portfolio.filter((p) => p.client._id === client._id);
  const receivedServices = (client.servicesReceived || client.services || [])
    .map((serviceSlug: string) => services.find((s) => s.slug === serviceSlug))
    .filter((s: any): s is any => Boolean(s));

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/clients" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-8 group">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to clients
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-6 border-b border-border pb-8">
          <div className="flex-1">
            <span className="inline-block px-2.5 py-0.5 rounded bg-surface-sunken border border-border text-[10px] uppercase font-bold text-primary">
              {client.industry}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-3">{client.companyName}</h1>
            <p className="text-sm text-text-muted mt-1">{client.country}</p>
          </div>
          {client.logo && (
            <div className="h-16 w-auto shrink-0 hidden sm:block">
              <img src={client.logo} alt={`${client.companyName} logo`} className="h-full object-contain" />
            </div>
          )}
          {client.website && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 px-5 inline-flex items-center gap-2 rounded-xl border border-border bg-[#111927] hover:bg-surface text-sm font-semibold text-text-primary hover:text-white transition-colors"
            >
              <Globe className="h-4 w-4 text-primary" /> Visit Client Site <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Engagement Overview</h2>
          <p className="text-text-secondary leading-relaxed text-base">{client.overview}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Card>
            <h2 className="font-bold text-text-primary mb-4 text-base">Services Provided</h2>
            <ul className="space-y-3 text-sm">
              {receivedServices.map((s: any) => (
                <li key={s._id} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <Link href={`/services/${s.slug}`} className="text-primary hover:underline font-semibold">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-bold text-text-primary mb-4 text-base">Key Metrics</h2>
            <dl className="text-sm text-text-secondary space-y-2">
              <div className="flex justify-between py-1.5 border-b border-border">
                <dt className="font-medium text-text-muted">Industry Segment</dt>
                <dd className="text-text-secondary font-semibold">{client.industry}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <dt className="font-medium text-text-muted">Country Operations</dt>
                <dd className="text-text-secondary font-semibold">{client.country}</dd>
              </div>
            </dl>
          </Card>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-bold text-text-primary text-lg mb-6">Case Studies</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProjects.map((project) => (
                <Card key={project._id} className="group">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-primary">{project.industry}</p>
                  <h3 className="font-bold text-text-primary mt-2 text-base group-hover:text-primary transition-colors">{project.title}</h3>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    View Project Details →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
