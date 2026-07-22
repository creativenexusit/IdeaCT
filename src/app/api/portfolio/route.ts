import Portfolio from "@/models/Portfolio";
import { portfolioSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Portfolio,
  searchableFields: ["title"],
  createSchema: portfolioSchema,
  imageFields: ["gallery"],
});
