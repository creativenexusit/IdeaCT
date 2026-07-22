"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminLeadershipPage() {
  return (
    <AdminDataTable
      title="Leadership"
      endpoint="/api/leadership"
      addLabel="Add Leadership Profile"
      columns={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
      ]}
      fields={[
        {
          name: "name",
          label: "Name",
          required: true,
          placeholder: "e.g. Ayesha Rahman",
        },
        {
          name: "designation",
          label: "Designation",
          placeholder: "e.g. Founder & Principal Consultant",
        },
        {
          name: "photo",
          label: "Profile Photo",
          type: "file",
          uploadFolder: "leadership",
          placeholder: "Upload photo or paste URL...",
        },
        {
          name: "biography",
          label: "Biography",
          type: "textarea",
          placeholder: "Write a short biography detailing their industrial experience...",
        },
        {
          name: "linkedin",
          label: "LinkedIn URL",
          placeholder: "e.g. https://linkedin.com/in/ayesha-rahman",
        },
        {
          name: "displayOrder",
          label: "Display Order",
          type: "number",
          placeholder: "e.g. 1",
        },
      ]}
    />
  );
}
