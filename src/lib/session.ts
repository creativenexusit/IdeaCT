import { NextRequest } from "next/server";
import { verifyDemoSession } from "./demoSession";
import connectDB from "./db";
import User from "../models/User";

export type SessionUser = { id: string; email: string; role: "Super Admin" | "Manager" };

export const DEMO_COOKIE = "ideact_session"; // Updated to a general session cookie name
export const DEMO_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Demo mode activates automatically whenever there's no live database
 * configured.
 */
export function isDemoMode(): boolean {
  return !process.env.DATABASE_URL || process.env.FORCE_DEMO === "true";
}

export function getDemoSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    "ideact-demo-insecure-default-secret-change-me"
  );
}

/**
 * Resolves the current signed-in user, transparently switching between
 * demo mode (signed cookie, checked against env credentials) and real
 * database-backed session (signed cookie, verified against User collection).
 */
export async function getCurrentUser(req: NextRequest): Promise<SessionUser | null> {
  const token = req.cookies.get(DEMO_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifyDemoSession(token, getDemoSecret());
  if (!payload || typeof payload.email !== "string") return null;

  if (isDemoMode()) {
    return { id: "demo-admin", email: payload.email, role: "Super Admin" };
  }

  // Production path: verify the user actually exists in the MongoDB database
  try {
    await connectDB();

    // Always allow the Super Admin (from .env) to bypass DB checks.
    // This ensures you never get locked out even if you add other users.
    const demoEmail = process.env.DEMO_ADMIN_EMAIL || "admin@ideact.com";
    if (payload.email === demoEmail) {
      return { id: "demo-admin", email: demoEmail, role: "Super Admin" };
    }

    const user = await User.findOne({ email: payload.email, isDeleted: { $ne: true } }).lean();
    if (!user || user.accountStatus !== "Active") return null;
    return {
      id: String(user._id),
      email: user.email,
      role: (user.role as "Super Admin" | "Manager") || "Manager",
    };
  } catch (err) {
    console.error("[session] DB session check failed:", err);

    // Fallback: If DB is down or unreachable, allow using the demo credentials session.
    const demoEmail = process.env.DEMO_ADMIN_EMAIL || "admin@ideact.com";
    if (payload.email === demoEmail) {
      console.warn("[session] Database is unreachable; falling back to demo admin user session.");
      return { id: "demo-admin", email: demoEmail, role: "Super Admin" };
    }
    return null;
  }
}
