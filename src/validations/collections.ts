import { z } from "zod";

// Password policy: minimum 6 characters.
export const passwordPolicy = /^.{6,}$/;
const passwordPolicyMessage = "Password must be at least 6 characters.";

export const trainingCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const trainingSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  banner: z.string().optional(),
  trainer: z.string().optional(),
  duration: z.string().optional(),
  location: z.string().optional(),
  schedule: z.string().optional(),
  description: z.string().optional(),
  registrationLink: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  service: z.string().optional(),
});

export const clientSchema = z.object({
  companyName: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().optional(),
  website: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  industry: z.string().optional(),
  country: z.string().optional(),
  overview: z.string().optional(),
  services: z.array(z.string()).optional(),
  completionDate: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const portfolioSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  client: z.string().min(1),
  industry: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  outcome: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(1),
  designation: z.string().optional(),
  company: z.string().optional(),
  photo: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  quote: z.string().min(1),
  featured: z.boolean().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const partnerSchema = z.object({
  name: z.string().min(1, "Partner name is required."),
  logo: z.string().min(1, "Partner logo is required."),
  link: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const expertTeamSchema = z.object({
  employeeId: z.string().min(1),
  fullName: z.string().min(1),
  designation: z.string().optional(),
  department: z.string().optional(),
  qualification: z.string().optional(),
  experience: z.number().optional(),
  specialization: z.array(z.string()).optional(),
  biography: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  officeLocation: z.string().optional(),
  profileImage: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const leadershipSchema = z.object({
  name: z.string().min(1),
  designation: z.string().optional(),
  photo: z.string().optional(),
  biography: z.string().optional(),
  linkedin: z.string().optional(),
  displayOrder: z.number().optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(1),
  issuedBy: z.string().optional(),
  issueDate: z.string().optional(),
  certificateImage: z.string().optional(),
  pdf: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const downloadSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["Company Profile", "Brochure", "Catalogue", "Presentation", "Forms", "Other"]),
  description: z.string().optional(),
  file: z.string().min(1),
  fileSize: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const blogCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  thumbnail: z.string().optional(),
  content: z.string().min(1),
  category: z.string().optional(),
  author: z.string().optional(),
  tags: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()).filter(Boolean) : val),
    z.array(z.string())
  ).optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const gallerySchema = z.object({
  title: z.string().min(1),
  category: z.enum(["Office", "Events", "Training", "Projects", "Facilities"]),
  images: z.union([z.string(), z.array(z.string())]).transform((val) => {
    if (typeof val === "string") return [val];
    return val;
  }).optional(),
  description: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});

export const userSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().regex(passwordPolicy, passwordPolicyMessage),
  phone: z.string().optional(),
  profileImage: z.string().optional(),
  role: z.enum(["Super Admin", "Manager"]),
  accountStatus: z.enum(["Active", "Inactive"]).optional(),
});

export const leadPopupSettingsSchema = z.object({
  enabled: z.boolean().optional(),
  headline: z.string().optional(),
  description: z.string().optional(),
  triggerType: z.enum(["exitIntent", "timeDelay", "scrollPercentage"]).optional(),
  timeDelaySeconds: z.number().optional(),
  scrollPercentageThreshold: z.number().optional(),
  showOncePerSession: z.boolean().optional(),
  suppressDays: z.number().optional(),
  fields: z.array(z.enum(["name", "email", "phone", "company", "message"])).optional(),
});

export const floatingContactSettingsSchema = z.object({
  whatsappEnabled: z.boolean().optional(),
  whatsappNumber: z.string().optional(),
  whatsappDefaultMessage: z.string().optional(),
  messengerEnabled: z.boolean().optional(),
  messengerPageUsername: z.string().optional(),
  position: z.enum(["bottomRight", "bottomLeft"]).optional(),
  showOnMobile: z.boolean().optional(),
  showOnDesktop: z.boolean().optional(),
});

export const traineeCertificateSchema = z.object({
  recipientName: z.string().min(1),
  recipientPhone: z.string().min(1),
  courseTitle: z.string().min(1),
  issueDate: z.string().min(1),
  certificateUrl: z.string().min(1),
  certificateNumber: z.string().optional(),
});

export const heroSlideSchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().min(1),
  buttonText: z.string().min(1),
  buttonLink: z.string().min(1),
  displayOrder: z.number().optional(),
});
