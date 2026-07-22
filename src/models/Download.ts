import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const DownloadSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Company Profile", "Brochure", "Catalogue", "Presentation", "Forms", "Other"],
      required: true,
    },
    description: { type: String },
    file: { type: String, required: true },
    fileSize: { type: String },
    downloadCount: { type: Number, default: 0 },
    ...baseFields,
  },
  { timestamps: true }
);

export default models.Download || model("Download", DownloadSchema);
