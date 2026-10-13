"use client";

import { useEffect } from "react";
import NewEntryPage from "./NewEntryPage";
import type { NewPlant } from "@/lib/types";
import styles from "./notebook.module.css";

type Props = {
  onClose: () => void;
  onPlant: (entry: NewPlant) => void;
};

export default function Notebook({ onClose, onPlant }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.scrim} onClick={onClose}>
      <section
        className={styles.book}
        role="dialog"
        aria-modal="true"
        aria-label="Notebook"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close the notebook">
          ✕
        </button>
        <NewEntryPage onPlant={onPlant} />
      </section>
    </div>
  );
}
