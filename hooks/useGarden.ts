"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPrices } from "@/lib/priceClient";
import { stageFor } from "@/lib/growth";
import type { NewPlant, Plant, Stage } from "@/lib/types";

export type PriceStatus = "idle" | "loading" | "ok" | "error";

export function useGarden() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [priceStatus, setPriceStatus] = useState<PriceStatus>("idle");

  // Unique real coins in the garden, as a stable string so the effect only reruns when it changes.
  const coinKey = useMemo(
    () => [...new Set(plants.filter((p) => !p.isDemo).map((p) => p.coinId))].sort().join(","),
    [plants],
  );

  useEffect(() => {
    if (!coinKey) return;
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- marks the start of an external fetch
    setPriceStatus("loading");
    fetchPrices(coinKey.split(","), controller.signal).then((result) => {
      if (controller.signal.aborted) return;
      if (result === null) {
        setPriceStatus("error");
      } else {
        setPrices((prev) => ({ ...prev, ...result }));
        setPriceStatus("ok");
      }
    });
    return () => controller.abort();
  }, [coinKey]);

  const addPlant = useCallback((entry: NewPlant) => {
    const plant: Plant = { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setPlants((prev) => [...prev, plant]);
  }, []);

  const priceOf = useCallback((plant: Plant): number | undefined => prices[plant.coinId], [prices]);

  const stageOf = useCallback((plant: Plant): Stage => stageFor(plant.buyPrice, prices[plant.coinId]), [prices]);

  // Only flag a missing price once a lookup has finished; while loading the plant just waits.
  const priceMissing = useCallback(
    (plant: Plant) =>
      (priceStatus === "ok" || priceStatus === "error") && prices[plant.coinId] === undefined,
    [priceStatus, prices],
  );

  return { plants, setPlants, prices, priceStatus, addPlant, priceOf, stageOf, priceMissing };
}
