"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminHeroSlidesPage() {
  return (
    <AdminDataTable
      title="Hero Slider Slides"
      endpoint="/api/hero-slides"
      addLabel="Add Hero Slide"
      columns={[
        { key: "title", label: "Title" },
        { key: "displayOrder", label: "Display Order" },
      ]}
      fields={[
        {
          name: "title",
          label: "Slide Title / Headline",
          required: true,
          placeholder: "e.g. CTD/eCTD Dossier Preparation & Submission",
        },
        {
          name: "imageUrl",
          label: "Slide Image",
          type: "file",
          uploadFolder: "hero",
          required: true,
          placeholder: "Upload slide background image...",
        },
        {
          name: "buttonText",
          label: "CTA Button Text",
          required: true,
          placeholder: "e.g. Explore Regulatory Services",
        },
        {
          name: "buttonLink",
          label: "CTA Button Link URL",
          required: true,
          placeholder: "e.g. /services/regulatory-submission-compliance",
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
