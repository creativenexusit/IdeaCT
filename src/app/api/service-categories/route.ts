import ServiceCategory from "@/models/ServiceCategory";
import { serviceCategorySchema } from "@/validations/service";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: ServiceCategory,
  createSchema: serviceCategorySchema,
  searchableFields: ["name"],
});
