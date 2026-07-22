import { describe, it, expect } from "vitest";
import { passwordPolicy } from "./collections";

describe("passwordPolicy (Phase 10: 8+ chars, upper, lower, number, special)", () => {
  it("accepts a compliant password", () => {
    expect(passwordPolicy.test("Str0ng!Pass")).toBe(true);
  });

  it("rejects a password under 8 characters", () => {
    expect(passwordPolicy.test("Sh0rt!")).toBe(false);
  });

  it("rejects a password with no uppercase letter", () => {
    expect(passwordPolicy.test("weak123!pass")).toBe(false);
  });

  it("rejects a password with no lowercase letter", () => {
    expect(passwordPolicy.test("WEAK123!PASS")).toBe(false);
  });

  it("rejects a password with no number", () => {
    expect(passwordPolicy.test("NoNumber!Pass")).toBe(false);
  });

  it("rejects a password with no special character", () => {
    expect(passwordPolicy.test("NoSpecial123")).toBe(false);
  });
});
