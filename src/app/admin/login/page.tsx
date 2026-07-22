"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    // try {
    //   const res = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: form.get("email"),
    //       password: form.get("password"),
    //     }),
    //   });
    //   const data = await res.json();
    //   if (!data.success) {
    //     setError(data.message || "Invalid email or password.");
    //     setLoading(false);
    //     return;
    //   }
    //   router.push("/admin");
    // } catch {
    //   setError("Could not reach the server.");
    //   setLoading(false);
    // }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });

      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Response:", data);

      if (!data.success) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      console.log("Redirecting to /admin...");

      window.location.href = "/admin";
    } catch (err) {
      console.error(err);
      setError("Could not reach the server.");
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(19,84,146,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center">
            <img src="/logo.png" alt="IdeaCT Logo" className="h-16 w-auto object-contain drop-shadow-md" />
          </div>
          <p className="text-text-secondary text-sm mt-3">Sign in to manage your website</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@ideact.com"
                className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 text-text-primary placeholder-text-muted rounded-xl px-4 py-3 text-sm min-h-11 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/40 text-text-primary placeholder-text-muted rounded-xl px-4 py-3 text-sm min-h-11 outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest uppercase text-text-muted hover:text-primary transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(19,84,146,0.3)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Authenticating..." : "Sign In to Admin Panel"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-xs text-text-muted text-center mb-3">Demo credentials</p>
            <div className="rounded-lg border border-border bg-surface-sunken px-4 py-3 text-xs text-text-secondary space-y-1 font-mono">
              <div className="flex justify-between"><span className="text-text-muted">Email:</span><span className="text-primary">admin@ideact.com</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Password:</span><span className="text-primary">Demo@12345</span></div>
            </div>
          </div>
        </div>

        <p className="text-xs text-text-muted text-center mt-6">
          No public registration. Contact a Super Admin for access.
        </p>
      </div>
    </div>
  );
}
