import { Schema, model, models } from "mongoose";

const LeadPopupSettingsSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    headline: { type: String, trim: true },
    description: { type: String, trim: true },
    triggerType: {
      type: String,
      enum: ["exitIntent", "timeDelay", "scrollPercentage"],
      default: "timeDelay",
    },
    timeDelaySeconds: { type: Number, default: 15, min: 3 },
    scrollPercentageThreshold: { type: Number, default: 50, min: 1, max: 100 },
    showOncePerSession: { type: Boolean, default: true },
    suppressDays: { type: Number, default: 7, min: 0 },
    fields: {
      type: [String],
      enum: ["name", "email", "phone", "company", "message"],
      default: ["name", "email", "phone"],
    },
  },
  { timestamps: true }
);

export default models.LeadPopupSettings || model("LeadPopupSettings", LeadPopupSettingsSchema);
