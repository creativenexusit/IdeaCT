"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: Array<{ _id: string; question: string; answer: string }> }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  return (
    <div className="divide-y divide-border border border-border rounded-2xl bg-surface">
      {items.map((item) => {
        const open = openId === item._id;
        return (
          <div key={item._id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item._id)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left min-h-12"
              aria-expanded={open}
            >
              <span className="font-medium text-text-primary">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-text-secondary transition-transform ${open ? "rotate-180" : ""}`}
                strokeWidth={1.75}
              />
            </button>
            {open && <p className="px-5 pb-4 text-sm text-text-secondary">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
