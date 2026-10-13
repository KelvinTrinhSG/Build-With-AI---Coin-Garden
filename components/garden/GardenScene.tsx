import type { Plant as PlantData, Stage } from "@/lib/types";
import Plant from "./Plant";
import styles from "./garden.module.css";

// Isometric plot geometry. Slots fill row by row; the plot grows a row at a time.
const COLS = 4;
const MIN_ROWS = 3;
const TILE_W = 96;
const TILE_H = 48;
const SOIL_DEPTH = 18;
const HEADROOM = 130; // space above the plot for tall sunflowers
const PAD = 24;

export function slotPosition(index: number) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  return {
    x: ((col - row) * TILE_W) / 2,
    y: ((col + row) * TILE_H) / 2 + TILE_H / 2,
  };
}

type Props = {
  plants: PlantData[];
  stageOf: (plant: PlantData) => Stage;
  priceMissing: (plant: PlantData) => boolean;
};

export default function GardenScene({ plants, stageOf, priceMissing }: Props) {
  const rows = Math.max(MIN_ROWS, Math.ceil(plants.length / COLS));
  const halfW = TILE_W / 2;
  const halfH = TILE_H / 2;

  const top = { x: 0, y: 0 };
  const right = { x: COLS * halfW, y: COLS * halfH };
  const bottom = { x: (COLS - rows) * halfW, y: (COLS + rows) * halfH };
  const left = { x: -rows * halfW, y: rows * halfH };
  const pts = (...p: { x: number; y: number }[]) => p.map(({ x, y }) => `${x},${y}`).join(" ");

  const minX = left.x - PAD;
  const width = right.x - left.x + PAD * 2;
  const minY = -HEADROOM;
  const height = bottom.y + SOIL_DEPTH + PAD + HEADROOM;

  const slots = Array.from({ length: rows * COLS }, (_, i) => slotPosition(i));

  // Draw back-to-front so nearer plants overlap farther ones.
  const placed = plants
    .map((plant, i) => ({ plant, ...slotPosition(i) }))
    .sort((a, b) => a.y - b.y);

  return (
    <svg
      className={styles.scene}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      role="img"
      aria-label={plants.length ? `Your garden with ${plants.length} plants` : "Your empty garden plot"}
    >
      {/* Soil sides give the plot some depth */}
      <polygon
        points={pts(left, bottom, { x: bottom.x, y: bottom.y + SOIL_DEPTH }, { x: left.x, y: left.y + SOIL_DEPTH })}
        fill="var(--soil-dark)"
        stroke="var(--bark-dark)"
        strokeWidth={3}
      />
      <polygon
        points={pts(bottom, right, { x: right.x, y: right.y + SOIL_DEPTH }, { x: bottom.x, y: bottom.y + SOIL_DEPTH })}
        fill="var(--soil-dark)"
        stroke="var(--bark-dark)"
        strokeWidth={3}
      />
      <polygon points={pts(top, right, bottom, left)} fill="var(--soil)" stroke="var(--bark-dark)" strokeWidth={3} />

      {/* Faint planting spots waiting for seeds */}
      {slots.map((s, i) => (
        <ellipse key={i} cx={s.x} cy={s.y} rx={16} ry={7} fill="var(--soil-row)" opacity={0.55} />
      ))}

      {placed.map(({ plant, x, y }) => (
        <Plant key={plant.id} plant={plant} x={x} y={y} stage={stageOf(plant)} missingPrice={priceMissing(plant)} />
      ))}
    </svg>
  );
}
