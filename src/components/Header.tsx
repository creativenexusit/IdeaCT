"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Building2,
  FolderKanban,
  Info,
  Users,
  FileText,
  Image as ImageIcon,
  Award,
  Download,
} from "lucide-react";

import { Button } from "./Button";
import { MobileDrawer } from "./MobileDrawer";

type NavItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
};

type NavGroup = {
  key: string;
  label: string;
  description?: string;
  items: NavItem[];
};

export function Header({
  companyName,
}: {
  companyName: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const groups: NavGroup[] = [
    {
      key: "services",
      label: "Services",
      items: [
        {
          href: "/services",
          label: "Services",
          icon: Briefcase,
        },
        {
          href: "/training",
          label: "Training",
          icon: GraduationCap,
        },
      ],
    },
    {
      key: "work",
      label: "Our Work",
      items: [
        {
          href: "/clients",
          label: "Clients",
          icon: Building2,
        },
        {
          href: "/portfolio",
          label: "Portfolio",
          icon: FolderKanban,
        },
      ],
    },
    {
      key: "company",
      label: "Company",
      items: [
        {
          href: "/about",
          label: "About Us",
          icon: Info,
        },
        {
          href: "/team",
          label: "Expert Team",
          icon: Users,
        },
        {
          href: "/blog",
          label: "Blog",
          icon: FileText,
        },
        {
          href: "/gallery",
          label: "Gallery",
          icon: ImageIcon,
        },
      ],
    },
    {
      key: "resources",
      label: "Resources",
      items: [
        {
          href: "/certificates",
          label: "Certificates",
          icon: Award,
        },
        {
          href: "/downloads",
          label: "Downloads",
          icon: Download,
        },
      ],
    },
  ];

  function openWithDelay(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(key);
  }

  function closeWithDelay() {
    closeTimer.current = setTimeout(() => {
      setOpenGroup(null);
    }, 150);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={companyName}>
            <Image
              src="/logo.png"
              alt={`${companyName} logo`}
              width={40}
              height={44}
              priority
              className="h-15 w-auto object-contain"
            />
           
          </Link>

          {/* Desktop navigation (keep your existing code here) */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-100 transition-all duration-200"
            >
              Home
            </Link>

            {groups.map((group) => (
              <div
                key={group.key}
                className="relative"
                onMouseEnter={() => openWithDelay(group.key)}
                onMouseLeave={closeWithDelay}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroup(openGroup === group.key ? null : group.key)
                  }
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-100 transition-all duration-200"
                >
                  {group.label}

                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openGroup === group.key ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openGroup === group.key && (
                  <div
                    className="absolute left-0 top-full pt-2 w-72"
                    onMouseEnter={() => openWithDelay(group.key)}
                    onMouseLeave={closeWithDelay}
                  >
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                      {group.description && (
                        <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-3">
                          <p className="text-[11px] uppercase tracking-wider text-slate-400">
                            {group.description}
                          </p>
                        </div>
                      )}

                      <div className="p-2">
                        {group.items.map((item) => {
                          const Icon = item.icon;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpenGroup(null)}
                              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                            >
                              {Icon && (
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                                  <Icon
                                    className="h-4 w-4 text-primary"
                                    strokeWidth={1.8}
                                  />
                                </span>
                              )}

                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>


          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              Sign In
            </Link>

            <Button href="/contact">
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        groups={groups}
      />
    </>
  );
}