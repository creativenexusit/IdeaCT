"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminGalleryPage() {
  return (
    <AdminDataTable
      title="Gallery"
      endpoint="/api/gallery"
      addLabel="Add Gallery Item"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        {
          name: "images",
          label: "Image",
          type: "file",
          uploadFolder: "gallery",
          required: true,
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: ["Office", "Events", "Training", "Projects", "Facilities"],
          required: true,
        },
        { name: "description", label: "Description", type: "textarea" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Published", "Archived"] },
      ]}
    />
  );
}
