import { describe, expect, it, vi } from "vitest";
import { parseGarden, serializeGarden } from "./storage";
import type { Plant } from "./types";

const plant: Plant = {
  id: "p1",
  coinId: "bitcoin",
  symbol: "BTC",
  name: "Bitcoin",
  buyPrice: 50_000,
  amount: 0.1,
  date: "2026-01-02",
  lesson: "Wait.",
  createdAt: "2026-01-02T00:00:00.000Z",
};

describe("garden storage", () => {
  it("round-trips plants", () => {
    expect(parseGarden(serializeGarden([plant]))).toEqual([plant]);
  });

  it("treats nothing saved as an empty garden", () => {
    expect(parseGarden(null)).toEqual([]);
  });

  it("survives corrupt JSON", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(parseGarden("{not json")).toEqual([]);
    warn.mockRestore();
  });

  it("ignores an unknown version", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(parseGarden(JSON.stringify({ version: 2, plants: [plant] }))).toEqual([]);
    warn.mockRestore();
  });

  it("drops malformed plants but keeps good ones", () => {
    const raw = JSON.stringify({ version: 1, plants: [plant, { id: "bad" }, { ...plant, id: "p2", buyPrice: 0 }] });
    expect(parseGarden(raw)).toEqual([plant]);
  });
});
