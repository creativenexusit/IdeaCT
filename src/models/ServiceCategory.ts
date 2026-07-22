import { Schema, model, models } from "mongoose";

const ServiceCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.ServiceCategory || model("ServiceCategory", ServiceCategorySchema);
