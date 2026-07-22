"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminFaqsPage() {
  return (
    <AdminDataTable
      title="FAQs"
      endpoint="/api/faqs"
      addLabel="Add FAQ"
      columns={[
        { key: "question", label: "Question" },
      ]}
      fields={[
        {
          name: "question",
          label: "FAQ Question",
          required: true,
          placeholder: "e.g. How long does the CTD dossier compilation phase take?",
        },
        {
          name: "answer",
          label: "FAQ Answer",
          type: "textarea",
          required: true,
          placeholder: "Provide a detailed answer explaining timelines, exceptions, and scoping...",
        },
        {
          name: "service",
          label: "Linked Service Offering",
          optionsEndpoint: "/api/services",
          placeholder: "Select Service (Optional)...",
        },
      ]}
    />
  );
}
