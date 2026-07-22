"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminPortfolioPage() {
  return (
    <AdminDataTable
      title="Portfolio"
      endpoint="/api/portfolio"
      addLabel="Add Portfolio Item"
      columns={[
        { key: "title", label: "Title" },
        { key: "industry", label: "Industry" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        {
          name: "title",
          label: "Case Study Title",
          required: true,
          placeholder: "e.g. WHO Prequalification Validation & QMS Audit",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. who-prequalification-validation",
        },
        {
          name: "coverImage",
          label: "Cover Image",
          type: "file",
          uploadFolder: "portfolio",
          placeholder: "Upload case study cover photo...",
        },
        {
          name: "client",
          label: "Linked Client Profile",
          optionsEndpoint: "/api/clients",
          placeholder: "Select Client...",
          required: true,
        },
        {
          name: "industry",
          label: "Industry Sector",
          placeholder: "e.g. Sterile Formulations, Active Ingredients",
        },
        {
          name: "challenge",
          label: "The Challenge",
          type: "textarea",
          placeholder: "What technical or compliance challenge did the client face?...",
        },
        {
          name: "solution",
          label: "Our Solution",
          type: "textarea",
          placeholder: "What specific steps and validation methods did IdeaCT execute?...",
        },
        {
          name: "outcome",
          label: "Outcome / Results",
          type: "textarea",
          placeholder: "What were the results (e.g. 100% audit pass, WHO approval)?...",
        },
        {
          name: "featured",
          label: "Featured on Homepage",
          type: "checkbox",
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
