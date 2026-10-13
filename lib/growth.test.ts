import { describe, expect, it } from "vitest";
import { gainPercent, stageFor } from "./growth";

describe("stageFor", () => {
  it.each([
    [0.5, 0], // a loss stays a seed
    [1, 0],
    [1.24, 0],
    [1.25, 1],
    [1.49, 1],
    [1.5, 2],
    [1.75, 3],
    [1.99, 3],
    [2, 4],
    [10, 4],
  ])("ratio %d → stage %d", (ratio, stage) => {
    expect(stageFor(100, 100 * ratio)).toBe(stage);
  });

  it("stays a seed when the price is missing", () => {
    expect(stageFor(100, undefined)).toBe(0);
    expect(stageFor(100, null)).toBe(0);
    expect(stageFor(100, NaN)).toBe(0);
  });

  it("stays a seed for an invalid buy price", () => {
    expect(stageFor(0, 500)).toBe(0);
  });
});

describe("gainPercent", () => {
  it("reports gain over the buy price", () => {
    expect(gainPercent(100, 150)).toBeCloseTo(50);
    expect(gainPercent(100, 80)).toBeCloseTo(-20);
  });
});
