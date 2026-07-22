import LeadPopupSettings from "@/models/LeadPopupSettings";
import { leadPopupSettingsSchema } from "@/validations/collections";
import { createSingletonHandlers } from "@/lib/singletonFactory";

export const { GET, PUT } = createSingletonHandlers({
  model: LeadPopupSettings,
  schema: leadPopupSettingsSchema,
  defaults: { enabled: false },
});
