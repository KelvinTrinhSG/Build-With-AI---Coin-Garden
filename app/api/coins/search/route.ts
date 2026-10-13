import type { NextRequest } from "next/server";
import { searchCoins } from "@/lib/coingecko";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return Response.json({ coins: [] });

  try {
    const coins = await searchCoins(q.toLowerCase());
    return Response.json({ coins });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Couldn't reach the coin list" }, { status: 502 });
  }
}
