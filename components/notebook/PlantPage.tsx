"use client";

import { STAGES, gainPercent } from "@/lib/growth";
import { lessonFor } from "@/lib/lessons";
import type { Plant, Stage } from "@/lib/types";
import PlantIcon from "./PlantIcon";
import styles from "./notebook.module.css";

type Props = {
  plant: Plant;
  stage: Stage;
  currentPrice?: number;
  priceMissing: boolean;
  onHarvest: () => void;
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 1 ? 6 : 2 });

export default function PlantPage({ plant, stage, currentPrice, priceMissing, onHarvest }: Props) {
  // Lessons arrive with the harvest; a plant that is still growing has none yet.
  const lesson = lessonFor(plant);
  const canHarvest = !plant.isDemo && !plant.harvestedAt && stage === 4 && currentPrice !== undefined;

  let growth: React.ReactNode;
  if (plant.harvestedAt) {
    const date = plant.harvestedAt.slice(0, 10);
    if (plant.harvestPrice !== undefined) {
      const gain = gainPercent(plant.buyPrice, plant.harvestPrice);
      growth = (
        <>
          🌻 Harvested {date} at {usd(plant.harvestPrice)} · <strong>+{gain.toFixed(1)}%</strong>
        </>
      );
    } else {
      growth = <>🌻 Harvested {date}</>;
    }
  } else if (plant.isDemo) {
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

      {canHarvest && (
        <div className={styles.harvest}>
          <button type="button" className="chunky primary" onClick={onHarvest}>
            🌻 Harvest
          </button>
          <span className={styles.hint}>It reached x2. Harvest it to move it to the harvest plot and receive its lesson.</span>
        </div>
      )}

      {lesson && (
        <figure className={styles.lessonCard}>
          <figcaption className={styles.label}>{plant.isDemo ? "Demo lesson" : "Lesson from the harvest"}</figcaption>
          <blockquote className={styles.lessonText}>“{lesson.text}”</blockquote>
          {lesson.author && (
            <p className={styles.lessonAuthor}>
              — {lesson.author}
              {lesson.source && <span className={styles.lessonSource}>, {lesson.source}</span>}
            </p>
          )}
        </figure>
      )}
    </div>
  );
}
