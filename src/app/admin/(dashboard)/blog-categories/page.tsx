"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminBlogCategoriesPage() {
  return (
    <AdminDataTable
      title="Blog Categories"
      endpoint="/api/blog-categories"
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
          placeholder: "e.g. Quality & GMP",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. quality-gmp",
        },
      ]}
    />
  );
}
