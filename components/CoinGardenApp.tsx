"use client";

import { useCallback, useState } from "react";
import TopBar from "./TopBar";
import GardenScene from "./garden/GardenScene";
import Notebook, { type NotebookPage } from "./notebook/Notebook";
import { useGarden } from "@/hooks/useGarden";
import { useDemo } from "@/hooks/useDemo";
import { stageFor } from "@/lib/growth";
import { lessonFor } from "@/lib/lessons";
import type { Plant, Stage } from "@/lib/types";
import styles from "./CoinGardenApp.module.css";

export default function CoinGardenApp() {
  const garden = useGarden();
  const demo = useDemo({ plants: garden.plants, setPlants: garden.setPlants, knownBtcPrice: garden.prices.bitcoin });
  const [notebookPage, setNotebookPage] = useState<NotebookPage | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Real plants follow live prices; the demo plant follows the simulated price, then stays a sunflower.
  const stageOf = useCallback(
    (plant: Plant): Stage => {
      if (!plant.isDemo) return garden.stageOf(plant);
      if (plant.demoComplete) return 4;
      return stageFor(plant.buyPrice, demo.simulatedPrice);
    },
    [garden, demo.simulatedPrice],
  );
  const priceMissing = useCallback((plant: Plant) => !plant.isDemo && garden.priceMissing(plant), [garden]);
  const harvest = useCallback(
    (id: string) => {
      garden.harvest(id);
      setSelectedId(null);
    },
    [garden],
  );

  const openPlantPage = (plant: Plant) => {
    setSelectedId(null);
    setNotebookPage({ kind: "plant", id: plant.id });
  };

  // A flower that carries a lesson (harvested, or the demo) shows it first; any other plant opens its page.
  const selectPlant = (plant: Plant) => {
    if (stageOf(plant) === 4 && lessonFor(plant)) setSelectedId((id) => (id === plant.id ? null : plant.id));
    else openPlantPage(plant);
  };

  const pagePlant = notebookPage?.kind === "plant" ? garden.plants.find((p) => p.id === notebookPage.id) : undefined;
  // Until the saved garden has loaded, show the neutral plots only (no sign flash for returning visitors).
  // The demo lives in its own plot, so it doesn't count as a first seed.
  const isEmpty = garden.loaded && garden.plants.every((p) => p.isDemo);

  return (
    <div className={styles.app}>
      <TopBar onOpenNotebook={() => setNotebookPage({ kind: "guide" })} />
      <main className={styles.stage}>
        <GardenScene
          // First visit greets the new farmer; once a seed is planted the title cheers the farm on.
          // Nothing until the save has loaded, so returning visitors don't see the greeting flash.
          title={
            garden.loaded
              ? isEmpty
                ? { heading: "Welcome to your plot of land.", line: "Every coin you buy is a seed. Patience grows it." }
                : { heading: "Your farm is growing.", line: "Patience turns every seed into a sunflower." }
              : null
          }
          showSign={isEmpty}
          onPlantFirstSeed={() => setNotebookPage({ kind: "new" })}
          plants={garden.plants}
          stageOf={stageOf}
          priceMissing={priceMissing}
          selectedId={selectedId}
          lessonFor={lessonFor}
          onSelectPlant={selectPlant}
          onOpenPage={openPlantPage}
          onBackgroundClick={() => setSelectedId(null)}
          onRunDemo={demo.run}
          demoRunning={demo.running}
        />
      </main>
      {notebookPage && (
        <Notebook
          page={notebookPage}
          onNavigate={setNotebookPage}
          onClose={() => setNotebookPage(null)}
          // The seed table stays open so several purchases can be entered in a row.
          onPlant={garden.addPlant}
          plants={garden.plants.filter((p) => !p.isDemo)}
          stageOf={stageOf}
          priceMissing={priceMissing}
          onUpdate={garden.updatePlant}
          onRemove={garden.removePlant}
          plant={pagePlant}
          plantStage={pagePlant && stageOf(pagePlant)}
          plantPrice={pagePlant && garden.priceOf(pagePlant)}
          plantPriceMissing={pagePlant && priceMissing(pagePlant)}
          onHarvest={harvest}
        />
      )}
    </div>
  );
}
