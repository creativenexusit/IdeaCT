import { z } from "zod";

export const serviceCategorySchema = z.object({
  name: z.string().min(1, "Name is required."),
  slug: z.string().min(1, "Slug is required."),
  description: z.string().optional(),
  order: z.number().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().min(1, "Slug is required."),
  category: z.string().min(1, "Category is required."),
  thumbnail: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  process: z.array(z.string()).optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
});
