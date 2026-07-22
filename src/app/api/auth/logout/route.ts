import { NextRequest } from "next/server";
import { ok } from "@/lib/apiResponse";
import { DEMO_COOKIE } from "@/lib/session";

export async function POST(req: NextRequest) {
  const res = ok(null, "Logged out successfully.");
  // Delete the session cookie in all modes
  res.cookies.delete(DEMO_COOKIE);
  return res;
}
