"use client";

import type { Lesson } from "@/lib/lessons";
import type { Plant as PlantData, Stage } from "@/lib/types";
import { splitGarden } from "@/lib/garden";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useElementSize } from "@/hooks/useElementSize";
import Plant from "./Plant";
import LessonBubble from "./LessonBubble";
import WelcomeSign from "./WelcomeSign";
import { Bird, FarmBack, FarmFront, PlotSign, ZoneCaption } from "./Scenery";
import { SOIL_DEPTH, layoutPlots, plotCenter, slotPosition, type PlotBox } from "./layout";
import styles from "./garden.module.css";

const HARVEST_COLS = 2;
const HEADROOM = 290; // space above the plots for tall sunflowers, the zone captions and the title
const HEADROOM_WIDE = 300;
const CAPTION_ABOVE = 185; // how far above a plot's top corner its caption starts

const CAPTIONS = {
  demo: { title: "🧪 Try it out", text: "Press ▶ Demo to watch a seed grow to x2 in 10 seconds." },
  growing: {
    title: "🌱 Your growing garden",
    text: "Every coin you buy is a seed. Add one in the 📖 Notebook — it grows as the price rises toward x2.",
  },
  harvested: {
    title: "🌻 Harvest",
    text: "When a plant reaches x2, open its page and press Harvest. It rests here with a lesson from a great investor.",
  },
};
const PAD = 24;
const SCENERY_Y = 90; // room below for signs, the pond and the tractor

type Props = {
  plants: PlantData[];
  stageOf: (plant: PlantData) => Stage;
  priceMissing: (plant: PlantData) => boolean;
  selectedId: string | null;
  lessonFor: (plant: PlantData) => Lesson | null;
  onSelectPlant: (plant: PlantData) => void;
  onOpenPage: (plant: PlantData) => void;
  onBackgroundClick: () => void;
  showSign: boolean;
  onPlantFirstSeed: () => void;
  onRunDemo: () => void;
  demoRunning: boolean;
  title: { heading: string; line: string } | null;
};


function Plot({ plot }: { plot: PlotBox }) {
  const { top, right, bottom, left } = plot;
  const pts = (...p: { x: number; y: number }[]) => p.map(({ x, y }) => `${x},${y}`).join(" ");
  const down = (p: { x: number; y: number }) => ({ x: p.x, y: p.y + SOIL_DEPTH });
  const slots = Array.from({ length: plot.rows * plot.cols }, (_, i) => slotPosition(plot, i));
  return (
    <g>
      {/* Soil sides give the plot some depth */}
      <polygon points={pts(left, bottom, down(bottom), down(left))} fill="var(--soil-dark)" stroke="var(--bark-dark)" strokeWidth={3} />
      <polygon points={pts(bottom, right, down(right), down(bottom))} fill="var(--soil-dark)" stroke="var(--bark-dark)" strokeWidth={3} />
      <polygon points={pts(top, right, bottom, left)} fill="var(--soil)" stroke="var(--bark-dark)" strokeWidth={3} />
      {/* Faint planting spots waiting for seeds */}
      {slots.map((s, i) => (
        <ellipse key={i} cx={s.x} cy={s.y} rx={16} ry={7} fill="var(--soil-row)" opacity={0.55} />
      ))}
    </g>
  );
}

export default function GardenScene(props: Props) {
  const { plants, stageOf, priceMissing, selectedId } = props;
  const vertical = useMediaQuery("(max-width: 640px)");
  const [wrapRef, box] = useElementSize<HTMLDivElement>();
  const { demo, growing, harvested } = splitGarden(plants);

  // Wide screens give the growing plot a bigger field; phones keep it narrow enough to stay legible.
  const growingCols = vertical ? 4 : 5;
  const growingMinRows = vertical ? 3 : 4;
  const sizes = {
    demo: { cols: 1, rows: 1 },
    growing: { cols: growingCols, rows: Math.max(growingMinRows, Math.ceil(growing.length / growingCols)) },
    harvested: { cols: HARVEST_COLS, rows: Math.max(2, Math.ceil(harvested.length / HARVEST_COLS)) },
  };
  let layout = layoutPlots(sizes, vertical);
  const headroom = vertical ? HEADROOM : HEADROOM_WIDE;

  // Plot heights don't depend on the zone width, so the vertical extent is known up front.
  const ys = Object.values(layout.plots);
  const minPY = Math.min(...ys.map((b) => b.top.y));
  const maxPY = Math.max(...ys.map((b) => b.bottom.y));
  const contentH = maxPY - minPY + SOIL_DEPTH + PAD + headroom + SCENERY_Y;

  // On wide screens the farm fills the whole stage: a wide window stretches the quarters,
  // a tall one adds sky above and meadow below.
  const aspect = !vertical && box && box.width > 0 && box.height > 0 ? box.width / box.height : null;
  if (aspect !== null && (4 * layout.zone!) / contentH < aspect) {
    layout = layoutPlots(sizes, false, (contentH * aspect) / 4);
  }
  const { plots, zone } = layout;
  const boxes = Object.values(plots);

  let minX: number;
  let width: number;
  let minY = minPY - headroom;
  let height = contentH;
  if (zone !== null) {
    // Exactly four quarters: demo | growing | growing | harvest.
    minX = -2 * zone;
    width = 4 * zone;
    if (aspect !== null && width / aspect > contentH) {
      height = width / aspect;
      minY -= (height - contentH) * 0.5;
    }
  } else {
    const sceneryX = 70; // room either side for the barn, the tractor and the tools
    const minPX = Math.min(...boxes.map((b) => b.left.x));
    const maxPX = Math.max(...boxes.map((b) => b.right.x));
    minX = minPX - PAD - sceneryX;
    width = maxPX - minPX + (PAD + sceneryX) * 2;
  }

  // The demo plant stands in the middle of its little plot; the others fill their plots slot by slot.
  const placed = [
    ...demo.map((plant) => ({ plant, ...plotCenter(plots.demo) })),
    ...growing.map((plant, i) => ({ plant, ...slotPosition(plots.growing, i) })),
    ...harvested.map((plant, i) => ({ plant, ...slotPosition(plots.harvested, i) })),
  ].sort((a, b) => a.y - b.y); // back-to-front so nearer plants overlap farther ones
  const selected = placed.find((p) => p.plant.id === selectedId && stageOf(p.plant) === 4);
  const selectedLesson = selected ? props.lessonFor(selected.plant) : null;

  const signAt = (plot: PlotBox) => ({ x: plot.bottom.x, y: plot.bottom.y + SOIL_DEPTH + 52 });

  return (
    <div ref={wrapRef} className={vertical ? styles.wrapTall : styles.wrap}>
      <svg
        className={styles.scene}
        viewBox={`${minX} ${minY} ${width} ${height}`}
        role="group"
        aria-label={`Your farm: ${growing.length} growing, ${harvested.length} harvested${demo.length ? ", plus a demo plant" : ""}`}
        onClick={props.onBackgroundClick}
      >
        <FarmBack layout={layout} />
        <Bird top={minY + 30} left={minX} right={minX + width} />
  
        <Plot plot={plots.demo} />
        <Plot plot={plots.growing} />
        <Plot plot={plots.harvested} />
  
        {placed.map(({ plant, x, y }) => (
          <Plant
            key={plant.id}
            plant={plant}
            x={x}
            y={y}
            stage={stageOf(plant)}
            missingPrice={priceMissing(plant)}
            onSelect={() => props.onSelectPlant(plant)}
          />
        ))}
  
        <FarmFront layout={layout} />

        {/* The title is painted onto the sky, so it scales with the farm and never collides with the captions. */}
        {props.title && (
          <g className={styles.title} transform={`translate(${zone !== null ? 0 : plotCenter(plots.demo).x} ${minPY - (zone !== null ? 250 : 240)})`}>
            <text y={0} textAnchor="middle" className={styles.titleHeading} fontSize={zone !== null ? 44 : 30}>
              {props.title.heading}
            </text>
            <text y={zone !== null ? 32 : 24} textAnchor="middle" className={styles.titleLine} fontSize={zone !== null ? 18 : 14}>
              {props.title.line}
            </text>
          </g>
        )}

        {/* Wide screens line the captions up over their quarters; phones put each above its plot. */}
        {(["demo", "growing", "harvested"] as const).map((key) => {
          const plot = plots[key];
          const cx = zone !== null ? { demo: -1.5 * zone, growing: 0, harvested: 1.5 * zone }[key] : plotCenter(plot).x;
          const w = zone !== null ? (key === "growing" ? 1.3 * zone : 0.85 * zone) : Math.min(width - 2 * PAD, 340);
          const top = (zone !== null ? minPY : plot.top.y) - CAPTION_ABOVE;
          return <ZoneCaption key={key} x={cx} y={top} width={w} {...CAPTIONS[key]} />;
        })}

        {/* The demo plot's own sign is the Demo button. */}
        <PlotSign
          {...signAt(plots.demo)}
          label={props.demoRunning ? "🌱 Growing…" : "▶ Demo"}
          onClick={props.onRunDemo}
          disabled={props.demoRunning}
        />
        <PlotSign {...signAt(plots.harvested)} label="🌻 Harvested" />
        {props.showSign ? (
          <WelcomeSign {...signAt(plots.growing)} onClick={props.onPlantFirstSeed} />
        ) : (
          <PlotSign {...signAt(plots.growing)} label="🌱 Growing" />
        )}
  
        {selected && selectedLesson && (
          <LessonBubble
            lesson={selectedLesson}
            x={selected.x}
            y={selected.y}
            onOpenPage={() => props.onOpenPage(selected.plant)}
          />
        )}
      </svg>
    </div>
  );
}
