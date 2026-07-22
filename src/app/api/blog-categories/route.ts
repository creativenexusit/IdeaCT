import BlogCategory from "@/models/BlogCategory";
import { blogCategorySchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: BlogCategory,

  createSchema: blogCategorySchema,
});
