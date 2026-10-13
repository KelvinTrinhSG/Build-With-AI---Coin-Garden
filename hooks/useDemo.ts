"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { fetchPrices } from "@/lib/priceClient";
import { DEMO_DURATION_MS, DEMO_ID, DEMO_SAMPLE_BUY_PRICE, demoPrice, makeDemoPlant } from "@/lib/demo";
import type { Plant } from "@/lib/types";

type Options = {
  plants: Plant[];
  setPlants: Dispatch<SetStateAction<Plant[]>>;
  knownBtcPrice?: number;
};

/** Plants (or replays) the single BTC demo plant and animates a simulated price to 2× over 10 seconds. */
export function useDemo({ plants, setPlants, knownBtcPrice }: Options) {
  const [simulatedPrice, setSimulatedPrice] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
  }, []);

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);

    let buyPrice = knownBtcPrice;
    if (buyPrice === undefined) buyPrice = (await fetchPrices(["bitcoin"]))?.bitcoin;
    const isSample = buyPrice === undefined;
    const buy = buyPrice ?? DEMO_SAMPLE_BUY_PRICE;

    const existing = plants.find((p) => p.id === DEMO_ID);
    const demo = makeDemoPlant(buy, isSample, existing);
    // Only the demo plant is touched; real plants are left exactly as they are.
    setPlants((prev) => (existing ? prev.map((p) => (p.id === DEMO_ID ? demo : p)) : [...prev, demo]));
    setSimulatedPrice(buy);

    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / DEMO_DURATION_MS;
      setSimulatedPrice(demoPrice(buy, t));
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      frame.current = null;
      setPlants((prev) => prev.map((p) => (p.id === DEMO_ID ? { ...p, demoComplete: true } : p)));
      setSimulatedPrice(null);
      setRunning(false);
    };
    frame.current = requestAnimationFrame(tick);
  }, [running, knownBtcPrice, plants, setPlants]);

  return { run, running, simulatedPrice };
}
