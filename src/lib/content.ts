import connectDB from "./db";
import Service from "../models/Service";
import ServiceCategory from "../models/ServiceCategory";
import Training from "../models/Training";
import TrainingCategory from "../models/TrainingCategory";
import Client from "../models/Client";
import Portfolio from "../models/Portfolio";
import ExpertTeam from "../models/ExpertTeam";
import Leadership from "../models/Leadership";
import Blog from "../models/Blog";
import BlogCategory from "../models/BlogCategory";
import Gallery from "../models/Gallery";
import Certificate from "../models/Certificate";
import Download from "../models/Download";
import Faq from "../models/Faq";
import WebsiteSettings from "../models/WebsiteSettings";
import TraineeCertificate from "../models/TraineeCertificate";
import HeroSlide from "../models/HeroSlide";
import Testimonial from "../models/Testimonial";
import Partner from "../models/Partner";

export type Locale = "en";

// ─── Mock Data Fallbacks ───────────────────────────────────────────────────

export const mockSettings = {
  companyName: "IdeaCT",
  tagline: "Precision Pharmaceutical Consultancy",
  logo: "/logo.svg",
  email: "info@ideact.com",
  phone: "+880 1234 567890",
  address: "House 12, Road 5, Gulshan, Dhaka 1212, Bangladesh",
  businessHours: "Sunday – Thursday, 9:00 AM – 6:00 PM (GMT+6)",
  socialLinks: {
    facebook: "https://facebook.com/ideact",
    linkedin: "https://linkedin.com/company/ideact",
    youtube: "",
    twitter: "",
    instagram: "",
  },
  aboutUs:
    "IdeaCT is a specialist pharmaceutical consultancy and professional training organisation with over 15 years of hands-on experience serving manufacturers, distributors, and healthcare institutions across South Asia and beyond. We combine deep regulatory expertise with practical operational insight to help clients accelerate approvals, pass inspections, and build lasting quality cultures.",
  mission:
    "To elevate pharmaceutical standards across the region by delivering rigorous, evidence-based consultancy and world-class professional training that measurably reduces risk and improves patient outcomes.",
  vision:
    "To be the most trusted pharmaceutical regulatory and quality partner for emerging-market manufacturers seeking to compete at a global standard.",
  companyHistory:
    "Founded in 2010 by Ayesha Rahman following an 18-year career spanning the DGDA, WHO procurement programmes, and multinational pharmaceutical organisations, IdeaCT was established to bridge the persistent gap between regulatory complexity and operational readiness in the South Asian pharmaceutical sector. Over the past 15 years, we have supported more than 180 client engagements, trained over 4,000 industry professionals, and built a multidisciplinary team of 22 specialist consultants.",
  defaultLocale: "en" as Locale,
  supportedLocales: ["en"] as Locale[],
};

export const mockServiceCategories = [
  { _id: "cat-1", name: "Regulatory Affairs", slug: "regulatory-affairs" },
  { _id: "cat-2", name: "Quality Assurance", slug: "quality-assurance" },
  { _id: "cat-3", name: "Manufacturing Consultancy", slug: "manufacturing-consultancy" },
  { _id: "cat-4", name: "Market Access", slug: "market-access" },
];

export const mockServices = [
  {
    _id: "svc-1",
    title: "Regulatory Submission & Dossier Management",
    slug: "regulatory-submission-compliance",
    category: mockServiceCategories[0],
    shortDescription:
      "End-to-end CTD/eCTD dossier preparation, health authority liaison, and post-approval lifecycle management for new drug registrations and line extensions.",
    description:
      "Navigating the regulatory submission landscape demands both scientific rigour and process discipline. Our Regulatory Submission & Dossier Management service covers the full approval lifecycle — from pre-submission gap analysis through health authority queries to final registration certificate. We bring deep familiarity with DGDA, TGA, CDSCO, SFDA, and WHO pre-qualification pathways, enabling us to prepare technically robust Common Technical Document (CTD) and eCTD packages that minimise deficiency rounds. Our team manages all correspondence with regulatory agencies, prepares responses to reviewers' queries, coordinates expert opinions, and handles post-approval variations, renewals, and labelling updates so your internal teams can remain focused on pipeline development.",
    features: [
      "Module 1–5 CTD / eCTD dossier compilation and quality review",
      "Pre-submission meeting preparation and health authority liaison",
      "Bioequivalence study design advisory and clinical data review",
      "Deficiency letter response and re-submission management",
      "Post-approval variations: Type IA, IB, and II change notifications",
      "Annual product review (APR) and renewal management",
      "Orphan drug and accelerated pathway advisory",
      "Multi-country parallel submission programme management",
    ],
    benefits: [
      "Shorter approval timelines through first-cycle quality dossiers",
      "Reduced regulatory query cycles by up to 60%",
      "Full end-to-end audit trail and document version control",
      "Predictable project budgeting via fixed-fee milestone structure",
      "Access to 15+ years of authority relationship intelligence",
      "Scalable resource model — no need to expand in-house headcount",
    ],
    process: [
      "Regulatory strategy session & market-specific pathway selection",
      "Pre-submission gap assessment against target authority requirements",
      "Source data collection, review, and scientific narrative writing",
      "CTD/eCTD package compilation, QC review, and publisher formatting",
      "Formal submission and receipt acknowledgement management",
      "Query tracking, expert opinion coordination, and response filing",
      "Approval certificate receipt, post-approval planning handover",
    ],
    status: "Published",
  },
  {
    _id: "svc-2",
    title: "Quality Management System Audits & Remediation",
    slug: "quality-management-system-audits",
    category: mockServiceCategories[1],
    shortDescription:
      "Independent GMP and ISO-aligned QMS audits, mock regulatory inspections, and prioritised CAPA-driven remediation roadmaps for manufacturing and distribution sites.",
    description:
      "Regulatory inspections from national and international authorities have become progressively more rigorous, with data integrity and CAPA system effectiveness receiving particular scrutiny. Our QMS Audit & Remediation service provides an objective, third-party assessment of your quality management system against current GMP expectations — including WHO TRS guidelines, EU GMP Annex requirements, and FDA 21 CFR Part 211 standards. We conduct structured facility audits, sample-based document reviews, and process walkthroughs, then deliver a prioritised findings report with concrete, time-bound remediation tasks. Where required, we provide hands-on implementation support including SOP rewriting, training delivery, and follow-up audits to verify closure effectiveness.",
    features: [
      "Comprehensive site audit against WHO GMP, EU GMP, and/or 21 CFR Part 211",
      "Mock pre-approval inspections (PAI) and surveillance audit simulations",
      "Data integrity programme design: ALCOA+ review across paper and electronic records",
      "CAPA effectiveness tracking framework and root-cause facilitation workshops",
      "Deviation management system design and SOP library rationalisation",
      "Cold-chain and GDP compliance assessment for distribution operations",
      "Annual product quality review (APQR) programme setup",
      "Third-party and supplier qualification audit support",
    ],
    benefits: [
      "Inspection readiness confirmed before the regulator arrives",
      "Documented reduction in repeat deviations through structured CAPA",
      "Defensible audit trails that satisfy multi-authority review",
      "Prioritised findings report — critical, major, and minor — with remediation timeline",
      "Sustained quality culture improvement through training integration",
      "Lower risk of import alerts, product recalls, and market withdrawals",
    ],
    process: [
      "Audit scope definition and scheduling against production calendar",
      "Pre-audit document request and advance SOP review",
      "On-site facility walk-through, process observation, and staff interviews",
      "Sample-based batch record, laboratory record, and training record review",
      "Draft findings report, findings classification, and root-cause alignment workshop",
      "Final audit report with prioritised CAPA plan and target closure dates",
      "Follow-up verification audit to confirm CAPA effectiveness (optional retainer)",
    ],
    status: "Published",
  },
  {
    _id: "svc-3",
    title: "Manufacturing Process Optimisation & Validation",
    slug: "manufacturing-process-optimization",
    category: mockServiceCategories[2],
    shortDescription:
      "Evidence-based throughput improvement, process capability analysis, and ICH Q8/Q9/Q10-aligned validation lifecycle management for solid, liquid, and sterile dosage forms.",
    description:
      "Manufacturing excellence is not achieved through compliance alone — it requires systematic process understanding and a validated, controlled operating space. Our Manufacturing Process Optimisation & Validation service applies Quality by Design (QbD) principles and statistical process control (SPC) methodology to identify and resolve the root causes of batch failures, yield losses, and cycle-time inefficiencies. We design and execute process validation protocols aligned with ICH Q8, Q9, Q10, and the FDA Process Validation Guidance (2011), covering prospective, concurrent, and retrospective validation scenarios for oral solid dosage (OSD), liquid, semi-solid, and parenteral products. Our deliverables include validated protocols, execution reports, and a sustained process monitoring programme.",
    features: [
      "Process capability study (Cpk / Ppk) and statistical trend analysis",
      "Design of Experiments (DoE) for critical process parameter identification",
      "ICH Q8-aligned Design Space definition and Control Strategy development",
      "Process validation lifecycle management: Stage 1, 2, and 3 (FDA Guidance)",
      "Equipment and cleaning validation protocol design and execution oversight",
      "Computer system validation (CSV) for manufacturing MES and LIMS platforms",
      "Technology transfer management: originator site to contract manufacturer",
      "Continued process verification (CPV) programme setup and trending",
    ],
    benefits: [
      "Sustained reduction in batch rejection and out-of-specification (OOS) rates",
      "Validated processes that satisfy multi-market regulatory expectations",
      "Reduced cycle time through optimised process windows",
      "Lower cost-of-quality (CoQ) through prevention rather than detection",
      "Defensible validation lifecycle documentation for agency review",
      "Seamless technology transfer to contract manufacturing organisations (CMOs)",
    ],
    process: [
      "Baseline process data review and critical quality attribute (CQA) mapping",
      "Risk assessment workshop — Ishikawa / FMEA for CPP identification",
      "DoE design, execution, and statistical analysis of experimental results",
      "Protocol authoring: Development Report, Validation Protocol, Acceptance Criteria",
      "On-site or remote execution oversight and real-time deviation management",
      "Validation Summary Report and Regulatory Submission Package preparation",
      "Stage 3 CPV programme design and ongoing statistical monitoring setup",
    ],
    status: "Published",
  },
  {
    _id: "svc-4",
    title: "Market Access & Commercialisation Strategy",
    slug: "market-access-strategy",
    category: mockServiceCategories[3],
    shortDescription:
      "Integrated market access planning covering health technology assessment, pricing architecture, reimbursement pathway navigation, and multi-market launch sequencing.",
    description:
      "Regulatory approval is the beginning, not the end, of the market access challenge. Payers, formulary committees, and national health programmes increasingly require rigorous health economic evidence alongside the clinical package. Our Market Access & Commercialisation Strategy service bridges the regulatory-commercial interface, helping manufacturers define compelling value propositions, structure competitive pricing within reimbursement corridors, and sequence multi-country launches for maximum first-mover advantage. We combine primary market research with secondary health economics modelling to produce country-specific value dossiers and payer negotiation briefings that accelerate formulary listing and tender wins.",
    features: [
      "Health Technology Assessment (HTA) submission preparation and advisory",
      "Pharmacoeconomic modelling: cost-effectiveness and cost-utility analyses",
      "Reimbursement landscape mapping across target markets",
      "International Reference Pricing (IRP) analysis and price corridor optimisation",
      "Formulary positioning strategy and key account plan development",
      "Tender and public procurement strategy for government and institutional buyers",
      "Launch sequencing roadmap across South Asia, Middle East, and Africa markets",
      "Patient access programme (PAP) and managed entry agreement (MEA) structuring",
    ],
    benefits: [
      "Faster formulary listing and reimbursement decision timelines",
      "Price-protected entry strategy that withstands IRP erosion",
      "Evidence-based value narratives that resonate with payers and clinicians",
      "Coordinated multi-country launch plan reduces time-to-revenue",
      "Competitive intelligence that identifies first-mover entry windows",
      "Reduced risk of post-launch price referencing downward spirals",
    ],
    process: [
      "Target market prioritisation workshop and opportunity sizing",
      "Reimbursement landscape research and payer stakeholder mapping",
      "Health economic model development and clinical evidence gap analysis",
      "Value dossier and HTA submission package authoring",
      "Pricing architecture workshop and IRP scenario modelling",
      "Launch sequencing roadmap with market-specific tactical plans",
      "Post-launch monitoring, payer engagement support, and strategy iteration",
    ],
    status: "Published",
  },
];

export const mockTrainingCategories = [
  { _id: "tc-1", name: "GMP & Compliance", slug: "gmp-compliance" },
  { _id: "tc-2", name: "Regulatory Affairs", slug: "regulatory-affairs-training" },
  { _id: "tc-3", name: "Quality Systems", slug: "quality-systems" },
];

export const mockTrainings = [
  {
    _id: "tr-1",
    title: "Current Good Manufacturing Practice (cGMP) Fundamentals",
    slug: "cgmp-fundamentals-workshop",
    category: mockTrainingCategories[0],
    trainer: "Dr. Farhana Islam, Head of Regulatory Affairs",
    duration: "2 days (16 CPD hours)",
    location: "Dhaka, Bangladesh (also available online)",
    schedule: "14–15 August 2026",
    description:
      "This intensive two-day programme provides pharmaceutical professionals with a thorough grounding in current Good Manufacturing Practice (cGMP) requirements across solid oral, liquid, and sterile dosage forms. Participants work through real-world case studies drawn from DGDA and WHO inspection reports, gaining the practical tools to identify gaps in their own facilities and build a credible remediation roadmap. Assessments, SOPs, and workshop materials are included. CPD certification is issued upon successful completion of the post-workshop assessment.",
    status: "Published",
  },
  {
    _id: "tr-2",
    title: "CTD/eCTD Dossier Compilation Masterclass",
    slug: "regulatory-dossier-writing",
    category: mockTrainingCategories[1],
    trainer: "Md. Kamal Hossain, Senior Regulatory Consultant",
    duration: "3 days (24 CPD hours)",
    location: "Chattogram, Bangladesh (also available online)",
    schedule: "2–4 September 2026",
    description:
      "A hands-on masterclass in Common Technical Document (CTD) and electronic CTD (eCTD) dossier preparation for regulatory submissions across DGDA, CDSCO, SFDA, and WHO pre-qualification pathways. Delegates produce a sample Module 1–5 package under expert supervision, receive granular feedback on scientific narrative quality, and leave with a comprehensive checklist toolkit covering the most commonly flagged deficiencies. Designed for regulatory affairs officers, medical writers, and R&D managers with basic pharmacopoeia knowledge.",
    status: "Published",
  },
  {
    _id: "tr-3",
    title: "Data Integrity & ALCOA+ in the Modern Quality Lab",
    slug: "data-integrity-alcoa-training",
    category: mockTrainingCategories[2],
    trainer: "Md. Kamal Hossain, Senior Regulatory Consultant",
    duration: "1 day (8 CPD hours)",
    location: "Dhaka, Bangladesh (also available online)",
    schedule: "10 October 2026",
    description:
      "Regulatory agencies worldwide have elevated data integrity scrutiny to a top inspection priority. This focused one-day workshop unpacks the ALCOA+ framework (Attributable, Legible, Contemporaneous, Original, Accurate, plus Complete, Consistent, Enduring, and Available) with live examples from recent WHO and MHRA inspection warning letters. Participants learn to perform an internal data integrity gap assessment, design data governance SOPs, and build an audit-ready electronic records programme under 21 CFR Part 11 and EU GMP Annex 11 frameworks.",
    status: "Published",
  },
];

export const mockTestimonials = [
  {
    _id: "ts-1",
    clientName: "Farhana Ahmed",
    designation: "Head of Regulatory Affairs",
    company: "MedCore Pharmaceuticals Ltd.",
    photo: "",
    rating: 5,
    quote:
      "IdeaCT compressed an 18-month multi-market registration timeline into 12 weeks without cutting a single corner on compliance. Their team felt like an extension of our own regulatory department.",
    featured: true,
    status: "Published",
  },
  {
    _id: "ts-2",
    clientName: "Rezaul Karim",
    designation: "VP, Quality & Compliance",
    company: "Vitalis Health Group",
    photo: "",
    rating: 5,
    quote:
      "The GDP audit and CAPA remediation programme IdeaCT delivered fixed root causes we didn't even know we had. Our next DGDA inspection was the smoothest we've had in years.",
    featured: true,
    status: "Published",
  },
  {
    _id: "ts-3",
    clientName: "Anika Chowdhury",
    designation: "Director, Market Access",
    company: "Northstar Biologics Pvt. Ltd.",
    photo: "",
    rating: 4,
    quote:
      "Sharp, data-driven, and genuinely invested in our launch outcome. The reimbursement landscape analysis alone was worth the engagement.",
    featured: true,
    status: "Published",
  },
];

export const mockPartners = [
  { _id: "pt-1", name: "MedCore Pharmaceuticals", logo: "", link: "https://example.com", order: 1, status: "Published" },
  { _id: "pt-2", name: "Vitalis Health Group", logo: "", link: "https://example.com", order: 2, status: "Published" },
  { _id: "pt-3", name: "Northstar Biologics", logo: "", link: "https://example.com", order: 3, status: "Published" },
  { _id: "pt-4", name: "DGDA Compliance Alliance", logo: "", link: "", order: 4, status: "Published" },
];

export const mockClients = [
  {
    _id: "cl-1",
    companyName: "MedCore Pharmaceuticals Ltd.",
    slug: "medcore-pharmaceuticals",
    industry: "Generic Oral Solid Manufacturing",
    country: "Bangladesh",
    website: "https://medcore.example.com",
    overview:
      "MedCore engaged IdeaCT to lead a multi-market registration programme for 14 generic oral solid products simultaneously across Bangladesh, Myanmar, and Sri Lanka. Our team constructed a parallel-track submission strategy built on a shared core CTD package with localised Module 1 annexes, enabling simultaneous submissions to three health authorities within a 12-week window — a timeline that the client's internal regulatory team had estimated would require 18 months with sequential filing.",
    servicesReceived: ["regulatory-submission-compliance", "market-access-strategy"],
    featured: true,
    status: "Published",
  },
  {
    _id: "cl-2",
    companyName: "Vitalis Health Group",
    slug: "vitalis-health-group",
    industry: "Pharmaceutical Distribution & Cold Chain Logistics",
    country: "Bangladesh",
    website: "https://vitalis.example.com",
    overview:
      "Vitalis retained IdeaCT for a comprehensive GDP audit programme across three temperature-controlled distribution hubs following a pattern of cold-chain deviation observations during DGDA surveillance inspections. IdeaCT delivered a root-cause analysis that traced systemic deviations to gaps in SOP design and sensor calibration scheduling, followed by a full QMS remediation programme including staff competency reassessment, SOP rewrite, and a structured CAPA closure programme.",
    servicesReceived: ["quality-management-system-audits"],
    featured: true,
    status: "Published",
  },
  {
    _id: "cl-3",
    companyName: "Northstar Biologics Pvt. Ltd.",
    slug: "northstar-biologics",
    industry: "Biologics & Biosimilars",
    country: "India",
    website: "https://northstar.example.com",
    overview:
      "Northstar commissioned IdeaCT to design the market access strategy for a biosimilar trastuzumab launch across five South Asian markets. The engagement included a health economic model comparing cost-of-therapy against the originator and available generics, a reimbursement landscape analysis for each target market, and a sequenced launch roadmap that prioritised markets with the strongest payer adoption potential and lowest IRP risk.",
    servicesReceived: ["market-access-strategy"],
    featured: false,
    status: "Published",
  },
  {
    _id: "cl-4",
    companyName: "AquaPharma Industries",
    slug: "aquapharma-industries",
    industry: "Liquid Oral & Parenteral Manufacturing",
    country: "Bangladesh",
    website: "https://aquapharma.example.com",
    overview:
      "AquaPharma engaged IdeaCT to lead a full manufacturing process validation programme for a new liquid oral production line ahead of a WHO pre-qualification submission. Our team designed and executed Stage 1–3 validation protocols for three product groups, managed the equipment qualification (DQ/IQ/OQ/PQ) programme, and authored the complete validation package incorporated into the WHO PQ dossier.",
    servicesReceived: ["manufacturing-process-optimization"],
    featured: true,
    status: "Published",
  },
];

export const mockPortfolio = [
  {
    _id: "pf-1",
    title: "14-Product Multi-Market Registration Programme",
    slug: "regional-registration-program",
    client: mockClients[0],
    industry: "Generic Oral Solid Manufacturing",
    challenge:
      "MedCore Pharmaceuticals needed to simultaneously register 14 generic oral solid products across Bangladesh, Myanmar, and Sri Lanka within a single fiscal year. Internal estimates had placed the timeline at 18 months using a sequential submission approach, making the project commercially unviable under the Board-approved launch window.",
    solution:
      "IdeaCT designed a parallel-track submission architecture built on a shared Module 2–5 CTD core with jurisdiction-specific Module 1 packages. We embedded a dedicated dossier management team on-site for eight weeks to accelerate source data collection, commissioned a bioequivalence study review that identified three products eligible for waiver, and established a real-time query tracker enabling same-week responses to health authority clarifications.",
    outcome:
      "All 14 products received registration certificates within 11 months — seven weeks ahead of the commercial deadline. Two filings achieved first-cycle approval with zero deficiency letters, setting a new benchmark for the client's regulatory function. IdeaCT subsequently retained to manage the full post-approval variation lifecycle.",
    featured: true,
    status: "Published",
  },
  {
    _id: "pf-2",
    title: "GDP QMS Remediation — Vitalis Health Group",
    slug: "distribution-qms-remediation",
    client: mockClients[1],
    industry: "Pharmaceutical Distribution & Cold Chain Logistics",
    challenge:
      "Vitalis Health Group faced escalating regulatory scrutiny after DGDA surveillance inspections across three distribution hubs identified a recurring pattern of cold-chain temperature excursions. A formal Corrective Action request was received, carrying the risk of product recall and potential licence suspension if not satisfactorily addressed within 90 days.",
    solution:
      "IdeaCT conducted an accelerated root-cause investigation that identified three systemic failure modes: inadequate SOP specificity for alarm response protocols, an unvalidated sensor calibration schedule, and a CAPA system that was closing actions without verifying effectiveness. A structured 12-week remediation programme redesigned all three systems, including new GDP SOPs, a qualified temperature mapping programme, and a risk-ranked CAPA tracker with management review governance.",
    outcome:
      "Cold-chain deviation frequency dropped by 68% within two quarters. DGDA accepted the CAPA response in full, closing the formal action request. Vitalis subsequently commissioned IdeaCT to design an annual GDP audit programme across all five of its distribution facilities.",
    featured: true,
    status: "Published",
  },
  {
    _id: "pf-3",
    title: "WHO Pre-Qualification Validation Package — AquaPharma",
    slug: "who-prequalification-validation-aquapharma",
    client: mockClients[3],
    industry: "Liquid Oral & Parenteral Manufacturing",
    challenge:
      "AquaPharma Industries was constructing a new WHO PQ-targeted liquid oral production facility and needed a complete Stage 1–3 process validation lifecycle programme, equipment qualification programme, and CSV validation for the integrated MES system — all within a 14-month construction and commissioning schedule.",
    solution:
      "IdeaCT assigned a dedicated validation team that worked alongside AquaPharma's engineering and QA functions from DQ phase onwards. We authored all URS, DQ, IQ, OQ, and PQ protocols, executed the equipment qualification programme for 24 process and utility systems, designed the DoE study for three product families, and validated the MES platform against GAMP 5 Category 4 requirements.",
    outcome:
      "The facility passed WHO PQ pre-inspection with zero critical and two minor observations. The validation package was accepted without major query in the PQ submission, and the facility received WHO pre-qualification for two products within 18 months of project initiation.",
    featured: true,
    status: "Published",
  },
];

export const mockExpertTeam = [
  {
    _id: "et-1",
    employeeId: "IDC-001",
    fullName: "Dr. Farhana Islam",
    designation: "Head of Regulatory Affairs",
    department: "Regulatory Affairs",
    experience: 14,
    specialization: ["CTD/eCTD Dossier Management", "DGDA & WHO Pre-Qualification", "Health Authority Liaison", "Post-Approval Variations"],
    biography:
      "Dr. Islam has led regulatory affairs functions across South Asia for over 14 years, with direct experience spanning DGDA, CDSCO, and WHO pre-qualification pathways. Prior to joining IdeaCT, she served as Director of Regulatory Affairs at a leading Bangladeshi pharmaceutical manufacturer where she built the regulatory function from the ground up. She holds a PhD in Pharmaceutical Sciences from Dhaka University and is a certified Regulatory Affairs Professional (RAP) through RAPS.",
    email: "farhana.islam@ideact.com",
    phone: "+880 1711 000001",
    status: "Published",
  },
  {
    _id: "et-2",
    employeeId: "IDC-002",
    fullName: "Md. Kamal Hossain",
    designation: "Senior Quality & Compliance Consultant",
    department: "Quality Assurance",
    experience: 11,
    specialization: ["GMP / GDP Audits", "CAPA System Design", "Data Integrity Programmes", "Mock Regulatory Inspections"],
    biography:
      "Kamal Hossain brings 11 years of quality assurance and GMP compliance experience spanning manufacturing, distribution, and clinical trial supply environments. He has led more than 80 GMP audit engagements across Bangladesh, India, and Sri Lanka, and has directly supported three WHO pre-qualification facility inspections. He is a certified Lead Auditor under ISO 9001:2015 and a member of the Parenteral Drug Association (PDA).",
    email: "kamal.hossain@ideact.com",
    phone: "+880 1711 000002",
    status: "Published",
  },
  {
    _id: "et-3",
    employeeId: "IDC-003",
    fullName: "Nusrat Jahan",
    designation: "Market Access & Pharmacoeconomics Lead",
    department: "Market Access",
    experience: 9,
    specialization: ["Health Technology Assessment", "Pharmacoeconomic Modelling", "Reimbursement Strategy", "Launch Sequencing"],
    biography:
      "Nusrat Jahan specialises in the intersection of regulatory approval and commercial access, with nine years designing HTA submissions and pricing strategies for pharmaceutical and medical device clients entering emerging markets. She holds an MSc in Health Economics from Mahidol University (Thailand) and has advised on over 35 market access programmes spanning South Asia, the Middle East, and Sub-Saharan Africa.",
    email: "nusrat.jahan@ideact.com",
    phone: "+880 1711 000003",
    status: "Published",
  },
  {
    _id: "et-4",
    employeeId: "IDC-004",
    fullName: "Engr. Rezaul Karim",
    designation: "Principal Manufacturing & Validation Consultant",
    department: "Manufacturing Consultancy",
    experience: 16,
    specialization: ["Process Validation Lifecycle", "Equipment Qualification", "Computer System Validation (CSV)", "QbD & Design Space"],
    biography:
      "Rezaul Karim is a chemical engineer with 16 years of pharmaceutical manufacturing and validation experience across oral solid, liquid, and sterile dosage form technologies. He has managed qualification and validation programmes for greenfield facilities targeting WHO PQ, FDA, and EMA standards, and holds expertise in GAMP 5 CSV methodology and ICH Q8/Q9/Q10 Quality by Design frameworks. He is a senior member of the International Society for Pharmaceutical Engineering (ISPE).",
    email: "rezaul.karim@ideact.com",
    phone: "+880 1711 000004",
    status: "Published",
  },
];

export const mockLeadership = [
  {
    _id: "ld-1",
    name: "Ayesha Rahman",
    designation: "Founder & Managing Director",
    photo: "",
    biography:
      "Ayesha founded IdeaCT in 2010 following an 18-year career spanning senior roles at the Bangladesh Directorate General of Drug Administration (DGDA), WHO procurement programmes in Geneva, and two multinational pharmaceutical organisations. Her deep understanding of regulatory systems from both sides of the table — as a regulator and as an industry adviser — informs IdeaCT's distinctive approach: technically rigorous, operationally pragmatic, and always focused on sustainable compliance rather than point-in-time fixes.",
    linkedin: "https://linkedin.com/in/ayesha-rahman",
    displayOrder: 1,
  },
  {
    _id: "lead-2",
    name: "Dr. Rashid Ahmed",
    designation: "Director of Quality Systems",
    photo: "",
    biography:
      "Dr. Ahmed oversees all GMP audit engagements and quality system remediation projects. With a PhD in Pharmaceutical Sciences and 14 years of industry experience, he has led successful regulatory inspections at over 40 manufacturing sites.",
    linkedin: "https://linkedin.com/in/rashid-ahmed",
    displayOrder: 2,
  },
  {
    _id: "lead-3",
    name: "Sarah Karim",
    designation: "Head of Regulatory Strategy",
    photo: "",
    biography:
      "Sarah specialises in multi-market submission strategy and CTD dossier compilation. She has managed parallel submissions across DGDA, CDSCO, DRAP, and WHO pre-qualification pathways for over 30 pharmaceutical products.",
    linkedin: "https://linkedin.com/in/sarah-karim",
    displayOrder: 3,
  },
];

export const mockBlogCategories = [
  { _id: "bc-1", name: "Regulatory Affairs", slug: "regulatory" },
  { _id: "bc-2", name: "Quality & GMP", slug: "quality" },
  { _id: "bc-3", name: "Market Access", slug: "market-access" },
];

export const mockBlogs = [
  {
    _id: "bl-1",
    title: "Five Critical Deficiencies in eCTD Submissions — and How to Avoid Them",
    slug: "five-common-deficiencies-in-ectd-submissions",
    category: mockBlogCategories[0],
    excerpt:
      "Health authority reviewers consistently flag the same handful of technical and content deficiencies in eCTD submissions. Understanding the root causes can eliminate one to two query cycles from your submission timeline.",
    content: `Health authority reviewers across DGDA, CDSCO, and WHO pre-qualification programmes consistently flag the same structural and content deficiencies in eCTD packages. Based on our review of more than 120 deficiency letters over the past five years, we have identified five patterns that account for the majority of first-cycle query rounds — and the strategies that resolve them at the source.

**1. Incomplete Module 3 Quality Data — Especially Specifications and Validation Reports**
The most frequent observation across all health authorities is incomplete analytical method validation data in Module 3.2.P.5. Reviewers routinely cite missing specificity data for impurity methods, insufficient linearity ranges, and robustness studies omitted altogether. The resolution is deceptively simple: maintain a method validation master checklist aligned to ICH Q2(R1) and cross-reference it against Module 3 during final QC review.

**2. Biowaiver Justification Not Aligned with BCS Classification Evidence**
Biopharmaceutics Classification System (BCS) waiver requests are rejected at high rates when the permeability data cited in the dossier is drawn from literature rather than in-house or third-party experimental data. Regulators expect sponsor-generated data or a robust scientific justification for the literature source. Budget for in-house Caco-2 or PAMPA data early in development to avoid this.

**3. Module 1 Country-Specific Annexes — Formatting Non-Compliance**
Module 1 requirements are jurisdiction-specific, and even technically excellent Module 2–5 packages are held up by Module 1 formatting errors: missing translated Summaries of Product Characteristics (SmPC), incorrect administrative form versions, or outdated country-specific templates. Maintain a jurisdiction-specific Module 1 checklist updated against each authority's current technical guidance.

**4. Manufacturing Site Changes Not Supported by Comparative Data**
When a CMO or API supplier change is disclosed in a new application, reviewers expect a comparability package even when the change precedes the submission date. Many applicants omit this data, assuming the change is too minor to warrant a comparability exercise. This assumption is consistently wrong. Any post-development manufacturing change should be supported by at least a three-batch comparative dissolution profile dataset.

**5. Stability Data Gaps at Time of Submission**
Submissions filed with preliminary stability data (12–18 months) but without a commitment letter specifying exactly when full long-term data will be provided are routinely queried. Prepare a detailed stability commitment letter addressing: number of batches, storage conditions, and exact data availability dates — and submit it as an exhibit in Module 1.`,
    tags: ["eCTD", "Dossier", "Regulatory Strategy", "CTD"],
    views: 1847,
    readTime: "8 min read",
    createdAt: "2026-06-02",
    status: "Published",
  },
  {
    _id: "bl-2",
    title: "Building a CAPA System That Actually Prevents Recurrence",
    slug: "building-a-capa-system-that-prevents-recurrence",
    category: mockBlogCategories[1],
    excerpt:
      "Most pharmaceutical CAPA programmes fail not at the corrective step but at the root-cause investigation stage. A structured approach to Ishikawa analysis, risk ranking, and effectiveness verification changes that outcome.",
    content: `Regulatory inspectors across WHO, MHRA, and FDA consistently rank CAPA system weaknesses among their top five observations in pharmaceutical site inspections. The irony is that most CAPA systems fail not because organisations lack corrective actions — they fail because the root causes identified are too superficial to drive lasting change.

**The Root Cause Problem**
A deviation is logged. A corrective action is assigned: "Retrain the operator." Six months later, the same deviation recurs. This pattern is so common it has become a cliché in pharmaceutical quality circles — but it is not inevitable. The failure point is nearly always in the root-cause investigation methodology. "Operator error" is almost never a root cause; it is a symptom. The actual root cause lies upstream: inadequate SOP clarity, training that did not verify competency, supervision gaps, or equipment design that makes correct execution difficult.

**A Structured Approach to Root-Cause Analysis**
Effective CAPA systems use structured root-cause tools: the 5-Why method for straightforward single-variable deviations, and Ishikawa (fishbone) diagrams for complex, multi-factorial events. The key discipline is asking "why" at least five levels deep before accepting a proposed root cause. For each level, ask: "If we fixed this, would the deviation have been prevented?" If the answer is no, go deeper.

**Risk-Ranking CAPA Actions**
Not all CAPA actions carry equal regulatory or patient-safety weight. A risk matrix — plotting likelihood of recurrence against severity of potential harm — allows quality teams to prioritise resource allocation. Critical and major CAPAs should have assigned owners, defined completion dates, and escalation triggers if milestones slip. Minor CAPAs may be batched and reviewed in periodic trend analysis.

**Effectiveness Verification — the Most Neglected Step**
Closing a CAPA without verifying that the corrective action achieved its objective is the single most common reason for repeat observations. Effectiveness verification should be planned at the time the CAPA is opened: define the metric that will confirm success, the sample size required, and the timeframe for assessment. Effectiveness checks should be recorded in the CAPA record and reviewed at periodic quality management reviews.

**Governance and Management Review Integration**
CAPA data becomes a powerful tool when aggregated at the system level. A monthly CAPA ageing report, a quarterly trending analysis by deviation category, and an annual effectiveness summary presented to senior management turns a compliance activity into a strategic quality management input.`,
    tags: ["CAPA", "Quality Management", "GMP", "Root Cause Analysis"],
    views: 1423,
    readTime: "10 min read",
    createdAt: "2026-05-18",
    status: "Published",
  },
  {
    _id: "bl-3",
    title: "Market Access in South Asia: Why Regulatory Approval Is Only Half the Battle",
    slug: "market-access-south-asia-regulatory-approval",
    category: mockBlogCategories[2],
    excerpt:
      "Obtaining marketing authorisation in a new market does not guarantee commercial access. In South Asian markets, formulary listing timelines, public tender dynamics, and International Reference Pricing exposure create the real commercialisation challenge.",
    content: `For pharmaceutical manufacturers entering South Asian markets, the most common misconception is that regulatory approval is the primary hurdle to commercial success. In reality, the harder challenge often begins after the approval certificate is received.

**Formulary Listing Is Not Automatic**
In markets with national health insurance or government procurement programmes — including Bangladesh's Essential Drugs Programme, India's PMBJP scheme, and Sri Lanka's National Medicines Regulatory Authority formulary — approval by the medicines authority does not automatically secure access to the public market channel. Formulary listing decisions are made by separate committees, on separate timelines, and subject to separate evidence requirements that often include cost-effectiveness data not required for the marketing authorisation submission.

**The International Reference Pricing Trap**
Many manufacturers enter their first South Asian market with a price calibrated to their home market economics. What they fail to anticipate is that this price immediately becomes an International Reference Price anchor for every subsequent market they enter. IRP surveillance is active across all ASEAN and South Asian markets, and a high price set in Bangladesh will constrain pricing in India, Sri Lanka, and Myanmar within 12–24 months as IRP algorithms pick it up.

**Sequencing Your Launch Markets**
A disciplined market entry sequence — low-IRP-risk markets first, with pricing architecture designed to protect target markets — requires modelling before the first submission is filed, not after the first approval is received. IdeaCT's standard market access engagement begins with an IRP impact model that maps the cascading price implications of each possible launch sequence across the target country set.

**What Payers Actually Want to See**
Payer decision-makers in South Asian markets — whether government bodies, insurance funds, or hospital formulary committees — are increasingly sophisticated in their evidence demands. A pharmacoeconomic model demonstrating cost-per-QALY advantage relative to the current standard of care, or a budget impact model demonstrating system-level savings, can compress formulary listing timelines by six to twelve months compared with submissions that present only clinical efficacy data.`,
    tags: ["Market Access", "South Asia", "Pricing Strategy", "HTA"],
    views: 892,
    readTime: "9 min read",
    createdAt: "2026-04-30",
    status: "Published",
  },
];

export const mockGalleryItems = [
  { _id: "gl-1", title: "Head Office — Gulshan, Dhaka", category: "Office", images: [] },
  { _id: "gl-2", title: "cGMP Fundamentals Workshop 2026", category: "Training", images: [] },
  { _id: "gl-3", title: "WHO PQ Site Inspection Preparation", category: "Consulting", images: [] },
  { _id: "gl-4", title: "Annual Quality Leadership Summit", category: "Events", images: [] },
  { _id: "gl-5", title: "Regulatory Dossier Masterclass — Chittagong", category: "Training", images: [] },
  { _id: "gl-6", title: "Client Site Audit — AquaPharma Facility", category: "Consulting", images: [] },
  { _id: "gl-7", title: "Data Integrity Symposium 2025", category: "Events", images: [] },
  { _id: "gl-8", title: "IdeaCT Team — Company Day 2026", category: "Company", images: [] },
];

export const mockCertificates = [
  {
    _id: "ct-1",
    title: "ISO 9001:2015 Quality Management Certification",
    issuedBy: "BSI Group",
    issueDate: "2025-03-01",
    description: "Certified Quality Management System compliant with ISO 9001:2015 standards across all consultancy and training service lines.",
  },
  {
    _id: "ct-2",
    title: "Approved Training Provider — Pharmaceutical Society of Bangladesh",
    issuedBy: "Pharmaceutical Society of Bangladesh (PSB)",
    issueDate: "2024-11-15",
    description: "Recognised as an accredited CPD training provider for pharmaceutical and healthcare professionals under the PSB continuing professional development framework.",
  },
  {
    _id: "ct-3",
    title: "WHO Listed Regulatory Affairs Consultancy",
    issuedBy: "World Health Organization",
    issueDate: "2023-06-30",
    description: "IdeaCT is listed as a qualified regulatory affairs consultancy in the WHO directory of technical assistance providers for medicines registration in developing countries.",
  },
];

export const mockDownloads = [
  {
    _id: "dl-1",
    title: "IdeaCT Company Profile 2026",
    category: "Company Profile",
    fileSize: "2.4 MB",
    downloadCount: 3847,
    description: "Comprehensive overview of IdeaCT's service portfolio, key client engagements, team credentials, and contact details.",
  },
  {
    _id: "dl-2",
    title: "Training Catalogue 2026 — Full Programme Directory",
    category: "Catalogue",
    fileSize: "1.8 MB",
    downloadCount: 2109,
    description: "Complete listing of IdeaCT's 2026 training programmes with schedules, fees, learning objectives, and registration details.",
  },
  {
    _id: "dl-3",
    title: "GMP Self-Assessment Checklist — WHO TRS Standards",
    category: "Technical Resource",
    fileSize: "0.9 MB",
    downloadCount: 5612,
    description: "A practical 180-point self-assessment checklist aligned to WHO Technical Report Series GMP guidelines for pharmaceutical manufacturers.",
  },
  {
    _id: "dl-4",
    title: "eCTD Submission Deficiency Avoidance Guide",
    category: "Technical Resource",
    fileSize: "1.2 MB",
    downloadCount: 4230,
    description: "A structured guide to the most frequently flagged eCTD deficiencies across DGDA, CDSCO, and WHO pre-qualification submissions, with specific remediation strategies.",
  },
];

export const mockFaqs = [
  {
    _id: "faq-1",
    question: "How long does a typical regulatory submission take from engagement to approval?",
    answer:
      "Timelines vary significantly by target market and product complexity. For a well-documented generic with bioequivalence data in place, our standard dossier preparation phase runs 8–14 weeks from data handover to submission. Authority review times range from 3 months (DGDA fast-track) to 18–24 months for complex products in markets with high backlog. We provide market-specific timeline projections during initial scoping.",
    service: "svc-1",
  },
  {
    _id: "faq-2",
    question: "Do you manage post-approval variations and renewals, or only initial submissions?",
    answer:
      "We manage the full post-approval lifecycle — Type IA and IB notifications, Type II variations, labelling updates, and periodic renewals — either as an ongoing retainer engagement or on a per-variation basis. Many clients retain IdeaCT as their outsourced regulatory function following initial product approval.",
    service: "svc-1",
  },
  {
    _id: "faq-3",
    question: "Can you support submissions in markets outside Bangladesh?",
    answer:
      "Yes. Our team has direct experience with regulatory pathways across DGDA (Bangladesh), CDSCO (India), DRAP (Pakistan), SFDA (Sri Lanka), FDA Myanmar, and WHO pre-qualification. We also work with regional partners for GCC, ASEAN, and Sub-Saharan African submissions.",
    service: "svc-1",
  },
  {
    _id: "faq-4",
    question: "How disruptive is a GMP audit to our daily production schedule?",
    answer:
      "We schedule all audits collaboratively to minimise production disruption. A comprehensive site audit typically requires 2–3 days of on-site time per facility. Document review is conducted in advance to reduce the on-site time required from your team. Most clients report that the audit process itself — conducted professionally and respectfully — is less disruptive than expected.",
    service: "svc-2",
  },
  {
    _id: "faq-5",
    question: "What happens if critical findings are identified during the audit?",
    answer:
      "Critical findings are escalated immediately during the audit, not held until the final report. We discuss all critical observations with senior management before leaving the site and provide interim guidance on containment measures. The formal findings report, including a risk-ranked CAPA plan with recommended timelines, is delivered within ten working days of audit completion.",
    service: "svc-2",
  },
];



export const mockStats = {
  projectsCompleted: 180,
  corporateClients: 64,
  trainingPrograms: 95,
  industryExperts: 22,
  yearsOfExperience: 15,
  traineesGraduated: 4200,
};


// ─── Dynamic Getters (Database-to-Mock Fallbacks) ──────────────────────────

export async function getSettings() {
  if (process.env.FORCE_DEMO === "true") return mockSettings;
  try {
    await connectDB();
    const doc = await WebsiteSettings.findOne().lean();
    if (doc) return { ...mockSettings, ...doc };
  } catch (e) {
    console.error("DB settings load failed, using mock:", e);
  }
  return mockSettings;
}

export async function getServiceCategories() {
  if (process.env.FORCE_DEMO === "true") return mockServiceCategories;
  try {
    await connectDB();
    const items = await ServiceCategory.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB service categories load failed, using mock:", e);
  }
  return mockServiceCategories;
}

export async function getServices() {
  if (process.env.FORCE_DEMO === "true") return mockServices;
  try {
    await connectDB();
    const items = await Service.find({ isDeleted: { $ne: true } }).populate("category").lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB services load failed, using mock:", e);
  }
  return mockServices;
}

export async function getTrainingCategories() {
  if (process.env.FORCE_DEMO === "true") return mockTrainingCategories;
  try {
    await connectDB();
    const items = await TrainingCategory.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB training categories load failed, using mock:", e);
  }
  return mockTrainingCategories;
}

export async function getTrainings() {
  if (process.env.FORCE_DEMO === "true") return mockTrainings;
  try {
    await connectDB();
    const items = await Training.find({ isDeleted: { $ne: true } }).populate("category").lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB trainings load failed, using mock:", e);
  }
  return mockTrainings;
}

export async function getClients() {
  if (process.env.FORCE_DEMO === "true") return mockClients;
  try {
    await connectDB();
    const items = await Client.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB clients load failed, using mock:", e);
  }
  return mockClients;
}

export async function getTestimonials() {
  if (process.env.FORCE_DEMO === "true") return mockTestimonials;
  try {
    await connectDB();
    const items = await Testimonial.find({ isDeleted: { $ne: true }, status: "Published" })
      .sort({ featured: -1, createdAt: -1 })
      .lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB testimonials load failed, using mock:", e);
  }
  return mockTestimonials;
}

export async function getPartners() {
  if (process.env.FORCE_DEMO === "true") return mockPartners;
  try {
    await connectDB();
    const items = await Partner.find({ isDeleted: { $ne: true }, status: "Published" })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB partners load failed, using mock:", e);
  }
  return mockPartners;
}

export async function getPortfolio() {
  if (process.env.FORCE_DEMO === "true") return mockPortfolio;
  try {
    await connectDB();
    const items = await Portfolio.find({ isDeleted: { $ne: true } }).populate("client").lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB portfolio load failed, using mock:", e);
  }
  return mockPortfolio;
}

export async function getExpertTeam() {
  if (process.env.FORCE_DEMO === "true") return mockExpertTeam;
  try {
    await connectDB();
    const items = await ExpertTeam.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB expert team load failed, using mock:", e);
  }
  return mockExpertTeam;
}

export async function getLeadership() {
  if (process.env.FORCE_DEMO === "true") return mockLeadership;
  try {
    await connectDB();
    const items = await Leadership.find({ isDeleted: { $ne: true } }).sort({ displayOrder: 1 }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB leadership load failed, using mock:", e);
  }
  return mockLeadership;
}

export async function getBlogCategories() {
  if (process.env.FORCE_DEMO === "true") return mockBlogCategories;
  try {
    await connectDB();
    const items = await BlogCategory.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB blog categories load failed, using mock:", e);
  }
  return mockBlogCategories;
}

export async function getBlogs() {
  if (process.env.FORCE_DEMO === "true") return mockBlogs;
  try {
    await connectDB();
    const items = await Blog.find({ isDeleted: { $ne: true } }).populate("category").lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB blogs load failed, using mock:", e);
  }
  return mockBlogs;
}

export async function getGalleryItems() {
  if (process.env.FORCE_DEMO === "true") return mockGalleryItems;
  try {
    await connectDB();
    const items = await Gallery.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB gallery items load failed, using mock:", e);
  }
  return mockGalleryItems;
}

export async function getCertificates() {
  if (process.env.FORCE_DEMO === "true") return mockCertificates;
  try {
    await connectDB();
    const items = await Certificate.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB certificates load failed, using mock:", e);
  }
  return mockCertificates;
}

export async function getDownloads() {
  if (process.env.FORCE_DEMO === "true") return mockDownloads;
  try {
    await connectDB();
    const items = await Download.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB downloads load failed, using mock:", e);
  }
  return mockDownloads;
}

export async function getFaqs() {
  if (process.env.FORCE_DEMO === "true") return mockFaqs;
  try {
    await connectDB();
    const items = await Faq.find({ isDeleted: { $ne: true } }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB faqs load failed, using mock:", e);
  }
  return mockFaqs;
}

export async function getStats() {
  if (process.env.FORCE_DEMO === "true") return mockStats;
  try {
    await connectDB();
    const [sc, tr, cl, pf, et] = await Promise.all([
      Service.countDocuments({ isDeleted: { $ne: true } }),
      Training.countDocuments({ isDeleted: { $ne: true } }),
      Client.countDocuments({ isDeleted: { $ne: true } }),
      Portfolio.countDocuments({ isDeleted: { $ne: true } }),
      ExpertTeam.countDocuments({ isDeleted: { $ne: true } }),
    ]);
    if (sc || tr || cl || pf || et) {
      return {
        projectsCompleted: pf,
        corporateClients: cl,
        trainingPrograms: tr,
        industryExperts: et,
        yearsOfExperience: mockStats.yearsOfExperience,
        traineesGraduated: mockStats.traineesGraduated,
      };
    }
  } catch (e) {
    console.error("DB stats load failed, using mock:", e);
  }
  return mockStats;
}

export const mockTraineeCertificates = [
  {
    _id: "tcert-1",
    recipientName: "Tanvir Rahman",
    recipientPhone: "01711223344",
    courseTitle: "cGMP Fundamentals & Documentation Workshop",
    issueDate: new Date("2026-05-15"),
    certificateUrl: "https://res.cloudinary.com/demo/image/upload/v1570514603/sample.jpg",
    certificateNumber: "IDACT-2026-0001",
  },
  {
    _id: "tcert-2",
    recipientName: "Farhana Yasmin",
    recipientPhone: "01811223344",
    courseTitle: "Data Integrity & ALCOA+ Principles",
    issueDate: new Date("2026-06-10"),
    certificateUrl: "https://res.cloudinary.com/demo/image/upload/v1570514603/sample.jpg",
    certificateNumber: "IDACT-2026-0002",
  },
];

export async function getTraineeCertificates() {
  if (process.env.FORCE_DEMO === "true") return mockTraineeCertificates;
  try {
    await connectDB();
    const items = await TraineeCertificate.find().lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB trainee certificates load failed, using mock:", e);
  }
  return mockTraineeCertificates;
}

export const mockHeroSlides = [
  {
    _id: "hslide-1",
    title: "CTD/eCTD Dossier Preparation & Submission",
    imageUrl: "/regulatory_dossiers.png",
    buttonText: "Explore Regulatory Services",
    buttonLink: "/services/regulatory-submission-compliance",
    displayOrder: 1,
  },
  {
    _id: "hslide-2",
    title: "cGMP Quality Audits & Compliance Remediation",
    imageUrl: "/pharma_lab_consulting.png",
    buttonText: "View QA Services",
    buttonLink: "/services/quality-management-system-audits",
    displayOrder: 2,
  },
  {
    _id: "hslide-3",
    title: "cGMP & Regulatory Training Workshops",
    imageUrl: "/professional_training.png",
    buttonText: "Browse Programs",
    buttonLink: "/training",
    displayOrder: 3,
  },
];

export async function getHeroSlides() {
  if (process.env.FORCE_DEMO === "true") return mockHeroSlides;
  try {
    await connectDB();
    const items = await HeroSlide.find().sort({ displayOrder: 1 }).lean();
    if (items && items.length > 0) return items as any[];
  } catch (e) {
    console.error("DB hero slides load failed, using mock:", e);
  }
  return mockHeroSlides;
}
