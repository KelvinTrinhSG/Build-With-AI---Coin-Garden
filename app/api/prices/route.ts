import type { NextRequest } from "next/server";
import { fetchPrices } from "@/lib/coingecko";

const MAX_IDS = 50;

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("ids") ?? "";
  // Sorted and de-duplicated so the same garden always hits the same cache entry.
  const ids = [...new Set(raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean))].sort().slice(0, MAX_IDS);
  if (ids.length === 0) return Response.json({ prices: {} });

  try {
    const prices = await fetchPrices(ids);
    return Response.json({ prices });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Couldn't reach the price feed" }, { status: 502 });
  }
}
