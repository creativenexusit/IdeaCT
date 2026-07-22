import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";
import { ok, fail } from "@/lib/apiResponse";
import { requireRole } from "@/middleware/authz";
import { dbErrorMessage } from "@/lib/crudFactory";

export async function GET(req: NextRequest) {
  const auth = await requireRole(req, ["Super Admin"]);
  if (!auth.ok) return fail(auth.message, [], auth.status);

  try {
    await connectDB();
  } catch (err) {
    return fail(dbErrorMessage(err), [], 503);
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 20));

  const [items, total] = await Promise.all([
    ActivityLog.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    ActivityLog.countDocuments({}),
  ]);

  return ok({ items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
}
