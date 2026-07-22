"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminClientsPage() {
  return (
    <AdminDataTable
      title="Clients"
      endpoint="/api/clients"
      addLabel="Add Client"
      enableBulkEmail
      columns={[
        { key: "companyName", label: "Company Name" },
        { key: "contactEmail", label: "Contact Email" },
        { key: "industry", label: "Industry" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "companyName", label: "Company Name", required: true },
        { name: "slug", label: "Slug (auto-generated)", isSlug: true },
        {
          name: "logo",
          label: "Company Logo",
          type: "file",
          uploadFolder: "clients",
        },
        { name: "industry", label: "Industry Sector" },
        { name: "country", label: "Country" },
        { name: "website", label: "Website URL" },
        { name: "contactEmail", label: "Contact Email (for bulk emails)", placeholder: "e.g. procurement@client.com" },
        { name: "overview", label: "Engagement Overview", type: "textarea" },
        { name: "featured", label: "Featured Client", type: "checkbox" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Published", "Archived"] },
      ]}
    />
  );
}
