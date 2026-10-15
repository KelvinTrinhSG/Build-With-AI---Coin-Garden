"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPrices } from "@/lib/priceClient";
import { stageFor } from "@/lib/growth";
import { pickQuoteId } from "@/lib/lessons";
import { loadGarden, saveGarden } from "@/lib/storage";
import type { NewPlant, Plant, Stage } from "@/lib/types";

export type PriceStatus = "idle" | "loading" | "ok" | "error";

export function useGarden() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [priceStatus, setPriceStatus] = useState<PriceStatus>("idle");

  // The server renders before it can know what's in this browser's localStorage,
  // so the garden is read only after mount. Reading it during render would make the
  // browser's first render differ from the server HTML (a hydration mismatch).
  useEffect(() => {
    // A demo interrupted by a reload is shown finished rather than stuck as a seed.
    const saved = loadGarden().map((p) => (p.isDemo && !p.demoComplete ? { ...p, demoComplete: true } : p));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser-only storage after mount
    setPlants(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveGarden(plants);
  }, [plants, loaded]);

  // Unique coins still growing, as a stable string so the effect only reruns when it changes.
  // Harvested flowers are frozen, so they don't need today's price.
  const coinKey = useMemo(
    () => [...new Set(plants.filter((p) => !p.isDemo && !p.harvestedAt).map((p) => p.coinId))].sort().join(","),
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

  // Edits from the seed table: any of the recorded purchase fields, applied straight to the garden.
  const updatePlant = useCallback((id: string, patch: Partial<NewPlant>) => {
    setPlants((prev) => prev.map((p) => (p.id === id && !p.isDemo ? { ...p, ...patch } : p)));
  }, []);

  const removePlant = useCallback((id: string) => {
    setPlants((prev) => prev.filter((p) => p.id !== id || p.isDemo));
  }, []);

  // Only a sunflower (x2 or more at today's price) can be harvested. The price that day is kept with it,
  // and the flower receives its lesson: a random quote from the register that no other flower holds yet.
  const harvest = useCallback(
    (id: string) => {
      setPlants((prev) => {
        const target = prev.find((p) => p.id === id);
        if (!target || target.isDemo || target.harvestedAt) return prev;
        const price = prices[target.coinId];
        if (stageFor(target.buyPrice, price) !== 4) return prev;
        const quoteId = pickQuoteId(prev.flatMap((p) => (p.quoteId ? [p.quoteId] : [])));
        return prev.map((p) =>
          p.id === id ? { ...p, harvestedAt: new Date().toISOString(), harvestPrice: price, quoteId } : p,
        );
      });
    },
    [prices],
  );

  const priceOf = useCallback((plant: Plant): number | undefined => prices[plant.coinId], [prices]);

  const stageOf = useCallback(
    (plant: Plant): Stage => (plant.harvestedAt ? 4 : stageFor(plant.buyPrice, prices[plant.coinId])),
    [prices],
  );

  // Only flag a missing price once a lookup has finished; while loading the plant just waits.
  const priceMissing = useCallback(
    (plant: Plant) =>
      !plant.harvestedAt &&
      (priceStatus === "ok" || priceStatus === "error") &&
      prices[plant.coinId] === undefined,
    [priceStatus, prices],
  );

  return {
    plants,
    setPlants,
    loaded,
    prices,
    priceStatus,
    addPlant,
    updatePlant,
    removePlant,
    harvest,
    priceOf,
    stageOf,
    priceMissing,
  };
}
