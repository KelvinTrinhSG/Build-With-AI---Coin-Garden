"use client";

import { useCallback, useState } from "react";
import TopBar from "./TopBar";
import DemoButton from "./DemoButton";
import GardenScene from "./garden/GardenScene";
import Notebook from "./notebook/Notebook";
import { useGarden } from "@/hooks/useGarden";
import { useDemo } from "@/hooks/useDemo";
import { stageFor } from "@/lib/growth";
import type { Plant, Stage } from "@/lib/types";
import styles from "./CoinGardenApp.module.css";

export default function CoinGardenApp() {
  const garden = useGarden();
  const demo = useDemo({ plants: garden.plants, setPlants: garden.setPlants, knownBtcPrice: garden.prices.bitcoin });
  const [notebookOpen, setNotebookOpen] = useState(false);

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

  return (
    <div className={styles.app}>
      <TopBar onOpenNotebook={() => setNotebookOpen(true)} />
      <main className={styles.stage}>
        <GardenScene plants={garden.plants} stageOf={stageOf} priceMissing={priceMissing} />
        <DemoButton onClick={demo.run} running={demo.running} />
      </main>
      {notebookOpen && (
        <Notebook
          onClose={() => setNotebookOpen(false)}
          onPlant={(entry) => {
            garden.addPlant(entry);
            setNotebookOpen(false);
          }}
        />
      )}
    </div>
  );
}
