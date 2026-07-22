import { Schema, model, models } from "mongoose";

const TraineeCertificateSchema = new Schema(
  {
    recipientName: { type: String, required: true, trim: true },
    recipientPhone: { type: String, required: true, trim: true },
    courseTitle: { type: String, required: true, trim: true },
    issueDate: { type: Date, required: true },
    certificateUrl: { type: String, required: true },
    certificateNumber: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default models.TraineeCertificate || model("TraineeCertificate", TraineeCertificateSchema);
