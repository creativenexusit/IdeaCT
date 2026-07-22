import { Schema, model, models } from "mongoose";

const ActivityLogSchema = new Schema(
  {
    actor: { type: Schema.Types.ObjectId, ref: "User" },
    actorEmail: { type: String, trim: true },
    action: {
      type: String,
      enum: ["login", "content_create", "content_update", "content_delete", "user_change", "settings_change", "file_upload"],
      required: true,
    },
    description: { type: String, required: true },
    collectionName: { type: String, trim: true },
    recordId: { type: String, trim: true },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ createdAt: -1 });

export default models.ActivityLog || model("ActivityLog", ActivityLogSchema);
