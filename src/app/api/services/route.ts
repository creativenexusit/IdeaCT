import Service from "@/models/Service";
import { serviceSchema } from "@/validations/service";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Service,
  createSchema: serviceSchema,
  filterableFields: ["category", "featured"],
  searchableFields: ["title", "shortDescription"],
  populate: ["category"],
  imageFields: ["thumbnail"],
});
