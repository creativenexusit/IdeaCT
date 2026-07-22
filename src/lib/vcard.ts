type VCardInput = {
  fullName: string;
  designation?: string;
  email?: string;
  phone?: string;
  officeLocation?: string;
  /** Organization name — pass the company name from settings at call site */
  companyName?: string;
};

/**
 * Builds vCard 3.0 text. Organization name is passed as a parameter
 * so the caller can resolve it from settings/database at runtime.
 */
export function buildVCard(member: VCardInput, companyName = "IdeaCT"): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${member.fullName}`,
    `ORG:${companyName}`,
  ];
  if (member.designation) lines.push(`TITLE:${member.designation}`);
  if (member.email) lines.push(`EMAIL;TYPE=INTERNET:${member.email}`);
  if (member.phone) lines.push(`TEL;TYPE=WORK,VOICE:${member.phone}`);
  if (member.officeLocation) lines.push(`ADR;TYPE=WORK:;;${member.officeLocation}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}
