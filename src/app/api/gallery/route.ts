import Gallery from "@/models/Gallery";
import { gallerySchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Gallery,
  searchableFields: ["title"],
  createSchema: gallerySchema,
  imageFields: ["images"],
});
