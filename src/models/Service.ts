import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const SeoSchema = new Schema(
  {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
  { _id: false }
);

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "ServiceCategory", required: true },
    thumbnail: { type: String },
    shortDescription: { type: String, trim: true },
    description: { type: String },
    features: [{ type: String }],
    benefits: [{ type: String }],
    process: [{ type: String }],
    faq: [{ type: Schema.Types.ObjectId, ref: "Faq" }],
    seo: { type: SeoSchema, default: () => ({}) },
    ...baseFields,
  },
  { timestamps: true }
);

ServiceSchema.index({ category: 1, status: 1 });

export default models.Service || model("Service", ServiceSchema);
