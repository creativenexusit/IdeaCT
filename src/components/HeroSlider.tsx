"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Slide = {
  _id: string;
  title: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
};

const DEFAULT_SLIDES: Slide[] = [
  {
    _id: "default-1",
    title: "CTD/eCTD Dossier Preparation & Submission",
    imageUrl: "/regulatory_dossiers.png",
    buttonText: "Explore Regulatory Services",
    buttonLink: "/services/regulatory-submission-compliance",
  },
  {
    _id: "default-2",
    title: "cGMP Quality Audits & Compliance Remediation",
    imageUrl: "/pharma_lab_consulting.png",
    buttonText: "View QA Services",
    buttonLink: "/services/quality-management-system-audits",
  },
  {
    _id: "default-3",
    title: "cGMP & Regulatory Training Workshops",
    imageUrl: "/professional_training.png",
    buttonText: "Browse Programs",
    buttonLink: "/training",
  },
];

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/hero-slides");
        const json = await res.json();
        if (json.success && json.data?.items?.length > 0) {
          setSlides(json.data.items);
        }
      } catch (err) {
        console.error("Failed to load hero slides from API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 300);
    },
    [animating]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo, slides.length]);

  // Auto-play every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (loading && slides === DEFAULT_SLIDES) {
    return (
      <div className="relative w-full rounded-2xl border border-slate-800/60 bg-slate-950 flex items-center justify-center" style={{ minHeight: "340px" }}>
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const slide = slides[current] || DEFAULT_SLIDES[0];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950 shadow-2xl">
      {/* Slide Wrapper */}
      <div className={`transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>

        {/* ── Mobile Layout (stacked: image on top, text below) ── */}
        <div className="lg:hidden">
          {/* Image — full width, fixed height */}
          <div className="relative w-full h-52 sm:h-64">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Bottom gradient fade into the dark card below */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          </div>
          {/* Text content */}
          <div className="px-5 pt-3 pb-8 space-y-4 text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 leading-snug tracking-tight">
              {slide.title}
            </h2>
            <Link
              href={slide.buttonLink}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>

        {/* ── Desktop Layout (side-by-side) ── */}
        <div className="hidden lg:grid lg:grid-cols-2 items-center min-h-[400px]">
          {/* Left Text Column */}
          <div className="relative p-10 xl:p-14 z-10 space-y-6 text-left">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-slate-100 leading-tight tracking-tight">
              {slide.title}
            </h2>
            <Link
              href={slide.buttonLink}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              {slide.buttonText}
            </Link>
          </div>
          {/* Right Image Column */}
          <div className="relative h-full min-h-[400px] overflow-hidden border-l border-slate-800/60">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/10 to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Navigation Arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 bottom-5 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 h-8 w-8 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all backdrop-blur-sm z-10"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 bottom-5 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 h-8 w-8 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all backdrop-blur-sm z-10"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>

      {/* ── Dot Indicators ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 lg:left-auto lg:translate-x-0 lg:bottom-4 lg:left-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-secondary"
                : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
