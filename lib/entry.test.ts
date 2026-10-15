import { describe, expect, it } from "vitest";
import { parsePositive } from "./entry";

describe("parsePositive", () => {
  it("accepts numbers above 0", () => {
    expect(parsePositive("64000")).toBe(64000);
    expect(parsePositive("0.0005")).toBe(0.0005);
  });

  it("rejects empty, zero, negative and non-numbers", () => {
    expect(parsePositive("")).toBeNull();
    expect(parsePositive("  ")).toBeNull();
    expect(parsePositive("0")).toBeNull();
    expect(parsePositive("-3")).toBeNull();
    expect(parsePositive("abc")).toBeNull();
    expect(parsePositive("Infinity")).toBeNull();
  });
});
