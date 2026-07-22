import Link from "next/link";
import Image from "next/image";
import { Link2 } from "lucide-react";
import { mockSettings as settings } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  const socialEntries = Object.entries(settings.socialLinks).filter(([, url]) => url);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label={settings.companyName}>
            <Image src="/logo.png" alt={`${settings.companyName} logo`} width={140} height={40} className="h-10 w-auto object-contain" />
          </Link>
          <p className="text-sm text-slate-500">Pharmaceutical Consultancy & Professional Training. We keep manufacturers, distributors, and healthcare institutions compliant and market-ready.</p>
          {socialEntries.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-primary text-xs capitalize transition-colors"
                >
                  <Link2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {key}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="font-semibold text-slate-700 mb-4 uppercase tracking-wider text-xs">Solutions</p>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><Link href="/services" className="hover:text-primary transition-colors">Consultancy Services</Link></li>
            <li><Link href="/training" className="hover:text-primary transition-colors">Professional Training</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Case Studies</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-700 mb-4 uppercase tracking-wider text-xs">Company</p>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/team" className="hover:text-primary transition-colors">Our Expert Team</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Insights & Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-700 mb-4 uppercase tracking-wider text-xs">Contact</p>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="break-all">{settings.email}</li>
            <li>{settings.phone}</li>
            <li className="leading-relaxed">{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        © {year} {settings.companyName}. All rights reserved. · <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link> · <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
      </div>
    </footer>
  );
}
