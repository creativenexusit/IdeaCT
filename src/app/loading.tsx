import Image from "next/image";

/**
 * Global route-loading UI. Next.js automatically wraps page content in a
 * <Suspense> boundary using this file, so it appears while a page (and its
 * server data fetches) are still loading — including the very first paint.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-[#f5f7fa]">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-20 w-20 rounded-full bg-gradient-teal-blue opacity-20 animate-ping" />
        <Image
          src="/logo-mark.png"
          alt="Loading"
          width={64}
          height={64}
          priority
          className="relative h-16 w-16 object-contain animate-pulse"
        />
      </div>
      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">
        Loading&hellip;
      </p>
    </div>
  );
}
