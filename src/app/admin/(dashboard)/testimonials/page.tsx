"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminTestimonialsPage() {
  return (
    <AdminDataTable
      title="Testimonials"
      endpoint="/api/testimonials"
      addLabel="Add Testimonial"
      columns={[
        { key: "clientName", label: "Client Name" },
        { key: "company", label: "Company" },
        { key: "rating", label: "Rating" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "clientName", label: "Client Name", required: true, placeholder: "e.g. Farhana Ahmed" },
        { name: "designation", label: "Designation", placeholder: "e.g. Head of Regulatory Affairs" },
        { name: "company", label: "Company", placeholder: "e.g. MedCore Pharmaceuticals Ltd." },
        { name: "photo", label: "Client Photo", type: "file", uploadFolder: "testimonials" },
        {
          name: "rating",
          label: "Rating (1–5)",
          type: "select",
          options: ["1", "2", "3", "4", "5"],
          placeholder: "Select rating...",
        },
        { name: "quote", label: "Testimonial Quote", type: "textarea", required: true, placeholder: "What did the client say about working with us?" },
        { name: "featured", label: "Feature on Homepage", type: "checkbox" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Published", "Archived"] },
      ]}
    />
  );
}
