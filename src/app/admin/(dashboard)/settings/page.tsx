"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  {
    title: "General",
    fields: ["companyName", "email", "phone", "address", "businessHours"],
  },
  { title: "Branding", fields: ["logo", "favicon"], superAdminOnly: true },
  { title: "SEO", fields: ["seo.metaTitle", "seo.metaDescription"], superAdminOnly: true },
  { title: "SMTP", fields: ["smtp.host", "smtp.senderEmail"], superAdminOnly: true },
  {
    title: "Social Media",
    fields: ["socialLinks.facebook", "socialLinks.linkedin", "socialLinks.youtube"],
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(SECTIONS[0].title);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.data);
      })
      .catch(() => setError("Could not reach the API (no live DATABASE_URL in this environment)."));
  }, []);

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        setStatus("error");
        return;
      }
      setStatus("idle");
    } catch {
      setError("Could not reach the API.");
      setStatus("error");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Website Settings</h1>
      <p className="text-sm text-text-secondary mt-1">
        Company Name here is read/written from the <code>website_settings</code>{" "}
        singleton document — every public page reads it live, no rebuild
        required, per the spec.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 max-w-2xl divide-y divide-border border border-border rounded-2xl bg-surface">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() =>
                setOpenSection(openSection === section.title ? null : section.title)
              }
            >
              <span className="font-medium text-text-primary">{section.title}</span>
              {section.superAdminOnly && (
                <span className="text-xs text-text-secondary">Super Admin only</span>
              )}
            </button>
            {openSection === section.title && (
              <div className="px-5 pb-5 space-y-3">
                {section.fields.map((field) => (
                  <div key={field}>
                    <label className="block text-xs text-text-secondary mb-1">{field}</label>
                    <input
                      disabled={!settings}
                      defaultValue=""
                      className="w-full rounded-xl border border-border px-3 py-2 text-sm min-h-11"
                      onChange={(e) =>
                        setSettings((prev) => ({ ...(prev ?? {}), [field]: e.target.value }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={status === "saving" || !settings}
        className="mt-6 min-h-11 px-6 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-50"
      >
        {status === "saving" ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
