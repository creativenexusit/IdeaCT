import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS only makes sense once the site is actually served over HTTPS
  // (real domain + Let's Encrypt cert) — safe to ship since it only takes
  // effect when the browser already received the response over HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    // Without this, next/image throws at runtime for any Cloudinary-hosted
    // picture (hero slides, partner logos, testimonial/team photos, blog
    // featured images, etc.) — "hostname not configured". This was
    // silently working only because demo/mock data never used a real
    // Cloudinary URL; any real upload would have crashed the page.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
