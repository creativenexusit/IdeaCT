import { NextRequest } from "next/server";
import { z } from "zod";
import { compare } from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { ok, fail } from "@/lib/apiResponse";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { logActivity } from "@/services/activityLog";
import { isDemoMode, getDemoSecret, DEMO_COOKIE, DEMO_SESSION_MAX_AGE_SECONDS } from "@/lib/session";
import { signDemoSession } from "@/lib/demoSession";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  // Rate limit login attempts by IP: 10 attempts / 5 minutes.
  const { allowed } = rateLimit(`login:${clientIp(req)}`, { limit: 10, windowMs: 5 * 60 * 1000 });
  if (!allowed) {
    return fail("Too many login attempts. Please try again in a few minutes.", [], 429);
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail("Validation failed.", parsed.error.issues);

  const { email, password } = parsed.data;

  const demoEmail = process.env.DEMO_ADMIN_EMAIL || "admin@ideact.com";
  const demoPassword = process.env.DEMO_ADMIN_PASSWORD || "Demo@12345";

  // Helper to log in using the demo/env credentials
  async function performDemoLogin() {
    if (email !== demoEmail || password !== demoPassword) {
      return fail("Invalid email or password.", [], 401);
    }

    const token = await signDemoSession(
      { email: demoEmail, exp: Date.now() + DEMO_SESSION_MAX_AGE_SECONDS * 1000 },
      getDemoSecret()
    );

    void logActivity({
      actorEmail: demoEmail,
      action: "login",
      description: `${demoEmail} logged in (demo credentials fallback).`,
    });

    const res = ok(
      { user: { email: demoEmail, role: "Super Admin" }, demoMode: true },
      "Logged in successfully."
    );
    res.cookies.set(DEMO_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: DEMO_SESSION_MAX_AGE_SECONDS,
    });
    return res;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Demo Mode Path
  // ───────────────────────────────────────────────────────────────────────────
  if (isDemoMode()) {
    return performDemoLogin();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Production Mode Path (Database verification via Mongoose & Bcrypt)
  // ───────────────────────────────────────────────────────────────────────────
  try {
    await connectDB();

    // Always allow the Super Admin (from .env) to log in, regardless of DB state.
    // This ensures you never get locked out even if you add other users.
    if (email === demoEmail) {
      return performDemoLogin();
    }

    const user = await User.findOne({ email, isDeleted: { $ne: true } }).select("+password");
    if (!user || user.accountStatus !== "Active") {
      return fail("Invalid email or password.", [], 401);
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return fail("Invalid email or password.", [], 401);
    }

    const token = await signDemoSession(
      { email: user.email, exp: Date.now() + DEMO_SESSION_MAX_AGE_SECONDS * 1000 },
      getDemoSecret()
    );

    void logActivity({
      actorEmail: user.email,
      action: "login",
      description: `${user.email} logged in.`,
    });

    const res = ok(
      { user: { email: user.email, role: user.role } },
      "Logged in successfully."
    );
    res.cookies.set(DEMO_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: DEMO_SESSION_MAX_AGE_SECONDS,
    });
    return res;
  } catch (err: any) {
    console.error("[login] Database connection failed or query error:", err.message || err);
    console.warn("[login] Database is unreachable; falling back to demo credentials check.");
    
    // Fallback: If DB is down, unreachable, or DNS fails, allow logging in via env demo credentials.
    return performDemoLogin();
  }
}
