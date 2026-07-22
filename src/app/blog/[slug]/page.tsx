import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { getBlogs } from "@/lib/content";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const safeContent = DOMPurify.sanitize(post.content);

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-8 group">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to insights
        </Link>

        <div>
          <span className="px-2.5 py-1 rounded bg-surface-sunken border border-border text-[10px] uppercase font-bold text-primary">
            {post.category.name}
          </span>
          <p className="text-xs text-text-muted mt-4">Published on {new Date(post.createdAt).toLocaleDateString()} · Views: {post.views}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-3 leading-tight tracking-tight">
            {post.title}
          </h1>
        </div>

        {post.thumbnail ? (
          <div className="aspect-video rounded-2xl border border-border my-8 flex items-center justify-center relative overflow-hidden">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-video rounded-2xl bg-gradient-teal-blue/10 border border-border my-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,84,146,0.1)_0%,transparent_70%)] animate-pulse-glow" />
            <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Pharmaceutical Insight Summary</span>
          </div>
        )}

        <div
          className="text-text-secondary leading-relaxed prose prose-slate prose-sm max-w-none text-base space-y-4"
          style={{ maxWidth: "72ch" }}
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />

        <div className="mt-10 pt-6 border-t border-border flex gap-2 flex-wrap">
          {(post.tags as string[]).map((tag: string) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-lg bg-surface-sunken border border-border text-text-secondary">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
