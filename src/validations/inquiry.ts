import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required."),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, "Message is required."),
});
