import { Schema, model, models } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);

export default models.Faq || model("Faq", FaqSchema);
