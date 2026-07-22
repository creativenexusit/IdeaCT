import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const TrainingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "TrainingCategory", required: true },
    banner: { type: String },
    trainer: { type: String, trim: true },
    duration: { type: String, trim: true },
    location: { type: String, trim: true },
    schedule: { type: Date },
    description: { type: String },
    registrationLink: { type: String, trim: true },
    ...baseFields,
  },
  { timestamps: true }
);


export default models.Training || model("Training", TrainingSchema);
