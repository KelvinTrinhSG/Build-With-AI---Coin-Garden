import type { Layout, Point } from "./layout";
import { SOIL_DEPTH } from "./layout";
import styles from "./garden.module.css";

// The living farm around the plots: trees, a pond, a barn, a tractor, tools and a passing bird.
// Everything here is decoration; it never reacts to the garden's data.

const OUTLINE = { stroke: "var(--bark-dark)", strokeWidth: 3, strokeLinejoin: "round" as const };

function Shadow({ rx, ry = rx / 3.5 }: { rx: number; ry?: number }) {
  return <ellipse cx={0} cy={2} rx={rx} ry={ry} fill="var(--grass-deep)" />;
}

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={4} rx={26} ry={8} fill="var(--grass-deep)" />
      <rect x={-6} y={-30} width={12} height={34} rx={3} fill="var(--bark)" stroke="var(--bark-dark)" strokeWidth={3} />
      <circle cx={0} cy={-52} r={30} fill="var(--tree)" stroke="var(--leaf-dark)" strokeWidth={3} />
      <circle cx={-16} cy={-40} r={16} fill="var(--tree)" stroke="var(--leaf-dark)" strokeWidth={3} />
      <circle cx={16} cy={-42} r={17} fill="var(--tree)" stroke="var(--leaf-dark)" strokeWidth={3} />
      <circle cx={-6} cy={-60} r={7} fill="var(--leaf)" opacity={0.7} />
    </g>
  );
}

function Tuft({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        className={styles.sway}
        style={{ animationDelay: `${delay}s` }}
        d="M-6,0 q-2,-10 -6,-14 M0,0 q0,-12 0,-18 M6,0 q2,-10 6,-14"
        stroke="var(--leaf-dark)"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function Pond({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={54} ry={20} fill="var(--pond)" stroke="var(--pond-edge)" strokeWidth={3} />
      <ellipse className={styles.ripple} cx={-8} cy={-2} rx={16} ry={5} fill="none" stroke="var(--cream)" strokeWidth={2} />
      <ellipse
        className={styles.ripple}
        style={{ animationDelay: "1.6s" }}
        cx={18}
        cy={4}
        rx={12}
        ry={4}
        fill="none"
        stroke="var(--cream)"
        strokeWidth={2}
      />
    </g>
  );
}

function Barn({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={14} cy={2} rx={84} ry={16} fill="var(--grass-deep)" />
      {/* Side wall and roof give it depth */}
      <polygon points="54,0 88,-18 88,-88 54,-70" fill="var(--barn-dark)" {...OUTLINE} />
      <polygon points="0,-118 34,-136 96,-88 62,-70" fill="var(--roof)" {...OUTLINE} />
      {/* Front */}
      <polygon points="-54,0 54,0 54,-70 0,-112 -54,-70" fill="var(--barn)" {...OUTLINE} />
      <polygon points="-62,-66 0,-118 62,-66 54,-60 0,-104 -54,-60" fill="var(--roof)" {...OUTLINE} />
      {/* Hayloft window */}
      <rect x={-11} y={-90} width={22} height={18} rx={2} fill="var(--bark-dark)" stroke="var(--barn-trim)" strokeWidth={3} />
      {/* Big doors with the classic cross brace */}
      <rect x={-26} y={-52} width={52} height={52} fill="var(--barn-dark)" stroke="var(--barn-trim)" strokeWidth={4} />
      <path d="M-26,-52 L0,0 M0,-52 L-26,0 M0,-52 L26,0 M26,-52 L0,0 M0,-52 L0,0" stroke="var(--barn-trim)" strokeWidth={3} />
      <rect x={-54} y={-4} width={108} height={4} fill="var(--bark-dark)" />
    </g>
  );
}

function Silo({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={32} />
      <path d="M-24,0 L-24,-118 A24,22 0 0 1 24,-118 L24,0 Z" fill="var(--silo)" {...OUTLINE} />
      <path d="M-24,-118 A24,22 0 0 1 24,-118 Z" fill="var(--roof)" {...OUTLINE} />
      {[-30, -60, -90].map((by) => (
        <line key={by} x1={-24} y1={by} x2={24} y2={by} stroke="var(--silo-band)" strokeWidth={3} />
      ))}
      <rect x={8} y={-110} width={6} height={104} fill="var(--silo-band)" opacity={0.6} />
    </g>
  );
}

function HayBale({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-20} y={-26} width={40} height={26} rx={7} fill="var(--hay)" {...OUTLINE} />
      <path d="M-12,-20 l6,6 M2,-22 l6,7 M-6,-9 l6,5 M8,-10 l5,5" stroke="var(--hay-dark)" strokeWidth={2} strokeLinecap="round" />
      <line x1={-6} y1={-26} x2={-6} y2={0} stroke="var(--hay-dark)" strokeWidth={2} />
      <line x1={8} y1={-26} x2={8} y2={0} stroke="var(--hay-dark)" strokeWidth={2} />
    </g>
  );
}

function HayStack({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={46} />
      <HayBale x={-21} y={0} />
      <HayBale x={21} y={0} />
      <HayBale x={0} y={-26} />
    </g>
  );
}

function Tractor({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <Shadow rx={62} ry={12} />
      {/* Exhaust and its little puffs of smoke */}
      <rect x={24} y={-62} width={6} height={26} rx={2} fill="var(--metal-dark)" {...OUTLINE} strokeWidth={2} />
      <circle className={styles.puff} cx={28} cy={-70} r={6} fill="var(--cream)" />
      <circle className={styles.puff} style={{ animationDelay: "1.2s" }} cx={28} cy={-70} r={6} fill="var(--cream)" />
      {/* Cab */}
      <rect x={-46} y={-80} width={44} height={8} rx={3} fill="var(--tractor-dark)" {...OUTLINE} />
      <path d="M-42,-72 L-6,-72 L-2,-30 L-42,-30 Z" fill="var(--tractor)" {...OUTLINE} />
      <path d="M-35,-66 L-12,-66 L-9,-44 L-35,-44 Z" fill="var(--glass)" stroke="var(--bark-dark)" strokeWidth={2} />
      {/* Body and hood */}
      <path d="M-50,-34 L44,-34 Q52,-34 52,-26 L52,-14 L-50,-14 Z" fill="var(--tractor)" {...OUTLINE} />
      <path d="M40,-30 L48,-30 M40,-24 L48,-24 M40,-18 L48,-18" stroke="var(--tractor-dark)" strokeWidth={2} />
      {/* Wheels: big at the back, small at the front */}
      <path d="M-56,-30 A28,28 0 0 1 0,-30" fill="none" stroke="var(--tractor-dark)" strokeWidth={6} strokeLinecap="round" />
      <circle cx={-28} cy={-24} r={24} fill="var(--tire)" stroke="var(--bark-dark)" strokeWidth={3} />
      <circle cx={-28} cy={-24} r={10} fill="var(--hub)" stroke="var(--bark-dark)" strokeWidth={2} />
      <circle cx={34} cy={-13} r={13} fill="var(--tire)" stroke="var(--bark-dark)" strokeWidth={3} />
      <circle cx={34} cy={-13} r={5} fill="var(--hub)" stroke="var(--bark-dark)" strokeWidth={2} />
    </g>
  );
}

function Wheelbarrow({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={34} ry={8} />
      <path d="M8,-14 L38,-4 M12,-14 L12,0" stroke="var(--bark)" strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={-6} cy={-30} rx={22} ry={6} fill="var(--soil)" />
      <path d="M-32,-30 L20,-30 L12,-12 L-22,-12 Z" fill="var(--metal)" {...OUTLINE} />
      <circle cx={-24} cy={-7} r={8} fill="var(--tire)" stroke="var(--bark-dark)" strokeWidth={2.5} />
      <circle cx={-24} cy={-7} r={2.5} fill="var(--hub)" />
    </g>
  );
}

function WateringCan({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={18} ry={5} />
      <path d="M10,-12 L24,-26" stroke="var(--metal-dark)" strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={25} cy={-27} rx={4} ry={2.5} fill="var(--metal-dark)" transform="rotate(-45 25 -27)" />
      <path d="M-6,-22 Q0,-36 8,-22" fill="none" stroke="var(--metal-dark)" strokeWidth={3} />
      <rect x={-12} y={-22} width={24} height={22} rx={4} fill="var(--metal)" {...OUTLINE} strokeWidth={2.5} />
    </g>
  );
}

function Tools({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={22} ry={6} />
      {/* Pitchfork */}
      <g transform="rotate(12)">
        <line x1={0} y1={0} x2={0} y2={-62} stroke="var(--bark)" strokeWidth={4} strokeLinecap="round" />
        <path d="M-9,-62 L9,-62 M-9,-62 L-9,-80 M0,-62 L0,-82 M9,-62 L9,-80" stroke="var(--metal-dark)" strokeWidth={3} strokeLinecap="round" />
      </g>
      {/* Shovel */}
      <g transform="translate(14 0) rotate(-10)">
        <path d="M-6,-80 L6,-80 M0,-80 L0,-24" stroke="var(--bark)" strokeWidth={4} strokeLinecap="round" />
        <path d="M-9,-26 L9,-26 L7,-6 L0,0 L-7,-6 Z" fill="var(--metal)" stroke="var(--bark-dark)" strokeWidth={2.5} />
      </g>
    </g>
  );
}

function Basket({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={26} ry={6} />
      {[-12, 2, 14].map((cx, i) => (
        <g key={cx} transform={`translate(${cx} ${-26 - (i % 2) * 6})`}>
          {Array.from({ length: 8 }, (_, k) => (
            <ellipse key={k} cx={0} cy={-6} rx={3} ry={6} fill="var(--petal)" stroke="var(--petal-edge)" strokeWidth={1} transform={`rotate(${k * 45})`} />
          ))}
          <circle r={4.5} fill="var(--flower-heart)" stroke="var(--bark-dark)" strokeWidth={1.5} />
        </g>
      ))}
      <path d="M-22,-22 L22,-22 L16,0 L-16,0 Z" fill="var(--hay)" {...OUTLINE} strokeWidth={2.5} />
      <path d="M-19,-14 L19,-14 M-17,-7 L17,-7" stroke="var(--hay-dark)" strokeWidth={2} />
    </g>
  );
}

function Fence({ from, to, posts }: { from: Point; to: Point; posts: number }) {
  const at = (t: number) => ({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
  return (
    <g>
      {[-10, -20].map((dy) => (
        <line key={dy} x1={from.x} y1={from.y + dy} x2={to.x} y2={to.y + dy} stroke="var(--bark)" strokeWidth={4} strokeLinecap="round" />
      ))}
      {Array.from({ length: posts }, (_, i) => {
        const p = at(i / (posts - 1));
        return <rect key={i} x={p.x - 3.5} y={p.y - 28} width={7} height={30} rx={2} fill="var(--cream-deep)" stroke="var(--bark-dark)" strokeWidth={2} />;
      })}
    </g>
  );
}

const CAPTION_HEIGHT = 74;

/** A card above a zone saying what the zone is for and what to do there. */
export function ZoneCaption({ x, y, width, title, text }: { x: number; y: number; width: number; title: string; text: string }) {
  return (
    <foreignObject x={x - width / 2} y={y} width={width} height={CAPTION_HEIGHT} overflow="visible">
      <div className={styles.caption}>
        <p className={styles.captionTitle}>{title}</p>
        <p className={styles.captionText}>{text}</p>
      </div>
    </foreignObject>
  );
}

type PlotSignProps ={ x: number; y: number; label: string; onClick?: () => void; disabled?: boolean };

/** A small wooden sign naming a plot, staked at its front corner. With onClick, the board is a button. */
export function PlotSign({ x, y, label, onClick, disabled }: PlotSignProps) {
  const w = label.length * 8 + 28;
  const isButton = onClick !== undefined;
  const press = () => {
    if (!disabled) onClick?.();
  };
  const buttonProps = isButton
    ? {
        role: "button",
        tabIndex: disabled ? -1 : 0,
        "aria-label": label,
        "aria-disabled": disabled || undefined,
        className: `${styles.signButton} ${disabled ? styles.signButtonDisabled : ""}`,
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          press();
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            press();
          }
        },
      }
    : { "aria-hidden": true };
  return (
    <g transform={`translate(${x} ${y})`} {...buttonProps}>
      <rect x={-3.5} y={-24} width={7} height={26} rx={2} fill="var(--bark)" stroke="var(--bark-dark)" strokeWidth={2} />
      <rect x={-w / 2} y={-46} width={w} height={26} rx={8} fill="var(--bark-dark)" />
      <g className={isButton ? styles.signBoard : undefined}>
        <rect
          x={-w / 2}
          y={-50}
          width={w}
          height={26}
          rx={8}
          fill={isButton ? "var(--brick)" : "var(--cream)"}
          stroke={isButton ? "var(--bark-dark)" : "var(--bark)"}
          strokeWidth={2.5}
        />
        <text y={-32} textAnchor="middle" className={isButton ? styles.plotLabelButton : styles.plotLabel}>
          {label}
        </text>
      </g>
    </g>
  );
}

type FarmProps = { layout: Layout };

export function FarmBack({ layout }: FarmProps) {
  const { demo: d, growing: g, harvested: h } = layout.plots;
  if (layout.zone === null) {
    return (
      <g aria-hidden="true">
        <Barn x={d.right.x + 50} y={d.right.y - 10} />
        <Silo x={d.left.x - 34} y={d.left.y - 20} />
        <Tree x={g.left.x + 20} y={g.top.y - 40} scale={0.75} />
        <HayStack x={g.right.x - 30} y={g.top.y - 50} />
        <Fence from={{ x: h.top.x - 8, y: h.top.y - 14 }} to={{ x: h.right.x - 8, y: h.right.y - 14 }} posts={5} />
        <Tuft x={g.top.x - 70} y={g.top.y + 10} delay={0} />
      </g>
    );
  }
  // Demo quarter: the barn and silo stand behind the little demo plot.
  return (
    <g aria-hidden="true">
      <g transform={`translate(${d.left.x - 52} ${d.top.y - 14}) scale(0.8)`}>
        <Barn x={0} y={0} />
      </g>
      <Silo x={d.right.x + 8} y={d.top.y - 30} />
      <Tree x={g.left.x + 40} y={g.top.y + 30} scale={0.8} />
      <HayStack x={g.right.x - 60} y={g.top.y + 20} />
      <Tree x={(g.right.x + h.left.x) / 2} y={h.top.y - 4} scale={0.75} />
      <Fence from={{ x: h.top.x - 8, y: h.top.y - 14 }} to={{ x: h.right.x - 8, y: h.right.y - 14 }} posts={5} />
      <Tree x={h.right.x + 26} y={h.right.y - 24} scale={0.65} />
      <Tuft x={g.left.x + 110} y={g.top.y + 20} delay={0} />
      <Tuft x={g.right.x - 30} y={g.top.y + 90} delay={0.8} />
    </g>
  );
}

export function FarmFront({ layout }: FarmProps) {
  const { demo: d, growing: g, harvested: h } = layout.plots;
  const below = (p: Point, dy: number) => p.y + SOIL_DEPTH + dy;
  if (layout.zone === null) {
    return (
      <g aria-hidden="true">
        <WateringCan x={d.bottom.x + 70} y={below(d.bottom, 8)} />
        <Wheelbarrow x={g.left.x + 20} y={below(g.bottom, 20)} />
        <Pond x={g.right.x - 10} y={below(g.bottom, 70)} />
        <Tools x={h.left.x - 4} y={below(h.left, 10)} />
        <Basket x={h.bottom.x - 80} y={below(h.bottom, 40)} />
        <Tractor x={h.right.x + 24} y={below(h.bottom, 84)} flip />
        <Tuft x={g.left.x + 10} y={g.bottom.y - 20} delay={0.4} />
        <Tuft x={h.right.x - 10} y={h.right.y + 50} delay={1.9} />
      </g>
    );
  }
  return (
    <g aria-hidden="true">
      <Wheelbarrow x={d.left.x - 50} y={below(d.bottom, 26)} />
      <WateringCan x={d.right.x + 30} y={below(d.right, 30)} />
      <Pond x={g.left.x + 40} y={below(g.bottom, 20)} />
      <Tractor x={g.right.x + 20} y={below(g.bottom, 24)} />
      <Tools x={h.right.x - 4} y={below(h.right, 34)} />
      <Basket x={h.bottom.x + 94} y={below(h.bottom, 54)} />
      <Tuft x={d.left.x - 10} y={d.bottom.y - 10} delay={0.4} />
      <Tuft x={g.left.x + 130} y={g.bottom.y + 40} delay={1.2} />
      <Tuft x={g.right.x - 100} y={g.bottom.y - 20} delay={1.9} />
      <Tuft x={h.right.x + 16} y={h.bottom.y + 70} delay={2.4} />
    </g>
  );
}

export function Bird({ top, left, right }: { top: number; left: number; right: number }) {
  return (
    <g aria-hidden="true" transform={`translate(${left} ${top})`}>
      <g className={styles.bird} style={{ ["--fly" as string]: `${right - left}px` }}>
        <path d="M-10,0 q5,-7 10,0 q5,-7 10,0" stroke="var(--bird)" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
