"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminServiceCategoriesPage() {
  return (
    <AdminDataTable
      title="Service Categories"
      endpoint="/api/service-categories"
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
          placeholder: "e.g. Regulatory Affairs",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. regulatory-affairs",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Provide a brief description of the services grouped under this category...",
        },
        {
          name: "order",
          label: "Display Order",
          type: "number",
          placeholder: "e.g. 1",
        },
      ]}
    />
  );
}
