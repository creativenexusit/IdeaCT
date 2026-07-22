import Training from "@/models/Training";
import { trainingSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Training,
  searchableFields: ["title"],
  createSchema: trainingSchema,
  imageFields: ["banner"],
});
