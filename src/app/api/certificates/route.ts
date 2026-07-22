import Certificate from "@/models/Certificate";
import { certificateSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Certificate,
  searchableFields: ["title"],
  createSchema: certificateSchema,
  imageFields: ["certificateImage", "pdf"],
});
