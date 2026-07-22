import TrainingCategory from "@/models/TrainingCategory";
import { trainingCategorySchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: TrainingCategory,

  createSchema: trainingCategorySchema,
});
