import Partner from "@/models/Partner";
import { partnerSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Partner,
  createSchema: partnerSchema,
  searchableFields: ["name"],
  imageFields: ["logo"],
});
