"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminServicesPage() {
  return (
    <AdminDataTable
      title="Services"
      endpoint="/api/services"
      addLabel="Add Service"
      columns={[
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "createdAt", label: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      fields={[
        {
          name: "title",
          label: "Service Title",
          required: true,
          placeholder: "e.g. Regulatory Submission & Dossier Management",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. regulatory-submission-dossier-management",
        },
        {
          name: "category",
          label: "Service Category",
          optionsEndpoint: "/api/service-categories",
          placeholder: "Select Service Category...",
          required: true,
        },
        {
          name: "shortDescription",
          label: "Short Description",
          type: "textarea",
          placeholder: "Write a brief 1-2 sentence overview of this service...",
        },
        {
          name: "description",
          label: "Full Description",
          type: "textarea",
          placeholder: "Provide a detailed explanation of the service and deliverables...",
        },
        {
          name: "thumbnail",
          label: "Service Icon / Graphic",
          type: "file",
          uploadFolder: "services",
          placeholder: "Upload an image or paste a URL...",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["Draft", "Published", "Archived"],
          placeholder: "Select publishing status...",
        },
      ]}
    />
  );
}
