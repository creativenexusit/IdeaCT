import Client from "@/models/Client";
import { clientSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Client,
  searchableFields: ["companyName"],
  createSchema: clientSchema,
  imageFields: ["logo"],
});
