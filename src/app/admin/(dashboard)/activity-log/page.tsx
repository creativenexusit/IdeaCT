"use client";

import { useEffect, useState } from "react";

type LogEntry = {
  _id: string;
  actorEmail?: string;
  action: string;
  description: string;
  createdAt: string;
};

export default function AdminActivityLogPage() {
  const [items, setItems] = useState<LogEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/activity-log")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setItems(data.data.items);
        else setError(data.message);
      })
      .catch(() => setError("Could not reach the API."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Activity Log</h1>
      <p className="text-sm text-text-secondary mt-1">
        Login events, content changes, and settings changes, per Phase 9.
      </p>

      <div className="mt-6 bg-surface border border-border rounded-2xl divide-y divide-border">
        {error && <p className="p-6 text-sm text-red-600">{error}</p>}
        {!error && items.length === 0 && (
          <p className="p-6 text-sm text-text-secondary">No activity recorded yet.</p>
        )}
        {items.map((entry) => (
          <div key={entry._id} className="p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-text-primary">{entry.description}</p>
              <p className="text-xs text-text-secondary mt-1">
                {entry.actorEmail ?? "System"} · {entry.action}
              </p>
            </div>
            <span className="text-xs text-text-secondary shrink-0">
              {new Date(entry.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
