import HeroSlide from "@/models/HeroSlide";
import { heroSlideSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: HeroSlide,
  createSchema: heroSlideSchema,
  filterableFields: [],
  searchableFields: ["title"],
  imageFields: ["imageUrl"],
});
