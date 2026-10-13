"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import GardenScene from "./garden/GardenScene";
import Notebook from "./notebook/Notebook";
import { useGarden } from "@/hooks/useGarden";
import styles from "./CoinGardenApp.module.css";

export default function CoinGardenApp() {
  const garden = useGarden();
  const [notebookOpen, setNotebookOpen] = useState(false);

  return (
    <div className={styles.app}>
      <TopBar onOpenNotebook={() => setNotebookOpen(true)} />
      <main className={styles.stage}>
        <GardenScene plants={garden.plants} stageOf={garden.stageOf} priceMissing={garden.priceMissing} />
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
