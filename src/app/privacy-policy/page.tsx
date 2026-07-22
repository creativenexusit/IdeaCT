import type { Metadata } from "next";
import connectDB from "@/lib/db";
import StaticPage from "@/models/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "IdeaCT's privacy policy covering how we collect, use, and protect your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

const FALLBACK_TITLE = "Privacy Policy";
const FALLBACK_CONTENT = `Last updated: July 2026

IdeaCT Pharmaceutical Consultancy ("IdeaCT", "we", "us") is committed to protecting your personal data in accordance with applicable data protection legislation. This Privacy Policy explains how we collect, use, store, and disclose information in connection with our website and services.

**1. Information We Collect**
We collect information you voluntarily provide when submitting an inquiry form, registering for a training programme, or corresponding with us. This may include your name, email address, telephone number, job title, and organisation. We also collect standard server log data (IP address, browser type, pages visited) for analytics purposes.

**2. How We Use Your Information**
We use your information to respond to inquiries, deliver contracted consultancy and training services, issue invoices, send programme updates relevant to your engagement, and improve our website and services. We do not sell your personal data to third parties.

**3. Data Retention**
Client engagement data and training records are retained for seven years from project completion to satisfy professional indemnity and statutory requirements. Inquiry data from non-clients is retained for 24 months and then securely deleted.

**4. Third-Party Processors**
We may share your data with trusted third-party processors (email platforms, cloud hosting providers, analytics tools) who process data on our behalf under contractual data processing agreements. All processors are required to maintain equivalent data protection standards.

**5. Your Rights**
You have the right to access, correct, or request deletion of your personal data held by IdeaCT. To exercise these rights, contact our Data Officer at privacy@ideact.com. We will respond within 30 days.

**6. Cookies**
Our website uses essential cookies required for functionality and optional analytics cookies. You may disable analytics cookies through your browser settings without affecting your ability to use the website.

**7. Contact**
For privacy-related enquiries: privacy@ideact.com | House 12, Road 5, Gulshan, Dhaka 1212, Bangladesh`;

export default async function PrivacyPolicyPage() {
  let title = FALLBACK_TITLE;
  let content = FALLBACK_CONTENT;

  try {
    await connectDB();
    const doc = await StaticPage.findOne({ key: "privacy-policy" }).lean() as { title?: string; content?: string } | null;
    if (doc) {
      title = doc.title || FALLBACK_TITLE;
      content = doc.content || FALLBACK_CONTENT;
    }
  } catch {
    // No live DB — fall back to static content above.
  }

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">{title}</h1>
        <div className="mt-8 prose prose-slate prose-sm max-w-none text-text-secondary leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
}
