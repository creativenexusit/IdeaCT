"use client";

import { Card } from "@/components/Card";
import { BookOpen, HelpCircle, FileText, Settings, Award, Users, Plus, Upload, Link2 } from "lucide-react";

export default function AdminGuidelinesPage() {
  const sections = [
    {
      title: "Hero Slider",
      icon: BookOpen,
      desc: "Controls the dynamic slides on the homepage hero section.",
      steps: [
        "Provide a compelling Slide Title/Headline.",
        "Upload a high-quality slide image or select from pre-existing assets.",
        "Set the Call-To-Action (CTA) Button Text and target URL link.",
        "Use Display Order to arrange slide sequences (e.g. 1, 2, 3).",
      ],
    },
    {
      title: "Services",
      icon: FileText,
      desc: "Manage the list of pharmaceutical technical consultancy services.",
      steps: [
        "Enter the Service Title. The URL slug will be auto-generated.",
        "Select the appropriate Service Category from the dropdown menu.",
        "Provide a short overview and a comprehensive full description.",
        "Upload a service icon or representative graphic.",
      ],
    },
    {
      title: "Training Programs",
      icon: Users,
      desc: "Create and update cGMP workshops and professional courses.",
      steps: [
        "Specify the course title, duration, trainer, and schedule date.",
        "Upload a thumbnail image for the course card.",
        "Add a syllabus/description and a registration/google form link.",
        "Select the appropriate category from the dropdown select list.",
      ],
    },
    {
      title: "Portfolio",
      icon: Award,
      desc: "Present case studies showing client challenges and successful outcomes.",
      steps: [
        "Input the Case Study Title. The slug is auto-generated.",
        "Upload a portfolio cover image.",
        "Select the linked Client Profile from the dynamic dropdown list.",
        "Describe the client's Challenge, our validation Solution, and the Outcome.",
      ],
    },
    {
      title: "Trainee Certificates",
      icon: Award,
      desc: "Verify and upload completion certificates for workshop participants.",
      steps: [
        "Input the trainee's Full Name and registered Phone Number.",
        "Add the Course Title and upload the certificate file (PDF or Image).",
        "Trainees can search by Name and Phone on the public site to download their certificates.",
      ],
    },
    {
      title: "Downloads",
      icon: Upload,
      desc: "Manage company profiles, brochures, and downloadable documents.",
      steps: [
        "Select a category (e.g. Brochure, Company Profile).",
        "Upload the PDF/Document and specify the file size (e.g. 2.4 MB).",
        "The public download counter updates in real-time.",
      ],
    },
    {
      title: "Website Settings",
      icon: Settings,
      desc: "Configure core organization details, social links, and contact info.",
      steps: [
        "Set company name, address, contact email, phone, and hours.",
        "Provide social media link URLs (empty fields are automatically hidden).",
        "Manage the official Mission, Vision, and Company History text.",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Admin Guideline & Manual
        </h1>
        <p className="text-xs text-text-secondary mt-1">
          This manual provides step-by-step instructions on managing every content module and section of the site.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <Card key={idx} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-10 w-10 rounded-xl bg-primary-tint border border-primary/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                  </span>
                  <div>
                    <h2 className="font-bold text-text-primary text-sm">{section.title}</h2>
                    <p className="text-[11px] text-text-secondary mt-0.5">{section.desc}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {section.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                      <span className="h-5 w-5 rounded-full bg-primary-tint border border-primary/20 text-[10px] font-bold text-primary flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Guide Tips */}
      <Card className="border-secondary/25 bg-secondary/5 p-6">
        <h3 className="font-bold text-text-primary text-sm flex items-center gap-2 mb-3">
          <Link2 className="h-4.5 w-4.5 text-secondary" />
          Important Admin Tips
        </h3>
        <ul className="space-y-2 text-xs text-text-secondary list-disc pl-5 leading-relaxed">
          <li>
            <strong className="text-primary">Auto-Slug Generation:</strong> When creating services, blog categories, or portfolio items, leave the slug field blank. It will auto-populate automatically based on the title/name.
          </li>
          <li>
            <strong className="text-primary">Dropdown References:</strong> Fields referencing categories or profiles will load dynamically. Simply pick from the selector list.
          </li>
          <li>
            <strong className="text-primary">Media Uploads:</strong> Click <span className="text-text-primary">"Choose File"</span> to upload files from your device. A preview will appear immediately upon successful upload.
          </li>
        </ul>
      </Card>
    </div>
  );
}
