"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminTraineeCertificatesPage() {
  return (
    <AdminDataTable
      title="Trainee Certificates"
      endpoint="/api/trainee-certificates"
      addLabel="Add Trainee Certificate"
      columns={[
        { key: "recipientName", label: "Trainee Name" },
        { key: "recipientPhone", label: "Phone Number" },
        { key: "courseTitle", label: "Course / Workshop" },
        { key: "certificateNumber", label: "Certificate #" },
      ]}
      fields={[
        {
          name: "recipientName",
          label: "Trainee Full Name",
          required: true,
          placeholder: "e.g. Tanvir Rahman",
        },
        {
          name: "recipientPhone",
          label: "Trainee Phone Number",
          required: true,
          placeholder: "e.g. 01711223344",
        },
        {
          name: "courseTitle",
          label: "Course / Workshop Title",
          required: true,
          placeholder: "e.g. cGMP Fundamentals & Documentation Workshop",
        },
        {
          name: "issueDate",
          label: "Issue Date",
          type: "date",
          required: true,
        },
        {
          name: "certificateUrl",
          label: "Certificate File (PDF / Image)",
          type: "file",
          uploadFolder: "trainee-certificates",
          required: true,
          placeholder: "Upload training certificate...",
        },
        {
          name: "certificateNumber",
          label: "Certificate Registration Number",
          placeholder: "e.g. IDACT-2026-0001",
        },
      ]}
    />
  );
}
