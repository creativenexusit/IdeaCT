import { NextRequest } from "next/server";
import { ok, fail } from "@/lib/apiResponse";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user) return fail("No active session.", [], 401);
  return ok({ user });
}
