import FloatingContactSettings from "@/models/FloatingContactSettings";
import { floatingContactSettingsSchema } from "@/validations/collections";
import { createSingletonHandlers } from "@/lib/singletonFactory";

export const { GET, PUT } = createSingletonHandlers({
  model: FloatingContactSettings,
  schema: floatingContactSettingsSchema,
  defaults: { whatsappEnabled: false, messengerEnabled: false },
});
