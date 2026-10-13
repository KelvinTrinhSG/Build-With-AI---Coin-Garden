import "server-only";
import { cacheLife } from "next/cache";
import type { CoinMatch } from "./types";

const BASE = "https://api.coingecko.com/api/v3";
const MAX_MATCHES = 8;

function headers(): HeadersInit {
  const key = process.env.COINGECKO_API_KEY;
  return key ? { accept: "application/json", "x-cg-demo-api-key": key } : { accept: "application/json" };
}

type SearchResponse = {
  coins?: { id: string; name: string; symbol: string; thumb?: string; market_cap_rank: number | null }[];
};

// Cached per id list for about a minute. Coins CoinGecko doesn't know are simply absent.
export async function fetchPrices(ids: string[]): Promise<Record<string, number>> {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`${BASE}/simple/price?ids=${encodeURIComponent(ids.join(","))}&vs_currencies=usd`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`CoinGecko price lookup failed: ${res.status}`);
  const data = (await res.json()) as Record<string, { usd?: number }>;

  const prices: Record<string, number> = {};
  for (const id of ids) {
    const usd = data[id]?.usd;
    if (typeof usd === "number") prices[id] = usd;
  }
  return prices;
}

// Cached per query for about a minute and shared by every visitor.
// Throwing on failure keeps errors out of the cache.
export async function searchCoins(query: string): Promise<CoinMatch[]> {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`${BASE}/search?query=${encodeURIComponent(query)}`, { headers: headers() });
  if (!res.ok) throw new Error(`CoinGecko search failed: ${res.status}`);
  const data = (await res.json()) as SearchResponse;

  return (data.coins ?? [])
    .slice()
    .sort((a, b) => (a.market_cap_rank ?? Infinity) - (b.market_cap_rank ?? Infinity))
    .slice(0, MAX_MATCHES)
    .map(({ id, name, symbol, thumb }) => ({ id, name, symbol: symbol.toUpperCase(), thumb }));
}
