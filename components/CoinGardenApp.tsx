"use client";

import { useCallback, useState } from "react";
import TopBar from "./TopBar";
import GardenScene from "./garden/GardenScene";
import Notebook from "./notebook/Notebook";
import type { NewPlant, Plant } from "@/lib/types";
import styles from "./CoinGardenApp.module.css";

export default function CoinGardenApp() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [notebookOpen, setNotebookOpen] = useState(false);

  const addPlant = useCallback((entry: NewPlant) => {
    const plant: Plant = { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setPlants((prev) => [...prev, plant]);
  }, []);

  return (
    <div className={styles.app}>
      <TopBar onOpenNotebook={() => setNotebookOpen(true)} />
      <main className={styles.stage}>
        <GardenScene plants={plants} />
      </main>
      {notebookOpen && (
        <Notebook
          onClose={() => setNotebookOpen(false)}
          onPlant={(entry) => {
            addPlant(entry);
            setNotebookOpen(false);
          }}
        />
      )}
    </div>
  );
}
