"use client";

import { useEffect, useState } from "react";

export default function AdminLeadWidgetsPage() {
  const [popup, setPopup] = useState<Record<string, any> | null>(null);
  const [floating, setFloating] = useState<Record<string, any> | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/lead-popup-settings").then((r) => r.json()).then((d) => d.success && setPopup(d.data));
    fetch("/api/floating-contact-settings").then((r) => r.json()).then((d) => d.success && setFloating(d.data));
  }, []);

  async function save(endpoint: string, body: Record<string, unknown>) {
    setStatus("Saving...");
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setStatus(data.success ? "Saved." : data.message);
    } catch {
      setStatus("Could not reach the API.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Lead Popup &amp; Floating Contact</h1>
      <p className="text-sm text-text-secondary mt-1">
        Both are Super Admin only, per Section 6. {status}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-text-primary mb-4">Lead Popup</h2>
          {popup ? (
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(popup.enabled)}
                  onChange={(e) => setPopup({ ...popup, enabled: e.target.checked })}
                />
                Enabled
              </label>
              <input
                placeholder="Headline"
                value={popup.headline ?? ""}
                onChange={(e) => setPopup({ ...popup, headline: e.target.value })}
                className="w-full rounded-xl border border-border px-3 py-2 min-h-11"
              />
              <textarea
                placeholder="Description"
                value={popup.description ?? ""}
                onChange={(e) => setPopup({ ...popup, description: e.target.value })}
                className="w-full rounded-xl border border-border px-3 py-2"
              />
              <select
                value={popup.triggerType}
                onChange={(e) => setPopup({ ...popup, triggerType: e.target.value })}
                className="w-full rounded-xl border border-border px-3 py-2 min-h-11"
              >
                <option value="timeDelay">Time Delay</option>
                <option value="scrollPercentage">Scroll Percentage</option>
                <option value="exitIntent">Exit Intent</option>
              </select>
              <button
                onClick={() => save("/api/lead-popup-settings", popup)}
                className="min-h-11 px-5 rounded-xl bg-primary text-white font-medium"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-sm text-text-secondary">Loading (or no live API in this sandbox)...</p>
          )}
        </section>

        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-text-primary mb-4">Floating Contact</h2>
          {floating ? (
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(floating.whatsappEnabled)}
                  onChange={(e) => setFloating({ ...floating, whatsappEnabled: e.target.checked })}
                />
                WhatsApp Enabled
              </label>
              <input
                placeholder="WhatsApp Number (e.g. 8801234567890)"
                value={floating.whatsappNumber ?? ""}
                onChange={(e) => setFloating({ ...floating, whatsappNumber: e.target.value })}
                className="w-full rounded-xl border border-border px-3 py-2 min-h-11"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(floating.messengerEnabled)}
                  onChange={(e) => setFloating({ ...floating, messengerEnabled: e.target.checked })}
                />
                Messenger Enabled
              </label>
              <input
                placeholder="Messenger Page Username"
                value={floating.messengerPageUsername ?? ""}
                onChange={(e) => setFloating({ ...floating, messengerPageUsername: e.target.value })}
                className="w-full rounded-xl border border-border px-3 py-2 min-h-11"
              />
              <button
                onClick={() => save("/api/floating-contact-settings", floating)}
                className="min-h-11 px-5 rounded-xl bg-primary text-white font-medium"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-sm text-text-secondary">Loading (or no live API in this sandbox)...</p>
          )}
        </section>
      </div>
    </div>
  );
}
