"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { Button } from "./Button";

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
  items: NavItem[];
};

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  groups: NavGroup[];
}

export function MobileDrawer({
  open,
  onClose,
  groups,
}: MobileDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${open
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 h-screen w-[68%] max-w-[360px] bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <h2 className="font-bold text-slate-900">Menu</h2>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <Link
            href="/"
            onClick={onClose}
            className="block px-6 py-4 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Home
          </Link>

          {groups.map((group) => (
            <div key={group.key}>
              <button
                onClick={() =>
                  setOpenGroup(
                    openGroup === group.key ? null : group.key
                  )
                }
                className="flex w-full items-center justify-between px-6 py-4 text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                {group.label}

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openGroup === group.key ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openGroup === group.key
                  ? "max-h-96"
                  : "max-h-0"
                  }`}
              >
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 py-3 pl-10 pr-5 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {Icon && (
                        <Icon
                          className="h-4 w-4 text-primary"
                          strokeWidth={1.8}
                        />
                      )}

                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <Link
            href="/contact"
            onClick={onClose}
            className="block px-6 py-4 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Contact
          </Link>

          <Link
            href="/admin/login"
            onClick={onClose}
            className="block px-6 py-4 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Sign In
          </Link>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-5">
          <Button href="/contact" className="w-full" onClick={onClose}>
            Contact Us
          </Button>
        </div>
      </aside>
    </div>
  );
}