"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Tag, GraduationCap, HelpCircle,
  Building2, FolderKanban, Users, UserSquare2, FileText,
  Image as ImageIcon, Award, Download, Inbox, UserCog,
  Settings, Menu, X, ChevronRight, Quote, Handshake,
} from "lucide-react";
import Image from "next/image";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/guidelines", label: "Admin Guide", icon: HelpCircle },
    ],
  },
  {
    label: "Services & Training",
    items: [
      { href: "/admin/services", label: "Services", icon: Briefcase },
      { href: "/admin/service-categories", label: "Service Categories", icon: Tag },
      { href: "/admin/trainings", label: "Training", icon: GraduationCap },
      { href: "/admin/training-categories", label: "Training Categories", icon: Tag },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
    ],
  },
  {
    label: "Clients & Work",
    items: [
      { href: "/admin/clients", label: "Clients", icon: Building2 },
      { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/partners", label: "Partners", icon: Handshake },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/team", label: "Expert Team", icon: Users },
      { href: "/admin/leadership", label: "Leadership", icon: UserSquare2 },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/hero-slides", label: "Hero Slider", icon: ImageIcon },
      { href: "/admin/blog", label: "Blog Posts", icon: FileText },
      { href: "/admin/blog-categories", label: "Blog Categories", icon: Tag },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/certificates", label: "Certificates", icon: Award },
      { href: "/admin/trainee-certificates", label: "Trainee Certificates", icon: Award },
      { href: "/admin/downloads", label: "Downloads", icon: Download },
    ],
  },
  {
    label: "Leads",
    items: [{ href: "/admin/inquiries", label: "Inquiries", icon: Inbox }],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/users", label: "Users", icon: UserCog },
      { href: "/admin/settings", label: "Website Settings", icon: Settings },
    ],
  },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto py-3">
      {navGroups.map((group) => (
        <div key={group.label} className="mb-1">
          <p className="px-4 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {group.label}
          </p>
          {group.items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm min-h-10 transition-all duration-150 ${
                  active
                    ? "admin-nav-item-active"
                    : "admin-nav-item"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-text-muted"}`} strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-primary shrink-0" />}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Desktop Sidebar ──────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 admin-sidebar h-screen sticky top-0">
        <div className="h-14 flex items-center px-4 border-b border-border gap-2.5 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="ideaCT">
            <Image
              src="/logo.png"
              alt={`ideaCT logo`}
              width={40}
              height={44}
              priority
              className="h-12 w-auto object-contain"
            />
           
          </Link>
          <span className="font-bold text-text-primary text-sm tracking-tight">Admin Pannel</span>
        </div>
        <NavLinks pathname={pathname} />
        <div className="p-3 border-t border-border shrink-0">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all">
            <span>← View Public Site</span>
          </Link>
        </div>
      </aside>

      {/* ── Mobile Top Bar ───────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xs">
            i
          </div>
          <span className="font-bold text-text-primary text-sm">IdeaCT Admin</span>
        </div>
        <button
          aria-label="Open admin menu"
          onClick={() => setDrawerOpen(true)}
          className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface text-text-secondary active:scale-95 transition-transform"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full z-50 w-72 max-w-[85vw] bg-surface border-r border-border flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xs shadow-[0_0_10px_rgba(19,84,146,0.4)]">
              i
            </div>
            <span className="font-bold text-text-primary text-sm">IdeaCT Admin</span>
          </div>
          <button
            aria-label="Close admin menu"
            onClick={() => setDrawerOpen(false)}
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border text-text-secondary active:scale-95 transition-transform"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Drawer nav links */}
        <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />

        {/* Drawer footer */}
        <div className="p-3 border-t border-border shrink-0">
          <Link
            href="/"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
          >
            <span>← View Public Site</span>
          </Link>
        </div>
      </div>
    </>
  );
}
