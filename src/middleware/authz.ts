import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";

type AuthResult =
  | { ok: true; user: { id: string; role: "Super Admin" | "Manager"; email: string } }
  | { ok: false; message: string; status: number };

/**
 * Resolves the current session (demo mode or real Better Auth, via the
 * unified session resolver) and checks the caller's role against an
 * allow-list. Used inside route handlers for endpoints that need
 * finer-grained checks than the blanket /admin/* proxy provides.
 */
export async function requireRole(
  req: NextRequest,
  allowedRoles: Array<"Super Admin" | "Manager">
): Promise<AuthResult> {
  const user = await getCurrentUser(req);

  if (!user) {
    return { ok: false, message: "Authentication required.", status: 401 };
  }

  if (!allowedRoles.includes(user.role)) {
    return { ok: false, message: "You do not have permission to perform this action.", status: 403 };
  }

  return { ok: true, user };
}
