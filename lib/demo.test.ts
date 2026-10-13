import { describe, expect, it } from "vitest";
import { demoPrice, makeDemoPlant } from "./demo";
import { stageFor } from "./growth";

describe("demoPrice", () => {
  it("starts at the buy price and ends at 2×", () => {
    expect(demoPrice(80_000, 0)).toBe(80_000);
    expect(demoPrice(80_000, 1)).toBe(160_000);
  });

  it("clamps progress outside 0..1", () => {
    expect(demoPrice(100, -1)).toBe(100);
    expect(demoPrice(100, 5)).toBe(200);
  });

  it("passes through every growth stage in order", () => {
    const seen: number[] = [];
    for (let i = 0; i <= 100; i++) {
      const stage = stageFor(100, demoPrice(100, i / 100));
      if (seen.at(-1) !== stage) seen.push(stage);
    }
    expect(seen).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("makeDemoPlant", () => {
  it("keeps the slot of an existing demo plant when replaying", () => {
    const first = makeDemoPlant(100, false);
    const replay = makeDemoPlant(120, false, first);
    expect(replay.id).toBe(first.id);
    expect(replay.createdAt).toBe(first.createdAt);
    expect(replay.demoComplete).toBe(false);
  });
});
