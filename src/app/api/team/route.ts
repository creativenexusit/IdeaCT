import ExpertTeam from "@/models/ExpertTeam";
import { expertTeamSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: ExpertTeam,
  searchableFields: ["fullName"],
  createSchema: expertTeamSchema,
  imageFields: ["profileImage"],
});
