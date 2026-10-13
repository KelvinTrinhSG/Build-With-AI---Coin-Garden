import type { CoinMatch } from "./types";

// Browser-side calls. The browser only ever talks to our own /api routes.

export async function searchCoins(query: string, signal?: AbortSignal): Promise<CoinMatch[] | null> {
  try {
    const res = await fetch(`/api/coins/search?q=${encodeURIComponent(query)}`, { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { coins?: CoinMatch[] };
    return data.coins ?? [];
  } catch {
    return null;
  }
}
