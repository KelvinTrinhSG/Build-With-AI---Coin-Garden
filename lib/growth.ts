import type { Stage } from "./types";

// The one place that decides how grown a plant is. Garden, notebook guide and Demo all use it.
export const STAGES: { stage: Stage; minRatio: number; name: string; gainLabel: string }[] = [
  { stage: 0, minRatio: 0, name: "Seed", gainLabel: "Loss, or below +25%" },
  { stage: 1, minRatio: 1.25, name: "Sprout, 2 leaves", gainLabel: "+25%" },
  { stage: 2, minRatio: 1.5, name: "Young plant, 4 leaves", gainLabel: "+50%" },
  { stage: 3, minRatio: 1.75, name: "Bud", gainLabel: "+75%" },
  { stage: 4, minRatio: 2, name: "Golden sunflower", gainLabel: "x2" },
];

export function stageFor(buyPrice: number, currentPrice: number | undefined | null): Stage {
  if (currentPrice == null || !(buyPrice > 0) || !Number.isFinite(currentPrice)) return 0;
  const ratio = currentPrice / buyPrice;
  let stage: Stage = 0;
  for (const s of STAGES) if (ratio >= s.minRatio) stage = s.stage;
  return stage;
}

export function gainPercent(buyPrice: number, currentPrice: number): number {
  return (currentPrice / buyPrice - 1) * 100;
}
