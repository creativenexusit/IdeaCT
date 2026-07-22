import { Schema, model, models } from "mongoose";

const LeadershipSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    photo: { type: String },
    biography: { type: String },
    linkedin: { type: String, trim: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Leadership || model("Leadership", LeadershipSchema);
