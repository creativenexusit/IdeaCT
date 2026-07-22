import { MetadataRoute } from "next";
import { getServices, getTrainings, getBlogs, getPortfolio } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ideact.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, trainings, blogs, portfolio] = await Promise.all([
    getServices(), getTrainings(), getBlogs(), getPortfolio(),
  ]);

  const staticPaths = [
    "",
    "/about",
    "/services",
    "/training",
    "/clients",
    "/portfolio",
    "/team",
    "/certificates",
    "/downloads",
    "/blog",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const dynamicPaths = [
    ...services.map((s: any) => `/services/${s.slug}`),
    ...trainings.map((t: any) => `/training/${t.slug}`),
    ...blogs.map((b: any) => `/blog/${b.slug}`),
    ...portfolio.map((p: any) => `/portfolio/${p.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  return allPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
