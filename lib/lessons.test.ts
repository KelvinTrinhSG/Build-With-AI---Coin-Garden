import { describe, expect, it } from "vitest";
import { lessonFor, pickQuoteId } from "./lessons";
import { QUOTES } from "./quotes";
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
const harvested: Plant = { ...base, harvestedAt: "2026-05-01T00:00:00.000Z" };
const texts = QUOTES.map((q) => q.text);

describe("the quote register", () => {
  it("holds 100 quotes with unique ids, an author and a source", () => {
    expect(QUOTES).toHaveLength(100);
    expect(new Set(QUOTES.map((q) => q.id)).size).toBe(100);
    for (const q of QUOTES) {
      expect(q.text.trim()).not.toBe("");
      expect(q.author.trim()).not.toBe("");
      expect(q.source.trim()).not.toBe("");
    }
  });
});

describe("lessonFor", () => {
  it("gives a growing plant no lesson yet", () => {
    expect(lessonFor(base)).toBeNull();
    expect(lessonFor({ ...base, lesson: "old note" })).toBeNull();
  });

  it("shows the quote a flower received at harvest", () => {
    const q = QUOTES[41];
    expect(lessonFor({ ...harvested, quoteId: q.id })).toEqual({ text: q.text, author: q.author, source: q.source });
  });

  it("keeps a lesson written before quotes existed", () => {
    expect(lessonFor({ ...harvested, lesson: "  Hold on.  " })).toEqual({ text: "Hold on." });
  });

  it("falls back to a steady quote for older harvests and the demo", () => {
    expect(texts).toContain(lessonFor(harvested)?.text);
    expect(lessonFor(harvested)).toEqual(lessonFor({ ...harvested }));
    expect(texts).toContain(lessonFor({ ...base, isDemo: true, lesson: "mine" })?.text);
  });
});

describe("pickQuoteId", () => {
  it("picks from the register", () => {
    expect(QUOTES.map((q) => q.id)).toContain(pickQuoteId([]));
  });

  it("prefers quotes no other flower has", () => {
    const used = QUOTES.slice(0, 99).map((q) => q.id);
    expect(pickQuoteId(used, () => 0.5)).toBe(QUOTES[99].id);
  });

  it("starts over once every quote has been used", () => {
    const all = QUOTES.map((q) => q.id);
    expect(pickQuoteId(all, () => 0)).toBe(QUOTES[0].id);
    expect(pickQuoteId(all, () => 0.999999)).toBe(QUOTES[99].id);
  });
});
