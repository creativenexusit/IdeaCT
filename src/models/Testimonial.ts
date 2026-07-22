import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const TestimonialSchema = new Schema(
  {
    clientName: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    company: { type: String, trim: true },
    photo: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    featured: { type: Boolean, default: false },
    ...baseFields,
  },
  { timestamps: true }
);

TestimonialSchema.index({ featured: 1, status: 1 });

export default models.Testimonial || model("Testimonial", TestimonialSchema);
