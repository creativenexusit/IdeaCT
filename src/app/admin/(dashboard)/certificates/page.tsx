"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminCertificatesPage() {
  return (
    <AdminDataTable
      title="Certificates"
      endpoint="/api/certificates"
      addLabel="Add Certificate"
      columns={[
        { key: "title", label: "Title" },
        { key: "issuedBy", label: "Issued By" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "title", label: "Certificate Title", required: true },
        {
          name: "certificateImage",
          label: "Certificate Image / Scan",
          type: "file",
          uploadFolder: "certificates",
        },
        {
          name: "pdf",
          label: "Certificate PDF",
          type: "file",
          uploadFolder: "certificates",
        },
        { name: "issuedBy", label: "Issuing Authority" },
        { name: "issueDate", label: "Issue Date", type: "date" },
        { name: "expiryDate", label: "Expiry Date", type: "date" },
        { name: "certificateNumber", label: "Certificate Number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "status", label: "Status", type: "select", options: ["Draft", "Published", "Archived"] },
      ]}
    />
  );
}
