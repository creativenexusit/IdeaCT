"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminInquiriesPage() {
  const statusOptions = ["New", "Pending", "In Progress", "Replied", "Finished", "Archived"];
  
  return (
    <AdminDataTable
      title="Inquiries"
      endpoint="/api/inquiries"
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "subject", label: "Subject" },
        {
          key: "message",
          label: "Message",
          render: (r) => (
            <div className="max-w-xs max-h-24 overflow-y-auto whitespace-pre-wrap text-xs text-text-secondary pr-2">
              {r.message}
            </div>
          ),
        },
        { key: "inquiryStatus", label: "Status" },
        { key: "createdAt", label: "Received", render: (r) => new Date(r.createdAt).toLocaleDateString() },
        {
          key: "reply",
          label: "Reply",
          render: (r) => (
            <a
              href={`mailto:${r.email}?subject=Re: ${encodeURIComponent(r.subject || "Your Inquiry")}`}
              className="text-primary hover:underline font-bold text-xs"
            >
              Reply via Email
            </a>
          ),
        },
      ]}
      fields={[
        { name: "email", label: "Email Address", type: "text", readonly: true },
        { name: "subject", label: "Subject", type: "text", readonly: true },
        { name: "message", label: "Message", type: "textarea", readonly: true },
        {
          name: "inquiryStatus",
          label: "Status",
          type: "select",
          options: statusOptions,
        },
        { name: "replyMessage", label: "Send Email Reply (Optional)", type: "textarea", placeholder: "Type a message here to instantly email the user when you click Save..." },
        { name: "notes", label: "Internal Notes", type: "textarea" },
      ]}
      filters={[
        { key: "inquiryStatus", label: "Status", options: statusOptions },
      ]}
      addLabel="New (not used — inquiries come from the public site)"
    />
  );
}
