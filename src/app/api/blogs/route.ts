import Blog from "@/models/Blog";
import { blogSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Blog,
  searchableFields: ["title"],
  createSchema: blogSchema,
  imageFields: ["thumbnail"],
});
