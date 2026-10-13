"use client";

import { useState } from "react";
import { STAGES, gainPercent } from "@/lib/growth";
import type { Plant, Stage } from "@/lib/types";
import PlantIcon from "./PlantIcon";
import styles from "./notebook.module.css";

type Props = {
  plant: Plant;
  stage: Stage;
  currentPrice?: number;
  priceMissing: boolean;
  onLessonChange: (lesson: string) => void;
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 1 ? 6 : 2 });

export default function PlantPage({ plant, stage, currentPrice, priceMissing, onLessonChange }: Props) {
  const [lesson, setLesson] = useState(plant.lesson ?? "");

  let growth: React.ReactNode;
  if (plant.isDemo) {
    growth = plant.demoSamplePrice
      ? "A demo plant, simulated from a sample BTC price because the live price couldn't be reached."
      : "A demo plant: its rise to x2 was simulated, not real.";
  } else if (priceMissing) {
    growth = (
      <span className={styles.warning}>
        <span className={styles.badge}>!</span> Price couldn&apos;t be found right now. It stays a seed until it can be
        checked.
      </span>
    );
  } else if (currentPrice !== undefined) {
    const gain = gainPercent(plant.buyPrice, currentPrice);
    growth = (
      <>
        Today {usd(currentPrice)} · <strong>{gain >= 0 ? "+" : ""}{gain.toFixed(1)}%</strong> · {STAGES[stage].name}
      </>
    );
  } else {
    growth = "Checking today's price…";
  }

  return (
    <div className={styles.page}>
      <div className={styles.plantHeader}>
        <PlantIcon stage={stage} />
        <div>
          <h2 className={styles.pageTitle}>
            {plant.name} <span className={styles.symbol}>{plant.symbol}</span>
          </h2>
          <p className={styles.growth}>{growth}</p>
        </div>
      </div>

      <dl className={styles.details}>
        <dt>Bought at</dt>
        <dd>{usd(plant.buyPrice)}</dd>
        <dt>Amount</dt>
        <dd>{plant.amount}</dd>
        <dt>Date</dt>
        <dd>{plant.date}</dd>
      </dl>

      {plant.isDemo ? (
        <p className={styles.hint}>The demo flower always carries one of the garden&apos;s built-in lessons.</p>
      ) : (
        <label className={styles.field}>
          <span className={styles.label}>My lesson</span>
          <textarea
            className={styles.input}
            rows={3}
            placeholder="What did this coin teach you?"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            onBlur={() => onLessonChange(lesson)}
          />
          <span className={styles.hint}>Shown above this plant&apos;s sunflower when you tap it.</span>
        </label>
      )}
    </div>
  );
}
