import { describe, it, expect } from "vitest";
import { buildVCard } from "./vcard";
import { mockSettings } from "./content";

describe("buildVCard", () => {
  it("includes the current company name from settings, not a hardcoded value", () => {
    const vcard = buildVCard({ fullName: "Jane Doe" }, mockSettings.companyName);
    expect(vcard).toContain(`ORG:${mockSettings.companyName}`);
  });

  it("includes required vCard structure", () => {
    const vcard = buildVCard({ fullName: "Jane Doe" });
    expect(vcard).toContain("BEGIN:VCARD");
    expect(vcard).toContain("VERSION:3.0");
    expect(vcard).toContain("END:VCARD");
    expect(vcard).toContain("FN:Jane Doe");
  });

  it("omits optional fields that are not provided", () => {
    const vcard = buildVCard({ fullName: "Jane Doe" });
    expect(vcard).not.toContain("TEL;");
    expect(vcard).not.toContain("EMAIL;");
  });

  it("includes optional fields when provided", () => {
    const vcard = buildVCard({
      fullName: "Jane Doe",
      designation: "Consultant",
      email: "jane@example.com",
      phone: "+8801234567890",
      officeLocation: "Dhaka",
    });
    expect(vcard).toContain("TITLE:Consultant");
    expect(vcard).toContain("EMAIL;TYPE=INTERNET:jane@example.com");
    expect(vcard).toContain("TEL;TYPE=WORK,VOICE:+8801234567890");
    expect(vcard).toContain("ADR;TYPE=WORK:;;Dhaka");
  });
});
