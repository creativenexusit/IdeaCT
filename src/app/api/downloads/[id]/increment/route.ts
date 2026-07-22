import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Download from "@/models/Download";
import { ok, fail } from "@/lib/apiResponse";
import { dbErrorMessage } from "@/lib/crudFactory";

/**
 * Atomically increments a download's counter via $inc, per Phase 6's
 * acceptance check: "Download counter increments use an atomic update
 * ($inc) to avoid race conditions under concurrent requests." A plain
 * read-modify-write (get count, add 1, save) would lose increments under
 * concurrent hits; $inc is atomic at the database level and doesn't.
 */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await connectDB();
  } catch (err) {
    return fail(dbErrorMessage(err), [], 503);
  }

  const updated = await Download.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    { $inc: { downloadCount: 1 } },
    { new: true }
  );

  if (!updated) return fail("Download not found.", [], 404);
  return ok({ downloadCount: updated.downloadCount });
}
