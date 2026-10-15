"use client";

import { useEffect } from "react";
import GuidePage from "./GuidePage";
import PreviewPage from "./PreviewPage";
import SeedTable from "./SeedTable";
import PlantPage from "./PlantPage";
import type { NewPlant, Plant, Stage } from "@/lib/types";
import styles from "./notebook.module.css";

export type NotebookPage = { kind: "guide" } | { kind: "preview" } | { kind: "new" } | { kind: "plant"; id: string };

type Props = {
  page: NotebookPage;
  onNavigate: (page: NotebookPage) => void;
  onClose: () => void;
  onPlant: (entry: NewPlant) => void;
  plant?: Plant;
  plantStage?: Stage;
  plantPrice?: number;
  plantPriceMissing?: boolean;
  onHarvest: (id: string) => void;
  // The seed table edits every real plant in place.
  plants: Plant[];
  stageOf: (plant: Plant) => Stage;
  priceMissing: (plant: Plant) => boolean;
  onUpdate: (id: string, patch: Partial<NewPlant>) => void;
  onRemove: (id: string) => void;
};

const TABS: { kind: "guide" | "preview" | "new"; label: string }[] = [
  { kind: "guide", label: "How it grows" },
  { kind: "preview", label: "What it becomes" },
  { kind: "new", label: "Seed table" },
];

export default function Notebook(props: Props) {
  const { page, onNavigate, onClose } = props;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.scrim} onClick={onClose}>
      <section
        className={`${styles.book} ${page.kind === "new" ? styles.bookWide : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Notebook"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close the notebook">
          ✕
        </button>

        <nav className={styles.tabs} aria-label="Notebook pages">
          {TABS.map((t) => (
            <button
              key={t.kind}
              type="button"
              className={styles.tab}
              aria-current={page.kind === t.kind ? "page" : undefined}
              onClick={() => onNavigate({ kind: t.kind })}
            >
              {t.label}
            </button>
          ))}
          {page.kind === "plant" && props.plant && (
            <span className={styles.tab} aria-current="page">
              {props.plant.symbol}
            </span>
          )}
        </nav>

        {page.kind === "guide" && <GuidePage />}
        {page.kind === "preview" && <PreviewPage />}
        {page.kind === "new" && (
          <SeedTable
            plants={props.plants}
            stageOf={props.stageOf}
            priceMissing={props.priceMissing}
            onPlant={props.onPlant}
            onUpdate={props.onUpdate}
            onRemove={props.onRemove}
            onOpenPlant={(p) => onNavigate({ kind: "plant", id: p.id })}
          />
        )}
        {page.kind === "plant" && props.plant && (
          <PlantPage
            key={props.plant.id}
            plant={props.plant}
            stage={props.plantStage ?? 0}
            currentPrice={props.plantPrice}
            priceMissing={!!props.plantPriceMissing}
            onHarvest={() => props.onHarvest(props.plant!.id)}
          />
        )}
      </section>
    </div>
  );
}
