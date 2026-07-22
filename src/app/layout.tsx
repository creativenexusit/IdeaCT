import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import { LeadPopup } from "@/components/LeadPopup";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { getSettings } from "@/lib/content";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ideact.example.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: `${settings.companyName} — Pharmaceutical Consultancy and Training`,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.aboutUs,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      title: settings.companyName,
      description: settings.aboutUs,
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.companyName,
      description: settings.aboutUs,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#f5f7fa] text-[#0c1a3a]">
        <OrganizationJsonLd />
        {!isAdmin && <Header companyName={settings.companyName} />}
        <main className="flex-1">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingContactWidget />}
        {!isAdmin && <LeadPopup />}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
