import Faq from "@/models/Faq";
import { faqSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Faq,

  createSchema: faqSchema,
});
