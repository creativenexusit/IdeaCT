import { describe, it, expect } from "vitest";
import { rateLimit } from "./rateLimit";

describe("rateLimit", () => {
  it("allows requests up to the limit", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      const result = rateLimit(key, { limit: 5, windowMs: 60_000 });
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks the request once the limit is exceeded within the window", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      rateLimit(key, { limit: 5, windowMs: 60_000 });
    }
    const sixth = rateLimit(key, { limit: 5, windowMs: 60_000 });
    expect(sixth.allowed).toBe(false);
  });

  it("resets the count after the window elapses", async () => {
    const key = `test-${Math.random()}`;
    rateLimit(key, { limit: 1, windowMs: 50 });
    const blocked = rateLimit(key, { limit: 1, windowMs: 50 });
    expect(blocked.allowed).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 60));

    const afterWindow = rateLimit(key, { limit: 1, windowMs: 50 });
    expect(afterWindow.allowed).toBe(true);
  });

  it("tracks separate keys independently", () => {
    const keyA = `a-${Math.random()}`;
    const keyB = `b-${Math.random()}`;
    rateLimit(keyA, { limit: 1, windowMs: 60_000 });
    const resultB = rateLimit(keyB, { limit: 1, windowMs: 60_000 });
    expect(resultB.allowed).toBe(true);
  });
});
