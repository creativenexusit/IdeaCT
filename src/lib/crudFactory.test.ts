import { describe, it, expect } from "vitest";
import { buildSort } from "./crudFactory";

describe("buildSort (Section 3: sorting options)", () => {
  it("defaults to newest first when no sort param is given", () => {
    expect(buildSort(null)).toEqual({ createdAt: -1 });
  });

  it("sorts oldest first", () => {
    expect(buildSort("oldest")).toEqual({ createdAt: 1 });
  });

  it("sorts newest first explicitly", () => {
    expect(buildSort("newest")).toEqual({ createdAt: -1 });
  });

  it("falls back to newest for an unrecognized sort value", () => {
    expect(buildSort("banana")).toEqual({ createdAt: -1 });
  });
});
