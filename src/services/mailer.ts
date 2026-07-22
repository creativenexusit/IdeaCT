import nodemailer from "nodemailer";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Shared logo attachment — embedded via Content-ID (cid:brandlogo) so the
// logo renders reliably across all email clients (Gmail, Outlook, Apple
// Mail) without depending on the site being publicly reachable yet.
// ─────────────────────────────────────────────────────────────────────────────

function logoAttachment() {
  return {
    filename: "logo.png",
    path: path.join(process.cwd(), "public", "logo-mark.png"),
    cid: "brandlogo",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Transporter & sender helpers
// ─────────────────────────────────────────────────────────────────────────────

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !username || !password) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: username, pass: password },
  });
}

function getSender() {
  const name  = process.env.SMTP_FROM_NAME  || "IdeaCT Consultancy";
  const email = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME || "";
  return { name, email, from: `"${name}" <${email}>` };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared design tokens (inline CSS — works in all email clients)
// ─────────────────────────────────────────────────────────────────────────────

const COLOR = {
  bg:        "#f1f5f9",
  card:      "#ffffff",
  dark:      "#0f172a",
  brand:     "#0d9488",          // teal-600
  brandDark: "#0f766e",          // teal-700
  muted:     "#64748b",
  border:    "#e2e8f0",
  pill:      "#f0fdf4",
  pillText:  "#15803d",
  footer:    "#94a3b8",
  red:       "#dc2626",
};

const base = `
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none}
`;

/** Outer shell shared by every template */
function shell(body: string, preheader = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>IdeaCT Email</title>
  <style>${base}</style>
</head>
<body style="margin:0;padding:0;background:${COLOR.bg};font-family:'Segoe UI',Arial,sans-serif;">
  <!-- preheader -->
  <div style="display:none;max-height:0;overflow:hidden;color:${COLOR.bg};">${preheader}&nbsp;&#847;&nbsp;</div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;">

          {/* ── Logo / brand header ── */}
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="cid:brandlogo" width="56" height="56" alt="${process.env.SMTP_FROM_NAME || "IdeaCT"}" style="display:block;height:56px;width:auto;" />
            </td>
          </tr>

          <!-- ── Card ── -->
          <tr>
            <td style="background:${COLOR.card};border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.07);overflow:hidden;">
              ${body}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0 0 6px;font-size:12px;color:${COLOR.footer};font-family:'Segoe UI',Arial,sans-serif;">
                &copy; ${new Date().getFullYear()} IdeaCT Pharmaceutical Consultancy &amp; Training. All rights reserved.
              </p>
              <p style="margin:0;font-size:11px;color:${COLOR.footer};font-family:'Segoe UI',Arial,sans-serif;">
                This email was sent automatically. Please do not reply directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Teal accent top bar inside card */
function accentBar(): string {
  return `<tr>
    <td style="background:linear-gradient(90deg,#0d9488,#2563eb);height:5px;font-size:0;line-height:0;">&nbsp;</td>
  </tr>`;
}

/** A key-value row in the detail table */
function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;font-size:13px;color:${COLOR.muted};font-family:'Segoe UI',Arial,sans-serif;white-space:nowrap;vertical-align:top;width:110px;">
      <strong>${label}</strong>
    </td>
    <td style="padding:10px 0 10px 12px;font-size:13px;color:${COLOR.dark};font-family:'Segoe UI',Arial,sans-serif;word-break:break-word;">
      ${value}
    </td>
  </tr>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Template 1 — Admin notification (new inquiry)
// ─────────────────────────────────────────────────────────────────────────────

function adminNotificationHtml(
  inquiry: InquiryPayload,
  companyName: string
): string {
  const now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    dateStyle: "long",
    timeStyle: "short",
  });

  const details = [
    row("Name", inquiry.name),
    row("Email", `<a href="mailto:${inquiry.email}" style="color:${COLOR.brand};text-decoration:none;">${inquiry.email}</a>`),
    inquiry.phone   ? row("Phone",   inquiry.phone)   : "",
    inquiry.company ? row("Company", inquiry.company) : "",
    inquiry.subject ? row("Subject", inquiry.subject) : "",
    row("Received", now),
  ].join("");

  const body = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${accentBar()}
      <tr>
        <td style="padding:36px 40px 0;">
          <!-- Badge -->
          <div style="display:inline-block;background:${COLOR.pill};border:1px solid #bbf7d0;border-radius:999px;padding:4px 14px;margin-bottom:20px;">
            <span style="font-size:11px;font-weight:700;color:${COLOR.pillText};letter-spacing:0.5px;text-transform:uppercase;font-family:'Segoe UI',Arial,sans-serif;">
              New Inquiry
            </span>
          </div>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:${COLOR.dark};font-family:'Segoe UI',Arial,sans-serif;line-height:1.3;">
            You have a new inquiry
          </h1>
          <p style="margin:0 0 28px;font-size:14px;color:${COLOR.muted};font-family:'Segoe UI',Arial,sans-serif;line-height:1.6;">
            A visitor submitted a contact form on <strong>${companyName}</strong>. Here are the details:
          </p>
        </td>
      </tr>

      <!-- Detail table -->
      <tr>
        <td style="padding:0 40px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="border:1px solid ${COLOR.border};border-radius:10px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  ${details}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Message body -->
      <tr>
        <td style="padding:0 40px 28px;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:${COLOR.muted};text-transform:uppercase;letter-spacing:0.8px;font-family:'Segoe UI',Arial,sans-serif;">
            Message
          </p>
          <div style="background:#f8fafc;border-left:4px solid ${COLOR.brand};border-radius:6px;padding:18px 20px;">
            <p style="margin:0;font-size:14px;color:${COLOR.dark};line-height:1.75;white-space:pre-wrap;font-family:'Segoe UI',Arial,sans-serif;">
              ${inquiry.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>
          </div>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td align="center" style="padding:0 40px 36px;">
          <a href="mailto:${inquiry.email}?subject=Re: Your Inquiry — ${companyName}"
            style="display:inline-block;background:linear-gradient(135deg,${COLOR.brand},#2563eb);color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:13px 28px;border-radius:10px;font-family:'Segoe UI',Arial,sans-serif;">
            Reply to ${inquiry.name}
          </a>
        </td>
      </tr>
    </table>
  `;

  return shell(body, `New inquiry from ${inquiry.name} on ${companyName}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Template 2 — Auto-reply to submitter
// ─────────────────────────────────────────────────────────────────────────────

function autoReplyHtml(inquiry: InquiryPayload, companyName: string): string {
  const body = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${accentBar()}
      <tr>
        <td style="padding:36px 40px 28px;">
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${COLOR.dark};font-family:'Segoe UI',Arial,sans-serif;line-height:1.3;">
            Thank you, ${inquiry.name}!
          </h1>
          <p style="margin:0 0 20px;font-size:14px;color:${COLOR.muted};font-family:'Segoe UI',Arial,sans-serif;line-height:1.7;">
            We have successfully received your message and our team will review it shortly.
            You can expect a response within <strong style="color:${COLOR.dark};">1–2 business days</strong>.
          </p>

          <!-- What happens next -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background:#f8fafc;border:1px solid ${COLOR.border};border-radius:10px;margin-bottom:28px;">
            <tr>
              <td style="padding:20px 24px;">
                <p style="margin:0 0 14px;font-size:12px;font-weight:700;color:${COLOR.muted};text-transform:uppercase;letter-spacing:0.8px;font-family:'Segoe UI',Arial,sans-serif;">
                  What happens next?
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  ${[
                    ["01", "Our team reviews your inquiry"],
                    ["02", "A consultant is assigned to your case"],
                    ["03", "We reach out within 1–2 business days"],
                  ]
                    .map(
                      ([num, text]) => `
                  <tr>
                    <td style="padding:7px 0;vertical-align:middle;width:32px;">
                      <div style="background:linear-gradient(135deg,${COLOR.brand},#2563eb);color:#fff;font-size:10px;font-weight:800;border-radius:50%;width:24px;height:24px;line-height:24px;text-align:center;font-family:'Segoe UI',Arial,sans-serif;">
                        ${num}
                      </div>
                    </td>
                    <td style="padding:7px 0 7px 10px;font-size:13px;color:${COLOR.dark};font-family:'Segoe UI',Arial,sans-serif;">
                      ${text}
                    </td>
                  </tr>`
                    )
                    .join("")}
                </table>
              </td>
            </tr>
          </table>

          <!-- Echo: message sent -->
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:${COLOR.muted};text-transform:uppercase;letter-spacing:0.8px;font-family:'Segoe UI',Arial,sans-serif;">
            Your message
          </p>
          <div style="background:#f8fafc;border-left:4px solid ${COLOR.brand};border-radius:6px;padding:16px 20px;margin-bottom:28px;">
            <p style="margin:0;font-size:13px;color:${COLOR.dark};line-height:1.75;white-space:pre-wrap;font-family:'Segoe UI',Arial,sans-serif;">
              ${inquiry.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>
          </div>

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid ${COLOR.border};margin:0 0 20px;" />

          <p style="margin:0;font-size:13px;color:${COLOR.muted};font-family:'Segoe UI',Arial,sans-serif;line-height:1.6;">
            If you have any urgent questions, feel free to reach us directly at
            <a href="mailto:${process.env.SMTP_FROM_EMAIL || ""}" style="color:${COLOR.brand};text-decoration:none;">
              ${process.env.SMTP_FROM_EMAIL || "our office email"}
            </a>.
          </p>
        </td>
      </tr>
    </table>
  `;

  return shell(body, `We received your message — ${companyName}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export type InquiryPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
};

/**
 * Sends:
 *  1. A styled admin notification email (to SMTP_FROM_EMAIL)
 *  2. A styled auto-reply confirmation (to the submitter)
 *
 * Both are fire-and-forget safe — if SMTP is not configured they log a
 * warning and return silently without throwing.
 */
export async function notifyNewInquiry(inquiry: InquiryPayload): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn(
      "[mailer] SMTP not configured (SMTP_HOST / SMTP_USERNAME / SMTP_PASSWORD are empty). " +
        "Fill in .env.local to enable email notifications."
    );
    return;
  }

  const sender      = getSender();
  const companyName = sender.name;

  if (!sender.email) {
    console.warn("[mailer] SMTP_FROM_EMAIL is not set. Skipping email send.");
    return;
  }

  const results = await Promise.allSettled([
    // 1 — Admin notification
    transporter.sendMail({
      from:    sender.from,
      to:      sender.email,
      replyTo: inquiry.email,
      subject: `New Inquiry from ${inquiry.name}${inquiry.subject ? ` — ${inquiry.subject}` : ""}`,
      html:    adminNotificationHtml(inquiry, companyName),
      attachments: [logoAttachment()],
    }),
    // 2 — Auto-reply to submitter
    transporter.sendMail({
      from:    sender.from,
      to:      inquiry.email,
      subject: `We received your message — ${companyName}`,
      html:    autoReplyHtml(inquiry, companyName),
      attachments: [logoAttachment()],
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[mailer] Email ${i === 0 ? "admin notification" : "auto-reply"} failed:`, r.reason);
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Template 3 — Bulk client announcement / update email
// ─────────────────────────────────────────────────────────────────────────────

function bulkClientHtml(recipientName: string, subject: string, message: string, companyName: string): string {
  const safeMessage = message
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  const body = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${accentBar()}
      <tr>
        <td style="padding:36px 40px 28px;">
          <h1 style="margin:0 0 16px;font-size:20px;font-weight:800;color:${COLOR.dark};font-family:'Segoe UI',Arial,sans-serif;line-height:1.3;">
            ${subject.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </h1>
          <p style="margin:0 0 20px;font-size:14px;color:${COLOR.muted};font-family:'Segoe UI',Arial,sans-serif;line-height:1.6;">
            Dear ${recipientName},
          </p>
          <div style="font-size:14px;color:${COLOR.dark};line-height:1.75;font-family:'Segoe UI',Arial,sans-serif;">
            ${safeMessage}
          </div>
          <hr style="border:none;border-top:1px solid ${COLOR.border};margin:28px 0 20px;" />
          <p style="margin:0;font-size:13px;color:${COLOR.muted};font-family:'Segoe UI',Arial,sans-serif;line-height:1.6;">
            Regards,<br/>
            <strong style="color:${COLOR.dark};">${companyName}</strong>
          </p>
        </td>
      </tr>
    </table>
  `;

  return shell(body, subject);
}

/**
 * Sends the same branded message to a batch of clients, one email per
 * recipient (never a shared To/CC list — keeps each client's address
 * private from the others). Returns which sends succeeded/failed so the
 * caller can report a precise summary back to the admin.
 */
export async function sendBulkClientEmail(
  recipients: { name: string; email: string }[],
  subject: string,
  message: string
): Promise<{ sent: string[]; failed: { name: string; email?: string; reason: string }[] }> {
  const transporter = createTransporter();
  const sender = getSender();
  const companyName = sender.name;

  if (!transporter || !sender.email) {
    return {
      sent: [],
      failed: recipients.map((r) => ({
        name: r.name,
        email: r.email,
        reason: "SMTP is not configured on the server (fill in SMTP_* values in .env.local).",
      })),
    };
  }

  const sent: string[] = [];
  const failed: { name: string; email?: string; reason: string }[] = [];

  // Sent sequentially (not Promise.all) to stay well under most SMTP
  // providers' per-second rate limits when the client list is large.
  for (const r of recipients) {
    if (!r.email) {
      failed.push({ name: r.name, reason: "No contact email on file." });
      continue;
    }
    try {
      await transporter.sendMail({
        from: sender.from,
        to: r.email,
        subject,
        html: bulkClientHtml(r.name, subject, message, companyName),
        attachments: [logoAttachment()],
      });
      sent.push(r.email);
    } catch (err) {
      failed.push({ name: r.name, email: r.email, reason: err instanceof Error ? err.message : String(err) });
    }
  }

  return { sent, failed };
}
