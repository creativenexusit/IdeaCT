"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminBlogPage() {
  return (
    <AdminDataTable
      title="Blog"
      endpoint="/api/blogs"
      addLabel="Add Blog Post"
      columns={[
        { key: "title", label: "Title" },
        { key: "views", label: "Views" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        {
          name: "title",
          label: "Blog Title",
          required: true,
          placeholder: "e.g. Critical Deficiencies in eCTD Submissions",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. critical-deficiencies-ectd-submissions",
        },
        {
          name: "thumbnail",
          label: "Thumbnail Image",
          type: "file",
          uploadFolder: "blog",
          placeholder: "Upload blog post banner photo...",
        },
        {
          name: "category",
          label: "Blog Category",
          optionsEndpoint: "/api/blog-categories",
          placeholder: "Select Blog Category...",
          required: true,
        },
        {
          name: "content",
          label: "Content",
          type: "richtext",
          required: true,
        },
        {
          name: "tags",
          label: "Tags",
          placeholder: "e.g. GMP, FDA, Regulatory (comma-separated)",
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
