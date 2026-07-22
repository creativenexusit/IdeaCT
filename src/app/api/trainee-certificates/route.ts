import TraineeCertificate from "@/models/TraineeCertificate";
import { traineeCertificateSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

export const { GET, POST, PUT, DELETE } = createCrudHandlers({
  model: TraineeCertificate,
  createSchema: traineeCertificateSchema,
  filterableFields: ["recipientPhone", "recipientName"],
  searchableFields: ["recipientName", "recipientPhone", "courseTitle", "certificateNumber"],
  imageFields: ["certificateUrl"],
});
