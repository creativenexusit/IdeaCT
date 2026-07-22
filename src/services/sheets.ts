import type { InquiryPayload } from "./mailer";

/**
 * Sends inquiry data to a Google Sheets Webhook URL.
 * The Webhook URL should be an Apps Script Web App that accepts POST requests.
 */
export async function sendToGoogleSheets(inquiry: InquiryPayload): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn(
      "[sheets] GOOGLE_SHEETS_WEBHOOK_URL is not configured. " +
      "Add it to .env.local to enable Google Sheets integration."
    );
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
        name: inquiry.name || "",
        email: inquiry.email || "",
        phone: inquiry.phone || "",
        company: inquiry.company || "",
        subject: inquiry.subject || "",
        message: inquiry.message || "",
      }),
    });

    if (!response.ok) {
      console.error(`[sheets] Failed to send data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("[sheets] Error sending data to Google Sheets:", error);
  }
}
