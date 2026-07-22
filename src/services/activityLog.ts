import ActivityLog from "@/models/ActivityLog";

type LogInput = {
  actorEmail?: string;
  action: "login" | "content_create" | "content_update" | "content_delete" | "user_change" | "settings_change" | "file_upload";
  description: string;
  collectionName?: string;
  recordId?: string;
};

/**
 * Records an activity log entry per Phase 9: "Track login events, content
 * updates, user changes, settings changes, and file uploads, each with
 * timestamp, actor, and a short description of the change."
 *
 * Fire-and-forget by design — a logging failure should never break the
 * actual operation it's describing.
 */
export async function logActivity(input: LogInput): Promise<void> {
  try {
    await ActivityLog.create(input);
  } catch (err) {
    console.error("[activityLog] Failed to record activity:", err);
  }
}
