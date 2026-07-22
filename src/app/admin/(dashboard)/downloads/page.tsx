"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminDownloadsPage() {
  return (
    <AdminDataTable
      title="Downloads"
      endpoint="/api/downloads"
      addLabel="Add Download"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "downloadCount", label: "Downloads" },
      ]}
      fields={[
        {
          name: "title",
          label: "Resource Title",
          required: true,
          placeholder: "e.g. IdeaCT Corporate Brochure 2026",
        },
        {
          name: "category",
          label: "Resource Category",
          type: "select",
          options: ["Company Profile", "Brochure", "Catalogue", "Presentation", "Forms", "Other"],
          required: true,
          placeholder: "Select Category...",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Provide a brief description of what this download contains...",
        },
        {
          name: "file",
          label: "File (PDF/Document)",
          type: "file",
          uploadFolder: "downloads",
          required: true,
          placeholder: "Upload PDF file or paste link...",
        },
        {
          name: "fileSize",
          label: "File Size",
          placeholder: "e.g. 2.4 MB",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["Draft", "Published", "Archived"],
          placeholder: "Select status...",
        },
      ]}
    />
  );
}
