import type { Plant } from "./types";

export const DEMO_ID = "demo-btc";
export const DEMO_DURATION_MS = 10_000;
// Used only when the real BTC price can't be fetched, and labelled as a sample in the UI.
export const DEMO_SAMPLE_BUY_PRICE = 60_000;

/** Simulated price at progress t (0 → 1): rises from the buy price to 2× the buy price. */
export function demoPrice(buyPrice: number, t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return buyPrice * (1 + clamped);
}

export function makeDemoPlant(buyPrice: number, isSample: boolean, existing?: Plant): Plant {
  const now = new Date();
  return {
    id: DEMO_ID,
    coinId: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin (Demo)",
    buyPrice,
    amount: 1,
    date: now.toISOString().slice(0, 10),
    isDemo: true,
    demoComplete: false,
    demoSamplePrice: isSample,
    // Keep the original slot when replaying.
    createdAt: existing?.createdAt ?? now.toISOString(),
  };
}
