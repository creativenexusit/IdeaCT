import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const InquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    message: { type: String, required: true },
    inquiryStatus: {
      type: String,
      enum: ["New", "Pending", "In Progress", "Replied", "Finished", "Archived"],
      default: "New",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
    ...baseFields,
  },
  { timestamps: true }
);

InquirySchema.index({ inquiryStatus: 1, createdAt: -1 });

export default models.Inquiry || model("Inquiry", InquirySchema);
