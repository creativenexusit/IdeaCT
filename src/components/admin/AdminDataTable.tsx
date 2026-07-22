"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Trash2, Search, Plus, X, Pencil, Loader2, Upload, CheckCircle2, Mail, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { RichTextEditor } from "./RichTextEditor";

type Column = { key: string; label: string; render?: (row: any) => React.ReactNode };

function renderCellValue(value: any, key: string) {
  const k = key.toLowerCase();
  const isImageKey = k.includes("image") || k.includes("icon") || k.includes("banner") || k.includes("logo") || k.includes("avatar") || k.includes("thumbnail") || k.includes("photo") || k.includes("pic") || k.includes("file");
  
  if (typeof value === "string" && value.trim() !== "" && (
    isImageKey ||
    value.startsWith("http://") || 
    value.startsWith("https://") || 
    value.startsWith("/")
  ) && (
    value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || 
    value.includes("res.cloudinary.com") ||
    isImageKey
  )) {
    return (
      <img 
        src={value} 
        alt="Thumbnail" 
        className="h-10 w-10 object-cover rounded-lg border border-border shadow-sm bg-surface-sunken"
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
    );
  }
  return String(value ?? "");
}

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "richtext" | "number" | "checkbox" | "select" | "date" | "file" | "password";
  options?: (string | { value: string; label: string })[];
  optionsEndpoint?: string;
  placeholder?: string;
  required?: boolean;
  translatable?: boolean;
  /** For file uploads: Cloudinary folder name (e.g. "blog", "team", "gallery") */
  uploadFolder?: string;
  /** If true, this field is the slug and will be auto-populated from the name/title field */
  isSlug?: boolean;
  /** If true, this field is read-only and cannot be edited */
  readonly?: boolean;
};

export function AdminDataTable({
  title,
  endpoint,
  columns,
  fields,
  addLabel = "Add New",
  enableBulkEmail = false,
  bulkEmailEndpoint,
  filters,
}: {
  title: string;
  endpoint: string;
  columns: Column[];
  fields?: FormField[];
  addLabel?: string;
  /** Shows row checkboxes + a "Email Selected" action (e.g. for the Clients screen). */
  enableBulkEmail?: boolean;
  /** Defaults to `${endpoint}/bulk-email` if not provided. */
  bulkEmailEndpoint?: string;
  /** Generic dropdown filters for the table */
  filters?: { key: string; label: string; options: string[] }[];
}) {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) params.set("search", search);
      Object.entries(filterValues).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      const res = await fetch(`${endpoint}?${params.toString()}`);
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to load records.");
        setItems([]);
        return;
      }
      setItems(data.data.items ?? []);
      setTotalPages(data.data.pagination?.totalPages ?? 1);
    } catch {
      setError(
        "Could not reach the API. This is expected without a live DATABASE_URL configured — see the README.md."
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, search, filterValues]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("Archive this record? This is a soft delete and can be restored later.")) return;
    try {
      const res = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Archived successfully.");
        load();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Could not reach the API.");
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAllOnPage() {
    setSelectedIds((prev) => {
      const allSelected = items.every((row) => prev.has(row._id));
      const next = new Set(prev);
      if (allSelected) {
        items.forEach((row) => next.delete(row._id));
      } else {
        items.forEach((row) => next.add(row._id));
      }
      return next;
    });
  }

  function openAdd() {
    setEditingRow(null);
    setModalOpen(true);
  }

  function openEdit(row: any) {
    setEditingRow(row);
    setModalOpen(true);
  }

  async function handleFormSubmit(values: Record<string, unknown>) {
    const isEdit = Boolean(editingRow);
    try {
      const res = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { ...values, _id: editingRow._id } : values),
      });
      const data = await res.json();
      if (!data.success) {
        let errorMsg = data.message || "Save failed.";
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMsg += "\n" + data.errors.map((err: any) => `${err.path ? err.path.join(".") + ": " : ""}${err.message}`).join("\n");
        }
        toast.error(errorMsg);
        return;
      }
      setModalOpen(false);
      toast.success("Saved successfully.");
      load();
    } catch {
      toast.error("Could not reach the API.");
    }
  }

  return (
    <div className="space-y-4">
      {/* Top Header Section */}
      <div className="flex items-start sm:items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-text-primary">{title}</h1>
          <p className="text-xs text-text-secondary mt-0.5">Manage and update your {title.toLowerCase()} records</p>
        </div>
        {enableBulkEmail && selectedIds.size > 0 && (
          <button
            onClick={() => setEmailModalOpen(true)}
            className="inline-flex items-center gap-2 min-h-10 px-4 rounded-xl bg-surface border border-primary text-primary text-xs font-bold hover:bg-primary-tint transition-all duration-200 shrink-0"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
            Email Selected ({selectedIds.size})
          </button>
        )}
        {fields && (
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 min-h-10 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(19,84,146,0.3)] transition-all duration-200 shrink-0"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="hidden xs:inline">{addLabel}</span>
            <span className="xs:hidden">Add New</span>
          </button>
        )}
      </div>

      {/* Search and Filters Section */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Filter records..."
            className="w-full bg-surface border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary placeholder-text-muted pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all"
          />
        </div>
        {filters && filters.length > 0 && (
          <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
            {filters.map((f) => (
              <select
                key={f.key}
                value={filterValues[f.key] || ""}
                onChange={(e) => {
                  setPage(1);
                  setFilterValues((prev) => ({ ...prev, [f.key]: e.target.value }));
                }}
                className="bg-surface border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary px-3 py-2.5 rounded-xl text-xs outline-none transition-all min-w-[120px]"
              >
                <option value="">All {f.label}</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Main Table Content */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        {error && (
          <div className="p-6 text-center">
            <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">{error}</p>
          </div>
        )}

        {!error && loading && (
          <div className="p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <p className="text-xs text-text-secondary">Retrieving data records...</p>
          </div>
        )}

        {!error && !loading && items.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-xs text-text-secondary">No records found matching search filters.</p>
          </div>
        )}

        {!error && !loading && items.length > 0 && (
          <>
            {/* Mobile Card View — full width, no empty half */}
            <div className="lg:hidden divide-y divide-border">
              {items.map((row) => (
                <div key={row._id} className="p-4 space-y-3">
                  {enableBulkEmail && (
                    <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row._id)}
                        onChange={() => toggleSelect(row._id)}
                        className="h-4 w-4 rounded border-border"
                      />
                      Select for email
                    </label>
                  )}
                  {columns.map((col) => (
                    <div key={col.key} className="flex items-start justify-between gap-3 text-xs">
                      <span className="text-text-muted font-semibold shrink-0 w-24">{col.label}</span>
                      <span className="text-text-primary font-medium text-right flex-1 truncate">
                        {col.render ? col.render(row) : renderCellValue(row[col.key], col.key)}
                      </span>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {fields && (
                      <button
                        onClick={() => openEdit(row)}
                        className="min-h-10 rounded-xl border border-border bg-surface text-xs font-bold text-text-secondary hover:text-primary hover:border-primary/40 active:scale-95 transition-all inline-flex items-center justify-center gap-1.5"
                      >
                        <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="min-h-10 rounded-xl border border-border bg-surface text-xs font-bold text-text-secondary hover:text-danger hover:border-danger/40 active:scale-95 transition-all inline-flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <table className="hidden lg:table w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border bg-surface-sunken text-text-secondary font-bold uppercase tracking-wider">
                  {enableBulkEmail && (
                    <th className="px-5 py-4 font-semibold w-10">
                      <input
                        type="checkbox"
                        checked={items.length > 0 && items.every((row) => selectedIds.has(row._id))}
                        onChange={toggleSelectAllOnPage}
                        className="h-4 w-4 rounded border-border"
                        aria-label="Select all on page"
                      />
                    </th>
                  )}
                  {columns.map((col) => (
                    <th key={col.key} className="px-5 py-4 font-semibold">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-5 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((row) => (
                  <tr key={row._id} className="hover:bg-surface-hover transition-colors">
                    {enableBulkEmail && (
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row._id)}
                          onChange={() => toggleSelect(row._id)}
                          className="h-4 w-4 rounded border-border"
                          aria-label={`Select ${row.companyName || row.title || row._id}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-4 text-text-primary font-medium">
                        {col.render ? col.render(row) : renderCellValue(row[col.key], col.key)}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {fields && (
                          <button
                            onClick={() => openEdit(row)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary/40 transition-all"
                            aria-label="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:text-danger hover:border-danger/30 transition-all"
                          aria-label="Archive"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-2 text-xs">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="min-h-9 px-4 rounded-xl border border-border bg-surface text-text-primary font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
          >
            Previous
          </button>
          <span className="text-text-muted font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="min-h-9 px-4 rounded-xl border border-border bg-surface text-text-primary font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Record Modal Form */}
      {modalOpen && fields && (
        <RecordFormModal
          title={editingRow ? `Edit ${title}` : addLabel}
          fields={fields}
          initialValues={editingRow ?? {}}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Bulk Email Modal */}
      {emailModalOpen && enableBulkEmail && (
        <BulkEmailModal
          endpoint={bulkEmailEndpoint || `${endpoint}/bulk-email`}
          selectedIds={Array.from(selectedIds)}
          selectedCount={selectedIds.size}
          onClose={() => setEmailModalOpen(false)}
          onSent={() => setSelectedIds(new Set())}
        />
      )}
    </div>
  );
}

function BulkEmailModal({
  endpoint,
  selectedIds,
  selectedCount,
  onClose,
  onSent,
}: {
  endpoint: string;
  selectedIds: string[];
  selectedCount: number;
  onClose: () => void;
  onSent: () => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: string[]; failed: { name: string; reason: string }[] } | null>(null);
  const [error, setError] = useState("");

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientIds: selectedIds, subject, message }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to send email.");
        return;
      }
      setResult(data.data);
      onSent();
    } catch {
      setError("Could not reach the API.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button aria-label="Close overlay" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg sm:mx-4 max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border-strong" />
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface sticky top-0 z-10">
          <h2 className="font-bold text-sm text-text-primary tracking-tight flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Email {selectedCount} Selected Client{selectedCount === 1 ? "" : "s"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border hover:bg-surface-hover text-text-secondary"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleSend} className="p-5 space-y-4 flex-1">
            <p className="text-xs text-text-secondary leading-relaxed">
              This sends the same branded email individually to every selected client&rsquo;s contact email
              (no one sees the others&rsquo; addresses). Clients without a Contact Email on file are skipped
              and reported after sending.
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">
                Subject <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Updated Compliance Documentation Available"
                className="w-full bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary rounded-xl px-4 py-3 text-xs min-h-11 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message to these clients..."
                className="w-full bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary rounded-xl px-4 py-3 text-xs min-h-32 outline-none transition-all"
              />
            </div>

            {error && <p className="text-xs text-danger font-medium">{error}</p>}

            <button
              type="submit"
              disabled={sending}
              className="w-full min-h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold hover:shadow-[0_0_15px_rgba(19,84,146,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4 inline-flex items-center justify-center gap-2"
            >
              {sending ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="h-4 w-4" /> Send Email</>
              )}
            </button>
          </form>
        ) : (
          <div className="p-5 space-y-4 flex-1">
            <div className="rounded-xl border border-border bg-surface-sunken p-4">
              <p className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Sent to {result.sent.length} client{result.sent.length === 1 ? "" : "s"}
              </p>
              {result.failed.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-semibold text-danger">
                    {result.failed.length} not sent:
                  </p>
                  <ul className="text-[11px] text-text-secondary space-y-0.5 list-disc list-inside">
                    {result.failed.map((f, i) => (
                      <li key={i}>
                        {f.name} — {f.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full min-h-11 rounded-xl border border-border bg-surface text-xs font-bold text-text-primary hover:bg-surface-hover transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function RecordFormModal({
  title,
  fields,
  initialValues,
  onClose,
  onSubmit,
}: {
  title: string;
  fields: FormField[];
  initialValues: Record<string, unknown>;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [saving, setSaving] = useState(false);
  const slugField = fields.find((f) => f.isSlug);
  const sourceField = fields.find((f) => f.name === "name" || f.name === "title" || f.name === "companyName");
  // Only auto-slug on NEW records (no _id in initialValues)
  const isNew = !initialValues._id;

  function setField(name: string, value: unknown) {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-generate slug when name/title changes on new records
      if (isNew && slugField && sourceField && name === sourceField.name) {
        next[slugField.name] = toSlug(String(value));
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSubmit(values);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <button aria-label="Close overlay" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      {/* Modal panel — bottom sheet on mobile, centered on desktop */}
      <div className="relative bg-surface border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg sm:mx-4 max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Drag handle on mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border-strong" />
        </div>
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface sticky top-0 z-10">
          <h2 className="font-bold text-sm text-text-primary tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border hover:bg-surface-hover text-text-secondary"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1">
          {fields.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={(v) => setField(field.name, v)}
            />
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full min-h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold hover:shadow-[0_0_15px_rgba(19,84,146,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
          >
            {saving ? "Saving changes..." : "Save Record"}
          </button>
        </form>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const required = field.required;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!field.optionsEndpoint) return;
    let active = true;
    async function loadOptions() {
      try {
        const res = await fetch(field.optionsEndpoint!);
        const json = await res.json();
        if (json.success && active) {
          const items = json.data?.items ?? [];
          const mapped = items.map((item: any) => ({
            value: item._id,
            label: item.name || item.companyName || item.title || item._id,
          }));
          setDynamicOptions(mapped);
        }
      } catch (err) {
        console.error("Failed to load options from endpoint:", err);
      }
    }
    loadOptions();
    return () => {
      active = false;
    };
  }, [field.optionsEndpoint]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (field.uploadFolder) formData.append("folder", field.uploadFolder);
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      const data = await res.json();
      const url = data?.data?.secure_url ?? data?.data?.url ?? data?.url ?? null;
      if (data.success && url) {
        onChange(url);
        setUploadSuccess("File uploaded successfully.");
        setTimeout(() => setUploadSuccess(""), 3000);
      } else {
        setUploadError(data.message || "Upload failed.");
      }
    } catch {
      setUploadError("Upload failed — check Cloudinary configuration.");
    } finally {
      setUploading(false);
    }
  }

  if (field.readonly) {
    return (
      <div className="py-2 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 border-b border-border/30 last:border-0">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted w-32 shrink-0 pt-0.5">{field.label}</span>
        <span className="text-[13px] text-text-primary whitespace-pre-wrap leading-relaxed flex-1 font-medium">{String(value || "—")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-text-secondary">
        {field.label} {required && <span className="text-danger">*</span>}
      </label>

      {field.type === "richtext" && (
        <RichTextEditor value={(value as string) ?? ""} onChange={onChange} />
      )}

          {field.type === "textarea" && (
            <textarea
              rows={4}
              required={required}
              value={(value as string) ?? ""}
              placeholder={field.placeholder}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary rounded-xl px-4 py-3 text-xs min-h-24 outline-none transition-all"
            />
          )}

          {(field.type === "select" || field.optionsEndpoint) && (
            <select
              required={required}
              value={(value as string) ?? ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary rounded-xl px-4 py-3 text-xs min-h-11 outline-none transition-all"
            >
              <option value="">
                {field.placeholder || "Select..."}
              </option>
              {field.options?.map((opt) => {
                const val = typeof opt === "string" ? opt : opt.value;
                const lbl = typeof opt === "string" ? opt : opt.label;
                return (
                  <option key={val} value={val}>
                    {lbl}
                  </option>
                );
              })}
              {dynamicOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkbox" && (
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="h-5 w-5 rounded border-border bg-surface"
            />
          )}

          {field.type === "file" && (
            <div className="space-y-2">
              {Boolean(value) && (
                <div className="flex items-center gap-2 text-xs">
                  {/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(String(value)) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={String(value)} alt="preview" className="h-16 rounded-lg border border-border object-cover" />
                  ) : (
                    <span className="text-primary font-medium truncate max-w-xs">{String(value)}</span>
                  )}
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-xs font-semibold text-text-secondary hover:text-primary hover:border-primary/40 transition-all disabled:opacity-50"
                >
                  {uploading ? (
                    <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload className="h-3.5 w-3.5" /> Choose File</>
                  )}
                </button>
                <input
                  type="text"
                  placeholder={field.placeholder || "or paste URL..."}
                  value={(value as string) ?? ""}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1 bg-background border border-border focus:border-primary/50 text-text-primary rounded-xl px-3 py-2.5 text-xs outline-none transition-all"
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadSuccess && (
                <p className="text-xs text-secondary font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  {uploadSuccess}
                </p>
              )}
              {uploadError && (
                <p className="text-xs text-danger font-medium">{uploadError}</p>
              )}
            </div>
          )}

          {(!field.type || field.type === "text" || field.type === "password" || field.type === "number" || field.type === "date") && !field.optionsEndpoint && (
            <div className="relative">
              <input
                type={field.type === "password" ? (showPassword ? "text" : "password") : field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                required={required}
                value={(value as string) ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
                className="w-full bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/25 text-text-primary rounded-xl px-4 py-3 text-xs min-h-11 outline-none transition-all"
              />
              {field.type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest uppercase text-text-muted hover:text-primary transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>
          )}
    </div>
  );
}
