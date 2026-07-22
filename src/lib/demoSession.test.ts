import { describe, it, expect } from "vitest";
import { signDemoSession, verifyDemoSession } from "./demoSession";

describe("demo session tokens", () => {
  it("signs and verifies a valid token", async () => {
    const token = await signDemoSession({ email: "admin@ideact.com", exp: Date.now() + 10000 }, "test-secret");
    const payload = await verifyDemoSession(token, "test-secret");
    expect(payload?.email).toBe("admin@ideact.com");
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await signDemoSession({ email: "admin@ideact.com", exp: Date.now() + 10000 }, "secret-a");
    const payload = await verifyDemoSession(token, "secret-b");
    expect(payload).toBeNull();
  });

  it("rejects an expired token", async () => {
    const token = await signDemoSession({ email: "admin@ideact.com", exp: Date.now() - 1000 }, "test-secret");
    const payload = await verifyDemoSession(token, "test-secret");
    expect(payload).toBeNull();
  });

  it("rejects a tampered token", async () => {
    const token = await signDemoSession({ email: "admin@ideact.com", exp: Date.now() + 10000 }, "test-secret");
    const tampered = token.replace(/.$/, token.endsWith("a") ? "b" : "a");
    const payload = await verifyDemoSession(tampered, "test-secret");
    expect(payload).toBeNull();
  });

  it("rejects a malformed token", async () => {
    const payload = await verifyDemoSession("not-a-real-token", "test-secret");
    expect(payload).toBeNull();
  });
});
