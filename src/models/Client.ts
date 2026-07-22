import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const ClientSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    contactEmail: { type: String, trim: true, lowercase: true },
    industry: { type: String, trim: true },
    country: { type: String, trim: true },
    overview: { type: String },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    completionDate: { type: Date },
    featured: { type: Boolean, default: false },
    ...baseFields,
  },
  { timestamps: true }
);

ClientSchema.index({ featured: 1, status: 1 });

export default models.Client || model("Client", ClientSchema);
