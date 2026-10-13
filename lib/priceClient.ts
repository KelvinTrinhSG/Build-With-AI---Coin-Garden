import type { CoinMatch } from "./types";

// Browser-side calls. The browser only ever talks to our own /api routes.

export async function fetchPrices(ids: string[], signal?: AbortSignal): Promise<Record<string, number> | null> {
  if (ids.length === 0) return {};
  try {
    const res = await fetch(`/api/prices?ids=${encodeURIComponent(ids.join(","))}`, { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { prices?: Record<string, number> };
    return data.prices ?? {};
  } catch {
    return null;
  }
}

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
