import { Schema, model, models } from "mongoose";

const StaticPageSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: ["privacy-policy", "terms"],
    },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default models.StaticPage || model("StaticPage", StaticPageSchema);
