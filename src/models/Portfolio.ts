import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const PortfolioSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    industry: { type: String, trim: true },
    challenge: { type: String },
    solution: { type: String },
    outcome: { type: String },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    ...baseFields,
  },
  { timestamps: true }
);

PortfolioSchema.index({ client: 1, status: 1 });

export default models.Portfolio || model("Portfolio", PortfolioSchema);
