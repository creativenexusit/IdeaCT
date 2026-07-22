import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const CertificateSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    issuedBy: { type: String, trim: true },
    issueDate: { type: Date },
    certificateImage: { type: String },
    pdf: { type: String },
    description: { type: String },
    ...baseFields,
  },
  { timestamps: true }
);

export default models.Certificate || model("Certificate", CertificateSchema);
