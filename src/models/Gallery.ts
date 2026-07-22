import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const GallerySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Office", "Events", "Training", "Projects", "Facilities"],
      required: true,
    },
    images: [{ type: String }],
    description: { type: String },
    ...baseFields,
  },
  { timestamps: true }
);

export default models.Gallery || model("Gallery", GallerySchema);
