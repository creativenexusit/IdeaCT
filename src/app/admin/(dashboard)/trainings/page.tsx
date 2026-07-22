"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminTrainingsPage() {
  return (
    <AdminDataTable
      title="Training"
      endpoint="/api/trainings"
      addLabel="Add Training"
      columns={[
        { key: "title", label: "Title" },
        { key: "trainer", label: "Trainer" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        {
          name: "title",
          label: "Training Title",
          required: true,
          placeholder: "e.g. cGMP Fundamentals & Regulatory Documentation",
        },
        {
          name: "slug",
          label: "Slug (auto-generated)",
          isSlug: true,
          placeholder: "e.g. cgmp-fundamentals-regulatory-documentation",
        },
        {
          name: "thumbnail",
          label: "Training Thumbnail Image",
          type: "file",
          uploadFolder: "training",
          placeholder: "Upload thumbnail photo...",
        },
        {
          name: "category",
          label: "Training Category",
          optionsEndpoint: "/api/training-categories",
          placeholder: "Select Training Category...",
          required: true,
        },
        {
          name: "trainer",
          label: "Trainer Name",
          placeholder: "e.g. Dr. Rashid Ahmed",
        },
        {
          name: "duration",
          label: "Duration",
          placeholder: "e.g. 2 Days (16 Hours)",
        },
        {
          name: "location",
          label: "Location / Mode",
          placeholder: "e.g. Dhaka (On-Site) / Online (Zoom)",
        },
        {
          name: "schedule",
          label: "Schedule Date",
          type: "date",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Write a detailed syllabus or description of the training program...",
        },
        {
          name: "registrationLink",
          label: "Registration Link",
          placeholder: "e.g. https://forms.gle/xyz...",
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
