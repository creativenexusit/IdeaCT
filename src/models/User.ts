import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    profileImage: { type: String },
    role: {
      type: String,
      enum: ["Super Admin", "Manager"],
      required: true,
      default: "Manager",
    },
    accountStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    lastLogin: { type: Date },
    ...baseFields,
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

export default models.User || model("User", UserSchema);
