import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const PartnerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    link: { type: String, trim: true },
    order: { type: Number, default: 0 },
    ...baseFields,
  },
  { timestamps: true }
);

PartnerSchema.index({ order: 1, status: 1 });

export default models.Partner || model("Partner", PartnerSchema);
