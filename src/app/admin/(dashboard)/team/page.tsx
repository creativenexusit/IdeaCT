"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminExpertTeamPage() {
  return (
    <AdminDataTable
      title="Expert Team"
      endpoint="/api/team"
      addLabel="Add Team Member"
      columns={[
        { key: "fullName", label: "Full Name" },
        { key: "designation", label: "Designation" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        {
          name: "employeeId",
          label: "Employee ID",
          required: true,
          placeholder: "e.g. IDC-001",
        },
        {
          name: "fullName",
          label: "Full Name",
          required: true,
          placeholder: "e.g. Dr. Rashid Ahmed",
        },
        {
          name: "profileImage",
          label: "Profile Photo",
          type: "file",
          uploadFolder: "team",
          placeholder: "Upload profile photo...",
        },
        {
          name: "designation",
          label: "Designation",
          placeholder: "e.g. Director of Quality Systems",
        },
        {
          name: "department",
          label: "Department",
          placeholder: "e.g. Quality Assurance",
        },
        {
          name: "qualification",
          label: "Qualification",
          placeholder: "e.g. PhD in Pharmaceutical Sciences",
        },
        {
          name: "experience",
          label: "Years of Experience",
          type: "number",
          placeholder: "e.g. 14",
        },
        {
          name: "biography",
          label: "Biography",
          type: "textarea",
          placeholder: "Write a short profile of the team member...",
        },
        {
          name: "email",
          label: "Email Address",
          placeholder: "e.g. rashid.ahmed@ideact.com",
        },
        {
          name: "phone",
          label: "Phone Number",
          placeholder: "e.g. +880 1711 000002",
        },
        {
          name: "linkedin",
          label: "LinkedIn URL",
          placeholder: "e.g. https://linkedin.com/in/rashid-ahmed",
        },
        {
          name: "officeLocation",
          label: "Office Location",
          placeholder: "e.g. Dhaka (HQ)",
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
