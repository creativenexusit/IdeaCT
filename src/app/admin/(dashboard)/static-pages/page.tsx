"use client";

import { useEffect, useState } from "react";

const PAGES = [
  { key: "privacy-policy", label: "Privacy Policy" },
  { key: "terms", label: "Terms and Conditions" },
];

export default function AdminStaticPagesPage() {
  const [active, setActive] = useState(PAGES[0].key);
  const [doc, setDoc] = useState<{ title: string; content: string } | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDoc(null);
    fetch(`/api/static-pages/${active}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDoc({ title: data.data.title, content: data.data.content });
        else setStatus(data.message);
      })
      .catch(() => setStatus("Could not reach the API."));
  }, [active]);

  async function save() {
    if (!doc) return;
    setStatus("Saving...");
    try {
      const res = await fetch(`/api/static-pages/${active}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      const data = await res.json();
      setStatus(data.success ? "Saved." : data.message);
    } catch {
      setStatus("Could not reach the API.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Static Pages</h1>
      <p className="text-sm text-text-secondary mt-1">
        Privacy Policy and Terms and Conditions, Super Admin editable, per Phase 8.
      </p>

      <div className="mt-6 flex gap-2">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className={`px-4 py-2 text-sm rounded-lg min-h-9 ${active === p.key ? "bg-primary text-white" : "border border-border text-text-secondary"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {doc ? (
        <div className="mt-6 max-w-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
            <input
              value={doc.title}
              onChange={(e) => setDoc({ ...doc, title: e.target.value })}
              className="w-full rounded-xl border border-border px-3 py-2 text-sm min-h-11"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Content</label>
            <textarea
              rows={10}
              value={doc.content}
              onChange={(e) => setDoc({ ...doc, content: e.target.value })}
              className="w-full rounded-xl border border-border px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={save}
            className="min-h-11 px-5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover"
          >
            Save
          </button>
          <p className="text-sm text-text-secondary">{status}</p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-text-secondary">{status || "Loading..."}</p>
      )}
    </div>
  );
}
