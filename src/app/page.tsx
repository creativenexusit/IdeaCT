import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ClipboardCheck, Factory, TrendingUp, BadgeCheck, Zap, BookOpen, Layers, ArrowRight, Star, Quote as QuoteIcon } from "lucide-react";
import {
  getSettings,
  getServices,
  getClients,
  getBlogs,
  getStats,
  getPortfolio,
  getTestimonials,
  getPartners,
} from "@/lib/content";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroSlider } from "@/components/HeroSlider";

const SERVICE_ICONS: Record<string, typeof ShieldCheck> = {
  "regulatory-affairs": ShieldCheck,
  "quality-assurance": ClipboardCheck,
  "manufacturing-consultancy": Factory,
  "market-access": TrendingUp,
};

const CREDENTIALS = [
  "ISO 9001:2015 Certified",
  "cGMP-Aligned Consultancy",
  "15+ Years Regulatory Practice",
  "FDA & EMA Dossier Compliant",
];

type PortfolioItem = {
  _id: string;
  title: string;
  slug: string;
  industry?: string;
  outcome?: string;
  featured?: boolean;
  client?: { companyName?: string };
};

type TestimonialItem = {
  _id: string;
  clientName: string;
  designation?: string;
  company?: string;
  photo?: string;
  rating?: number;
  quote: string;
};

type PartnerItem = {
  _id: string;
  name: string;
  logo: string;
  link?: string;
  order?: number;
};

export default async function HomePage() {
  const settings = await getSettings();
  const services = await getServices();
  const clients = await getClients();
  const blogs = await getBlogs();
  const stats = await getStats();
  const portfolio: PortfolioItem[] = await getPortfolio();
  const testimonials: TestimonialItem[] = await getTestimonials();
  const partnersWithLogo: PartnerItem[] = (await getPartners()).filter((p: PartnerItem) => p.logo);

  const featuredClients = clients.filter((c) => c.featured);
  const featuredServices = services.slice(0, 4);
  const featuredPortfolio = portfolio.filter((p) => p.featured).slice(0, 3).length
    ? portfolio.filter((p) => p.featured).slice(0, 3)
    : portfolio.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background radial glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-glow animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-gradient-glow animate-pulse-glow pointer-events-none" />

      {/* Hero Section */}
      <section className="relative border-b border-slate-200 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <ScrollReveal>
              <span className="eyebrow">Pharmaceutical Consultancy</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mt-4">
                Trusted Regulatory <span className="text-glow-gradient">Precision & Compliance</span>
              </h1>
              <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
                We assist global pharmaceutical manufacturers, distributors, and biotech institutions to stay fully compliant, audit-ready, and market-ready.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary">
                  Request Consultation
                </Button>
                <Button href="/services" variant="outline">
                  Our Offerings
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Slider */}
          <ScrollReveal delay={150}>
            <HeroSlider />
          </ScrollReveal>
        </div>

        {/* Credentials strip */}
        <div className="border-t border-slate-200 mt-8 bg-slate-50 py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-6">
            {CREDENTIALS.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <BadgeCheck className="h-4 w-4 text-primary" strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Overview with Dossier Image */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-2 items-center">
        <ScrollReveal>
          <div className="relative h-[360px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <Image
              src="/regulatory_dossiers.png"
              alt="FDA and EMA Regulatory Compliance Binders"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-transparent" />
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal delay={150}>
            <span className="eyebrow">Company Profile</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 leading-tight">
              Bridging the gap between <span className="text-glow-gradient">regulatory complexity</span> and operational readiness.
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed text-base">
              {settings.aboutUs}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass p-5 rounded-xl border border-slate-200/80">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">Our Mission</p>
                <p className="text-sm text-slate-600 mt-2">{settings.mission}</p>
              </div>
              <div className="glass p-5 rounded-xl border border-slate-200/80">
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">Our Vision</p>
                <p className="text-sm text-slate-600 mt-2">{settings.vision}</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold text-sm transition-colors group">
                Read Company History <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative border-y border-slate-200 bg-slate-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <span className="eyebrow">Expertise</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4">
                Consultancy Built on Technical Precision
              </h2>
              <p className="text-slate-600 mt-4 text-base">
                We design and validate quality systems, manage regulatory affairs, and deliver industry-recognized cGMP workshops.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, i) => {
              const Icon = SERVICE_ICONS[service.category.slug] ?? ShieldCheck;
              return (
                <ScrollReveal key={service._id} delay={i * 100}>
                  <Card className="h-full flex flex-col justify-between group">
                    <div>
                      {service.thumbnail ? (
                        <Image 
                          src={service.thumbnail} 
                          alt={service.title} 
                          width={48} 
                          height={48} 
                          className="h-12 w-12 rounded-xl object-cover shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all border border-slate-200 group-hover:border-primary/40" 
                        />
                      ) : (
                        <span className="h-12 w-12 inline-flex items-center justify-center rounded-xl bg-primary-tint border border-primary/20 shadow-sm group-hover:border-primary/60 group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                          <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                        </span>
                      )}
                      <h3 className="font-bold text-slate-900 text-lg mt-5 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                        {service.shortDescription?.replace(/<[^>]+>/g, '')}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-hover font-semibold transition-colors"
                      >
                        Explore Service Details <span>→</span>
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Numerical Performance Dashboard */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <span className="eyebrow">Our Track Record</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 leading-snug">
                Measured in audits, submissions, and certified graduates
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Our consultancy is run by seasoned pharmaceutical practitioners with decades of active regulatory and clinical experience.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              [stats.projectsCompleted, "Completed Projects", "border-primary"],
              [stats.corporateClients, "Corporate Clients", "border-secondary"],
              [stats.trainingPrograms, "Training Programs", "border-accent-purple"],
              [stats.industryExperts, "Subject Experts", "border-accent-green"],
              [stats.yearsOfExperience, "Years of Experience", "border-accent-yellow"],
            ].map(([value, label, borderClass], idx) => (
              <ScrollReveal key={label} delay={idx * 75}>
                <div className={`p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group hover:border-secondary/50 hover:shadow-md transition-all`}>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{value}+</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-2 leading-tight">{label}</p>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-teal-blue opacity-50`} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Training Teaser */}
      <section className="relative border-t border-slate-200 bg-slate-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <ScrollReveal>
              <span className="eyebrow">Workforce Training</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 leading-snug">
                Up-skill your team with our <span className="text-glow-gradient">cGMP Fundamentals</span> Workshops
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Continuous education is the foundation of quality assurance. Our hands-on courses prepare site staff, analysts, and directors for the requirements of FDA, MHRA, and local regulatory audits.
              </p>
              <div className="mt-8">
                <Button href="/training" variant="primary">
                  Browse Active Courses
                </Button>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={150}>
            <div className="relative h-[350px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <Image
                src="/professional_training.png"
                alt="cGMP Training Session and Boardroom Consulting"
                fill
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Clients */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="eyebrow">Partnerships</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Trusted Across Manufacturing, Distribution, & Biologics
            </h2>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredClients.map((client, idx) => (
            <ScrollReveal key={client._id} delay={idx * 100}>
              <div className="glass glass-hover px-4 py-3 rounded-full border border-slate-200 text-center flex flex-col justify-center items-center h-20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                {client.logo ? (
                  <Image src={client.logo} alt={client.companyName} width={100} height={32} className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
                ) : (
                  <p className="font-bold text-slate-800 text-sm group-hover:text-primary leading-tight truncate w-full px-4">{client.companyName}</p>
                )}
                {client.industry && <span className="text-[9px] text-primary uppercase font-bold tracking-wider mt-1 truncate w-full px-2">{client.industry}</span>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our Partners — trust logo strip */}
      {partnersWithLogo.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 overflow-hidden">
          <div className="text-center mb-10">
            <ScrollReveal>
              <span className="eyebrow">Our Network</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                Our Partners
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm">
                Organizations we work alongside to deliver trusted regulatory, quality, and training outcomes.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex overflow-hidden relative group space-x-12 w-full mt-10 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex space-x-12 animate-marquee shrink-0 pause-on-hover items-center">
              {partnersWithLogo.map((partner, idx) => {
                const logoEl = (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={64}
                    className="h-14 w-auto object-contain hover:scale-105 transition-all duration-300"
                  />
                );
                return (
                  <div key={`${partner._id}-${idx}`}>
                    {partner.link ? (
                      <Link
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={partner.name}
                        title={partner.name}
                      >
                        {logoEl}
                      </Link>
                    ) : (
                      <div title={partner.name} aria-label={partner.name}>
                        {logoEl}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex space-x-12 animate-marquee shrink-0 pause-on-hover items-center" aria-hidden="true">
              {partnersWithLogo.map((partner, idx) => {
                const logoEl = (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={64}
                    className="h-14 w-auto object-contain hover:scale-105 transition-all duration-300"
                  />
                );
                return (
                  <div key={`${partner._id}-${idx}-dup`}>
                    {partner.link ? (
                      <Link
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={partner.name}
                        title={partner.name}
                      >
                        {logoEl}
                      </Link>
                    ) : (
                      <div title={partner.name} aria-label={partner.name}>
                        {logoEl}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Portfolio / Case Studies */}
      {featuredPortfolio.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="eyebrow">Our Work</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                Selected Case Studies
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm">
                A look at how we&rsquo;ve helped manufacturers, distributors, and biologics companies solve real regulatory and compliance challenges.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((item: PortfolioItem, idx: number) => (
              <ScrollReveal key={item._id} delay={idx * 100}>
                <Link href={`/portfolio/${item.slug}`} className="group block h-full">
                  <Card className="!rounded-3xl !p-5 h-full flex flex-col justify-between group-hover:border-primary/40 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-surface-sunken border border-border text-[9px] uppercase font-bold text-secondary">
                        {item.industry || "Case Study"}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-4 group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.client?.companyName && (
                        <p className="text-xs text-slate-500 mt-2">Client: <span className="font-semibold text-slate-700">{item.client.companyName}</span></p>
                      )}
                      {item.outcome && (
                        <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">{item.outcome.replace(/<[^>]+>/g, '')}</p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-5 group-hover:text-primary-hover">
                      Read case study <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/portfolio" variant="outline">View Full Portfolio</Button>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="eyebrow">Client Voices</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                What Our Clients Say
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((t: TestimonialItem, idx: number) => (
              <ScrollReveal key={t._id} delay={idx * 100}>
                <Card className="h-full flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <QuoteIcon className="h-6 w-6 text-primary/40" strokeWidth={1.5} />
                  <p className="text-sm text-slate-600 mt-4 flex-1 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < (t.rating ?? 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                    {t.photo ? (
                      <Image src={t.photo} alt={t.clientName} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-teal-blue flex items-center justify-center text-white text-xs font-bold">
                        {t.clientName?.charAt(0) ?? "?"}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{t.clientName}</p>
                      <p className="text-xs text-slate-500">
                        {[t.designation, t.company].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Latest Insights / Blog */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-end mb-16 gap-6">
            <div>
              <ScrollReveal>
                <span className="eyebrow">Publications</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4">
                  Regulatory Notes & Quality Insights
                </h2>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={100}>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold text-sm transition-colors group">
                  See All Publications <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {blogs.slice(0, 2).map((post, idx) => (
              <ScrollReveal key={post._id} delay={idx * 150}>
                <Card className="!rounded-3xl !p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border hover:border-primary/30 group">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-secondary border border-blue-100">
                    {post.category.name}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mt-4 leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed line-clamp-2">
                    {post.content?.replace(/<[^>]+>/g, '')}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                    <span>Views: {post.views}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:underline group-hover:text-primary-hover flex items-center gap-1"
                    >
                      Read Insights <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ScrollReveal>
          <div className="glass p-12 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 max-w-2xl mx-auto leading-tight relative z-10">
              Ready to Align Your Manufacturing with Global Regulatory Standards?
            </h2>
            <p className="text-slate-600 text-base mt-4 max-w-xl mx-auto relative z-10">
              Consult with our principal lead to plan a mock regulatory inspection or start dossier compilation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
              <Button href="/contact" variant="primary">
                Schedule Assessment
              </Button>
              <Button href="/services" variant="outline">
                Inquire Offerings
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
