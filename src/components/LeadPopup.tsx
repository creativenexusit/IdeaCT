"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

type LeadPopupSettings = {
  enabled: boolean;
  headline?: string;
  description?: string;
  triggerType: "exitIntent" | "timeDelay" | "scrollPercentage";
  timeDelaySeconds: number;
  scrollPercentageThreshold: number;
  showOncePerSession: boolean;
  suppressDays: number;
  fields: Array<"name" | "email" | "phone" | "company" | "message">;
};

const COOKIE_NAME = "ideact_lead_popup_dismissed";

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function LeadPopup() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<LeadPopupSettings | null>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const shownThisSession = useRef(false);

  const isContactPage = pathname?.includes("/contact");

  useEffect(() => {
    fetch("/api/lead-popup-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.data);
      })
      .catch(() => {
        // No live DB in this sandbox — popup simply never appears, which is
        // the correct fail-safe behavior for an optional widget.
      });
  }, []);

  useEffect(() => {
    if (!settings?.enabled || isContactPage) return;
    if (settings.showOncePerSession && shownThisSession.current) return;

    const dismissedAt = readCookie(COOKIE_NAME);
    if (dismissedAt && Date.now() - Number(dismissedAt) < settings.suppressDays * 86400000) {
      return;
    }

    if (settings.triggerType === "timeDelay") {
      const timer = setTimeout(() => {
        setVisible(true);
        shownThisSession.current = true;
      }, settings.timeDelaySeconds * 1000);
      return () => clearTimeout(timer);
    }

    if (settings.triggerType === "scrollPercentage") {
      function onScroll() {
        const scrolled =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= settings!.scrollPercentageThreshold) {
          setVisible(true);
          shownThisSession.current = true;
          window.removeEventListener("scroll", onScroll);
        }
      }
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    if (settings.triggerType === "exitIntent") {
      function onMouseLeave(e: MouseEvent) {
        if (e.clientY <= 0) {
          setVisible(true);
          shownThisSession.current = true;
          document.removeEventListener("mouseleave", onMouseLeave);
        }
      }
      document.addEventListener("mouseleave", onMouseLeave);
      return () => document.removeEventListener("mouseleave", onMouseLeave);
    }
  }, [settings, isContactPage]);

  function dismiss() {
    setVisible(false);
    if (settings) setCookie(COOKIE_NAME, String(Date.now()), settings.suppressDays);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name") || "Popup lead",
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      subject: "Popup lead capture",
      message: (form.get("message") as string) || "Submitted via lead capture popup.",
    };
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch {
      // Fail silently — this is a secondary lead-gen surface, not a critical path.
    }
  }

  if (!visible || !settings) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <button aria-label="Dismiss" className="absolute inset-0 bg-black/30" onClick={dismiss} />
      <div className="relative bg-surface border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {submitted ? (
          <p className="text-accent-green font-medium pt-2">
            Thanks — we&apos;ll be in touch shortly.
          </p>
        ) : (
          <>
            <h2 className="font-semibold text-text-primary pr-8">{settings.headline}</h2>
            {settings.description && (
              <p className="text-sm text-text-secondary mt-1">{settings.description}</p>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              {settings.fields.includes("name") && (
                <input name="name" placeholder="Name" className="w-full rounded-xl border border-border px-3 py-2 text-sm min-h-11" />
              )}
              {settings.fields.includes("email") && (
                <input name="email" type="email" placeholder="Email" required className="w-full rounded-xl border border-border px-3 py-2 text-sm min-h-11" />
              )}
              {settings.fields.includes("phone") && (
                <input name="phone" placeholder="Phone" className="w-full rounded-xl border border-border px-3 py-2 text-sm min-h-11" />
              )}
              {settings.fields.includes("company") && (
                <input name="company" placeholder="Company" className="w-full rounded-xl border border-border px-3 py-2 text-sm min-h-11" />
              )}
              {settings.fields.includes("message") && (
                <textarea name="message" placeholder="Message" rows={3} className="w-full rounded-xl border border-border px-3 py-2 text-sm" />
              )}
              <button type="submit" className="w-full min-h-11 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
