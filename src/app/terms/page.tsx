import type { Metadata } from "next";
import connectDB from "@/lib/db";
import StaticPage from "@/models/StaticPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "IdeaCT's terms of service and general conditions for consultancy and training engagements.",
  alternates: { canonical: "/terms" },
};

const FALLBACK_TITLE = "Terms and Conditions";
const FALLBACK_CONTENT = `Last updated: July 2026

These terms and conditions govern the use of IdeaCT's consultancy and professional training services. By engaging our services, you agree to the following terms.

**1. Scope of Services**
IdeaCT provides pharmaceutical regulatory consultancy, quality management advisory, manufacturing process optimisation, market access strategy, and professional training services. The specific scope, deliverables, and timelines for each engagement are defined in a mutually agreed Statement of Work (SoW) or service agreement.

**2. Confidentiality**
All proprietary information, technical data, regulatory dossiers, and business intelligence shared by the client in connection with a consultancy engagement are treated as strictly confidential and will not be disclosed to any third party without prior written consent, except as required by law or regulatory authority.

**3. Intellectual Property**
All methodologies, frameworks, and proprietary tools developed by IdeaCT prior to or independently of a client engagement remain the exclusive intellectual property of IdeaCT. Client-specific deliverables produced during an engagement are assigned to the client upon receipt of full payment.

**4. Limitation of Liability**
IdeaCT provides advisory services based on current regulatory guidance and professional judgement. Regulatory outcomes cannot be guaranteed, as final decisions rest with the relevant health authority. IdeaCT's aggregate liability for any single engagement shall not exceed the fees paid for that engagement.

**5. Governing Law**
These terms are governed by the laws of the People's Republic of Bangladesh. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.

For the full legal terms and conditions applicable to your engagement, please contact info@ideact.com.`;

export default async function TermsPage() {
  let title = FALLBACK_TITLE;
  let content = FALLBACK_CONTENT;

  try {
    await connectDB();
    const doc = await StaticPage.findOne({ key: "terms" }).lean() as { title?: string; content?: string } | null;
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
