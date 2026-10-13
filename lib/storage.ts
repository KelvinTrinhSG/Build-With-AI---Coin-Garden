import type { GardenSave, Plant } from "./types";

export const STORAGE_KEY = "coin-garden:v1";

function isPlant(value: unknown): value is Plant {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.coinId === "string" &&
    typeof p.symbol === "string" &&
    typeof p.name === "string" &&
    typeof p.buyPrice === "number" &&
    p.buyPrice > 0 &&
    typeof p.amount === "number" &&
    typeof p.date === "string" &&
    typeof p.createdAt === "string"
  );
}

/** Parses saved data defensively: anything unreadable becomes an empty garden, never a crash. */
export function parseGarden(raw: string | null): Plant[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as Partial<GardenSave>;
    if (data?.version !== 1 || !Array.isArray(data.plants)) {
      console.warn("Coin Garden: unrecognised saved data, starting with an empty garden.");
      return [];
    }
    return data.plants.filter(isPlant);
  } catch {
    console.warn("Coin Garden: saved data is corrupt, starting with an empty garden.");
    return [];
  }
}

export function serializeGarden(plants: Plant[]): string {
  const save: GardenSave = { version: 1, plants };
  return JSON.stringify(save);
}

// localStorage only exists in the browser, so these must run after the page has mounted.
export function loadGarden(): Plant[] {
  try {
    return parseGarden(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveGarden(plants: Plant[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, serializeGarden(plants));
  } catch {
    console.warn("Coin Garden: couldn't save the garden in this browser.");
  }
}
