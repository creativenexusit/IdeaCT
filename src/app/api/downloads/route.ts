import Download from "@/models/Download";
import { downloadSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Download,
  searchableFields: ["title"],
  createSchema: downloadSchema,
  imageFields: ["file"],
});
