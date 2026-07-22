import { Schema, model, models } from "mongoose";

const FloatingContactSettingsSchema = new Schema(
  {
    whatsappEnabled: { type: Boolean, default: false },
    whatsappNumber: { type: String, trim: true },
    whatsappDefaultMessage: { type: String, trim: true },
    messengerEnabled: { type: Boolean, default: false },
    messengerPageUsername: { type: String, trim: true },
    position: {
      type: String,
      enum: ["bottomRight", "bottomLeft"],
      default: "bottomRight",
    },
    showOnMobile: { type: Boolean, default: true },
    showOnDesktop: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.FloatingContactSettings ||
  model("FloatingContactSettings", FloatingContactSettingsSchema);
