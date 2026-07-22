import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const ExpertTeamSchema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    department: { type: String, trim: true },
    qualification: { type: String, trim: true },
    experience: { type: Number, min: 0 },
    specialization: [{ type: String }],
    biography: { type: String },
    certifications: [{ type: String }],
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    officeLocation: { type: String, trim: true },
    profileImage: { type: String },
    qrCode: { type: String },
    ...baseFields,
  },
  { timestamps: true }
);


export default models.ExpertTeam || model("ExpertTeam", ExpertTeamSchema);
