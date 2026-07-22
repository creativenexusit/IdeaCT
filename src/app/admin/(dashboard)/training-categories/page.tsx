"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminTrainingCategoriesPage() {
  return (
    <AdminDataTable
      title="Training Categories"
      endpoint="/api/training-categories"
      addLabel="Add Category"
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
      ]}
      fields={[
        {
          name: "name",
          label: "Category Name",
          required: true,
          placeholder: "e.g. GMP Compliance Auditing",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. gmp-compliance-auditing",
        },
      ]}
    />
  );
}
