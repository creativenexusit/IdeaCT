import Link from "next/link";
import {
  Briefcase, GraduationCap, Building2, FolderKanban,
  FileText, Download, Award, Image as ImageIcon, Users, Inbox,
  Plus, ArrowRight, TrendingUp, Activity,
} from "lucide-react";
import {
  getServices, getTrainings, getClients, getPortfolio,
  getBlogs, getDownloads, getCertificates, getGalleryItems, getExpertTeam,
} from "@/lib/content";
import { DashboardChart } from "@/components/admin/DashboardChart";

const monthlyInquiries = [
  { label: "Feb", value: 12 },
  { label: "Mar", value: 18 },
  { label: "Apr", value: 15 },
  { label: "May", value: 22 },
  { label: "Jun", value: 19 },
  { label: "Jul", value: 9 },
];

const quickActions = [
  { href: "/admin/services", label: "New Service", icon: Plus, desc: "Add a consultancy service" },
  { href: "/admin/blog", label: "New Blog Post", icon: FileText, desc: "Publish an article" },
  { href: "/admin/clients", label: "New Client", icon: Building2, desc: "Register a client" },
  { href: "/admin/trainings", label: "New Training", icon: GraduationCap, desc: "Schedule a programme" },
  { href: "/admin/downloads", label: "Upload Resource", icon: Download, desc: "Add downloadable file" },
  { href: "/admin/inquiries", label: "View Inquiries", icon: Inbox, desc: "Check new leads" },
];

export default async function AdminDashboardPage() {
  const demoMode = !process.env.DATABASE_URL;

  const [
    services, trainings, clients, portfolio,
    blogs, downloads, certificates, galleryItems, expertTeam,
  ] = await Promise.all([
    getServices(), getTrainings(), getClients(), getPortfolio(),
    getBlogs(), getDownloads(), getCertificates(), getGalleryItems(), getExpertTeam(),
  ]);

  const stats = [
    { label: "Services", value: services.length, icon: Briefcase, href: "/admin/services", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { label: "Training Programs", value: trainings.length, icon: GraduationCap, href: "/admin/trainings", color: "text-accent-cyan", bg: "bg-accent-cyan/10 border-accent-cyan/20" },
    { label: "Clients", value: clients.length, icon: Building2, href: "/admin/clients", color: "text-accent-purple", bg: "bg-accent-purple/10 border-accent-purple/20" },
    { label: "Portfolio Projects", value: portfolio.length, icon: FolderKanban, href: "/admin/portfolio", color: "text-accent-orange", bg: "bg-accent-orange/10 border-accent-orange/20" },
    { label: "Blog Posts", value: blogs.length, icon: FileText, href: "/admin/blog", color: "text-secondary", bg: "bg-secondary/10 border-secondary/20" },
    { label: "Downloads", value: downloads.length, icon: Download, href: "/admin/downloads", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { label: "Certificates", value: certificates.length, icon: Award, href: "/admin/certificates", color: "text-accent-crimson", bg: "bg-accent-crimson/10 border-accent-crimson/20" },
    { label: "Gallery Items", value: galleryItems.length, icon: ImageIcon, href: "/admin/gallery", color: "text-accent-purple", bg: "bg-accent-purple/10 border-accent-purple/20" },
    { label: "Team Members", value: expertTeam.length, icon: Users, href: "/admin/team", color: "text-accent-cyan", bg: "bg-accent-cyan/10 border-accent-cyan/20" },
    { label: "New Inquiries", value: 0, icon: Inbox, href: "/admin/inquiries", color: "text-accent-crimson", bg: "bg-accent-crimson/10 border-accent-crimson/20" },
  ];

  const blogViews = blogs.map((b: any) => ({ label: String(b.title).slice(0, 18) + "…", value: b.views }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-0.5">IdeaCT Content Management Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-secondary" />
          <span className="text-xs text-secondary font-semibold">System Online</span>
        </div>
      </div>

      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/25 bg-warning/5 px-4 py-3 text-sm">
          <TrendingUp className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-warning">Demo Mode Active</span>
            <span className="text-text-secondary ml-2">No live database connected. Counts reflect mock data from <code className="text-warning">lib/content.ts</code>.</span>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className={`group rounded-xl border p-4 transition-all hover:scale-[1.02] ${s.bg}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-4 w-4 ${s.color}`} strokeWidth={1.75} />
                <ArrowRight className={`h-3.5 w-3.5 ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-text-secondary mt-0.5 font-medium">{s.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 hover:border-primary/40 hover:bg-primary-tint transition-all"
              >
                <Icon className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors" strokeWidth={1.75} />
                <div>
                  <p className="text-xs font-bold text-text-primary transition-colors">{action.label}</p>
                  <p className="text-[10px] text-text-muted transition-colors mt-0.5">{action.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-3">Analytics</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <DashboardChart title="Monthly Inquiries (Illustrative)" data={monthlyInquiries} dataKey="Inquiries" />
          <DashboardChart title="Blog Post Views" data={blogViews} dataKey="Views" />
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest">Recent Content</h2>
          <Link href="/admin/blog" className="text-xs text-primary hover:text-primary-hover font-semibold transition-colors">
            View All →
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border">
          {blogs.slice(0, 3).map((blog: any) => (
            <div key={blog._id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{blog.title}</p>
                <p className="text-xs text-text-secondary mt-0.5">{blog.category?.name} · {Number(blog.views).toLocaleString()} views</p>
              </div>
              <Link href={`/admin/blog`} className="ml-4 shrink-0 text-xs text-text-muted hover:text-primary transition-colors font-medium">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
