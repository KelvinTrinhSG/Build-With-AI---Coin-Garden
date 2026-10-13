import { describe, expect, it } from "vitest";
import { BUILT_IN_LESSONS, lessonFor } from "./lessons";
import type { Plant } from "./types";

const base: Plant = {
  id: "abc",
  coinId: "bitcoin",
  symbol: "BTC",
  name: "Bitcoin",
  buyPrice: 1,
  amount: 1,
  date: "2026-01-01",
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("lessonFor", () => {
  it("uses the plant's own lesson first", () => {
    expect(lessonFor({ ...base, lesson: "  Hold on.  " })).toEqual({ text: "Hold on." });
  });

  it("falls back to a built-in lesson when there is none", () => {
    expect(BUILT_IN_LESSONS).toContainEqual(lessonFor(base));
    expect(BUILT_IN_LESSONS).toContainEqual(lessonFor({ ...base, lesson: "   " }));
  });

  it("is stable for the same plant", () => {
    expect(lessonFor(base)).toBe(lessonFor({ ...base }));
  });

  it("always gives the demo plant a built-in lesson", () => {
    expect(BUILT_IN_LESSONS).toContainEqual(lessonFor({ ...base, isDemo: true, lesson: "mine" }));
  });
});
