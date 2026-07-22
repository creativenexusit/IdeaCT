import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/content";
import { Card } from "@/components/Card";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from IdeaCT's offices, training events, and consulting projects.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="eyebrow">Visual Record</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
            Office & <span className="text-glow-gradient">Training Gallery</span>
          </h1>
          <p className="text-text-secondary mt-4 text-base max-w-2xl">
            Images from our consulting engagements, cGMP workshop sessions, and corporate events.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <ScrollReveal key={item._id} delay={idx * 75}>
              <Card className="p-0 overflow-hidden group cursor-pointer">
                <div className="aspect-square bg-surface-sunken border-b border-border flex flex-col items-center justify-center relative overflow-hidden group-hover:border-primary/30 transition-colors">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ImageIcon className="h-10 w-10 text-text-muted group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    </>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted mt-0.5">{item.category}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
