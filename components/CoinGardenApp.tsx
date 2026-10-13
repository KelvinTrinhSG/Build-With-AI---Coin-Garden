"use client";

import { useCallback, useState } from "react";
import TopBar from "./TopBar";
import DemoButton from "./DemoButton";
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

  const openPlantPage = (plant: Plant) => {
    setSelectedId(null);
    setNotebookPage({ kind: "plant", id: plant.id });
  };

  // A sunflower shows its lesson first; any other plant opens its notebook page.
  const selectPlant = (plant: Plant) => {
    if (stageOf(plant) === 4) setSelectedId((id) => (id === plant.id ? null : plant.id));
    else openPlantPage(plant);
  };

  const pagePlant = notebookPage?.kind === "plant" ? garden.plants.find((p) => p.id === notebookPage.id) : undefined;

  return (
    <div className={styles.app}>
      <TopBar onOpenNotebook={() => setNotebookPage({ kind: "guide" })} />
      <main className={styles.stage}>
        <GardenScene
          plants={garden.plants}
          stageOf={stageOf}
          priceMissing={priceMissing}
          selectedId={selectedId}
          lessonFor={lessonFor}
          onSelectPlant={selectPlant}
          onOpenPage={openPlantPage}
          onBackgroundClick={() => setSelectedId(null)}
        />
        <DemoButton onClick={demo.run} running={demo.running} />
      </main>
      {notebookPage && (
        <Notebook
          page={notebookPage}
          onNavigate={setNotebookPage}
          onClose={() => setNotebookPage(null)}
          onPlant={(entry) => {
            garden.addPlant(entry);
            setNotebookPage(null);
          }}
          plant={pagePlant}
          plantStage={pagePlant && stageOf(pagePlant)}
          plantPrice={pagePlant && garden.priceOf(pagePlant)}
          plantPriceMissing={pagePlant && priceMissing(pagePlant)}
          onLessonChange={garden.updateLesson}
        />
      )}
    </div>
  );
}
