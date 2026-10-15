import type { Plant } from "./types";

export type Plots = { demo: Plant[]; growing: Plant[]; harvested: Plant[] };

/** Sorts every plant into the plot it lives in: the demo plot, the growing plot, or the harvest plot. */
export function splitGarden(plants: Plant[]): Plots {
  const plots: Plots = { demo: [], growing: [], harvested: [] };
  for (const p of plants) {
    if (p.isDemo) plots.demo.push(p);
    else if (p.harvestedAt) plots.harvested.push(p);
    else plots.growing.push(p);
  }
  // The harvest plot fills in the order flowers were picked.
  plots.harvested.sort((a, b) => a.harvestedAt!.localeCompare(b.harvestedAt!));
  return plots;
}
