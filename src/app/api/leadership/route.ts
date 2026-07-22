import Leadership from "@/models/Leadership";
import { leadershipSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: Leadership,
  createSchema: leadershipSchema,
  imageFields: ["photo"],
});
