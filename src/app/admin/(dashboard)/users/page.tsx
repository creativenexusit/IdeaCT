"use client";

import { AdminDataTable } from "@/components/admin/AdminDataTable";

export default function AdminUsersPage() {
  return (
    <AdminDataTable
      title="Users"
      endpoint="/api/users"
      addLabel="Add User"
      columns={[
        { key: "fullName", label: "Full Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "accountStatus", label: "Account Status" },
      ]}
      fields={[
        { name: "fullName", label: "Full Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "password", label: "Password", type: "password", required: true },
        { name: "phone", label: "Phone" },
        { name: "role", label: "Role", type: "select", options: ["Super Admin", "Manager"], required: true },
        { name: "accountStatus", label: "Account Status", type: "select", options: ["Active", "Inactive"] },
      ]}
    />
  );
}
