import { describe, expect, it } from "vitest";
import { splitGarden } from "./garden";
import type { Plant } from "./types";

const plant = (id: string, extra: Partial<Plant> = {}): Plant => ({
  id,
  coinId: "bitcoin",
  symbol: "BTC",
  name: "Bitcoin",
  buyPrice: 100,
  amount: 1,
  date: "2026-01-01",
  createdAt: "2026-01-01T00:00:00.000Z",
  ...extra,
});

describe("splitGarden", () => {
  it("puts each plant in its own plot", () => {
    const plots = splitGarden([
      plant("a"),
      plant("demo", { isDemo: true }),
      plant("b", { harvestedAt: "2026-03-01T00:00:00.000Z" }),
      plant("c"),
    ]);
    expect(plots.growing.map((p) => p.id)).toEqual(["a", "c"]);
    expect(plots.demo.map((p) => p.id)).toEqual(["demo"]);
    expect(plots.harvested.map((p) => p.id)).toEqual(["b"]);
  });

  it("orders the harvest plot by harvest time", () => {
    const plots = splitGarden([
      plant("late", { harvestedAt: "2026-05-01T00:00:00.000Z" }),
      plant("early", { harvestedAt: "2026-02-01T00:00:00.000Z" }),
    ]);
    expect(plots.harvested.map((p) => p.id)).toEqual(["early", "late"]);
  });
});
