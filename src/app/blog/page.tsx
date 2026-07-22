import type { Metadata } from "next";
import Link from "next/link";
import { getBlogs } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description: "Insights and articles on pharmaceutical regulatory affairs, quality systems, and compliance.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Publications</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Regulatory Insights & <span className="text-glow-gradient">Field Notes</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            Read critical perspectives, regulatory warnings, and best practices compiled by our principal pharmaceutical QA and regulatory consultants.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post, idx) => (
            <ScrollReveal key={post._id} delay={idx * 100}>
              <Card className="h-full flex flex-col justify-between group overflow-hidden !p-0">
                {post.thumbnail && (
                  <div className="aspect-video w-full border-b border-border overflow-hidden">
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span className="px-2 py-0.5 rounded bg-surface-sunken border border-border text-[10px] uppercase font-bold text-primary">
                      {post.category?.name || "Uncategorized"}
                    </span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-bold text-text-primary text-lg mt-4 group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs">
                  <span className="text-text-muted font-semibold">Views: {post.views}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
