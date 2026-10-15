// Isometric geometry for the farm's three plots. Each plot is a diamond of tiles whose
// top corner sits at (ox, oy); slots fill row by row and a plot grows a row at a time.

export const TILE_W = 96;
export const TILE_H = 48;
export const SOIL_DEPTH = 18;
const HALF_W = TILE_W / 2;
const HALF_H = TILE_H / 2;

// Vertical room between stacked plots on phones, for tall sunflowers and props.
const GAP_Y = 310;
// On wide screens the scene is split into zones: demo 1/4, growing 2/4, harvest 1/4.
// These are how much of its zone each plot may fill, leaving room for the farm props.
const GROWING_FILL = 0.85;
const SIDE_FILL = 0.75;
const MIN_ZONE = 285;

export type PlotKey = "demo" | "growing" | "harvested";
export type Point = { x: number; y: number };
export type PlotSize = { cols: number; rows: number };
export type PlotBox = PlotSize & { ox: number; oy: number; top: Point; right: Point; bottom: Point; left: Point };
export type Plots = Record<PlotKey, PlotBox>;
/** zone: width of a quarter of the scene on wide screens; null when the plots are stacked. */
export type Layout = { plots: Plots; zone: number | null };

export function plotBox({ cols, rows }: PlotSize, ox: number, oy: number): PlotBox {
  return {
    cols,
    rows,
    ox,
    oy,
    top: { x: ox, y: oy },
    right: { x: ox + cols * HALF_W, y: oy + cols * HALF_H },
    bottom: { x: ox + (cols - rows) * HALF_W, y: oy + (cols + rows) * HALF_H },
    left: { x: ox - rows * HALF_W, y: oy + rows * HALF_H },
  };
}

export function slotPosition(plot: PlotBox, index: number): Point {
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  return {
    x: plot.ox + ((col - row) * TILE_W) / 2,
    y: plot.oy + ((col + row) * TILE_H) / 2 + TILE_H / 2,
  };
}

export function plotCenter(plot: PlotBox): Point {
  return { x: (plot.top.x + plot.bottom.x) / 2, y: (plot.top.y + plot.bottom.y) / 2 };
}

const height = ({ cols, rows }: PlotSize) => (cols + rows) * HALF_H;
const width = ({ cols, rows }: PlotSize) => (cols + rows) * HALF_W;
// Top-corner x that puts a plot's middle at cx.
const centredOn = (size: PlotSize, cx: number) => cx - ((size.cols - size.rows) * HALF_W) / 2;

/**
 * Wide screens: four equal quarters, with the demo plot in the left quarter, the growing plot
 * across the middle two, and the harvest in the right quarter. The growing plot sits at x = 0.
 * Narrow screens: the same three plots stacked top to bottom.
 */
export function layoutPlots(sizes: Record<PlotKey, PlotSize>, vertical: boolean, minZone = 0): Layout {
  const { demo, growing, harvested } = sizes;

  if (!vertical) {
    // A quarter must be wide enough for every plot to fit its zone as the plots grow.
    // minZone lets a wide window stretch the quarters so the farm spans the whole page.
    const zone = Math.max(MIN_ZONE, minZone, width(growing) / (2 * GROWING_FILL), width(harvested) / SIDE_FILL);
    const mid = height(growing) / 2;
    return {
      zone,
      plots: {
        // The demo plot stands a little forward, leaving the back of its quarter for the barn.
        demo: plotBox(demo, centredOn(demo, -1.5 * zone + 40), mid - height(demo) / 2 + 30),
        growing: plotBox(growing, centredOn(growing, 0), 0),
        harvested: plotBox(harvested, centredOn(harvested, 1.5 * zone - 10), mid - height(harvested) / 2),
      },
    };
  }

  // Centre each plot on x = 0 and stack them with room above each for tall sunflowers.
  const d = plotBox(demo, centredOn(demo, 0), 0);
  const g = plotBox(growing, centredOn(growing, 0), d.bottom.y + GAP_Y);
  const h = plotBox(harvested, centredOn(harvested, 0), g.bottom.y + GAP_Y);
  return { zone: null, plots: { demo: d, growing: g, harvested: h } };
}
