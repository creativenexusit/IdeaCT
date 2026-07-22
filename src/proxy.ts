import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

// Super-Admin-only areas within /admin.
const SUPER_ADMIN_ONLY = ["/admin/users", "/admin/settings", "/admin/lead-widgets", "/admin/activity-log", "/admin/static-pages"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Inject x-pathname header on ALL requests so RootLayout can detect /admin
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Only apply auth guard to /admin routes (excluding /admin/login)
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return response;
  }

  const user = await getCurrentUser(req);

  if (!user) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isSuperAdminArea = SUPER_ADMIN_ONLY.some((p) => pathname.startsWith(p));
  if (isSuperAdminArea && user.role !== "Super Admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return response;
}

export const config = {
  // Run on all pages (to inject x-pathname) — static assets excluded automatically
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
