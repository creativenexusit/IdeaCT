import Testimonial from "@/models/Testimonial";
import { testimonialSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Testimonial,
  createSchema: testimonialSchema,
  filterableFields: ["featured"],
  searchableFields: ["clientName", "company", "quote"],
  imageFields: ["photo"],
});
