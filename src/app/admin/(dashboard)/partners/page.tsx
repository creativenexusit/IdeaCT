"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminPartnersPage() {
  return (
    <AdminDataTable
      title="Partners"
      endpoint="/api/partners"
      addLabel="Add Partner"
      columns={[
        { key: "name", label: "Partner Name" },
        { key: "link", label: "Website Link" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "name", label: "Partner Name", required: true, placeholder: "e.g. MedCore Pharmaceuticals" },
        { name: "logo", label: "Partner Logo", type: "file", required: true, uploadFolder: "partners" },
        { name: "link", label: "Website Link", placeholder: "https://partner-website.com" },
        { name: "order", label: "Display Order", type: "number", placeholder: "e.g. 1 (lower shows first)" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Published", "Archived"] },
      ]}
    />
  );
}
