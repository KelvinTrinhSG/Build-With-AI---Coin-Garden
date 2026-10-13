import styles from "./garden.module.css";

// The living farm around the plot: trees, a pond, grass tufts and a passing bird.
// Everything here is decoration; it never reacts to the garden's data.

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

type Bounds = { left: number; right: number; top: number; bottom: number };

export function SceneryBack({ left, right, top }: Bounds) {
  return (
    <g aria-hidden="true">
      <Tree x={left + 10} y={top + 40} scale={0.9} />
      <Tree x={right - 30} y={top + 20} scale={0.75} />
      <Tuft x={left + 60} y={top + 10} delay={0} />
      <Tuft x={right - 70} y={top + 70} delay={0.8} />
    </g>
  );
}

export function SceneryFront({ left, right, bottom }: Bounds) {
  return (
    <g aria-hidden="true">
      <Tree x={left - 30} y={bottom - 30} />
      <Pond x={right - 70} y={bottom + 28} />
      <Tuft x={left + 40} y={bottom + 20} delay={0.4} />
      <Tuft x={(left + right) / 2} y={bottom + 34} delay={1.2} />
      <Tuft x={right - 90} y={bottom - 30} delay={1.9} />
    </g>
  );
}

export function Bird({ top, left, right }: Bounds) {
  return (
    <g aria-hidden="true" transform={`translate(${left} ${top})`}>
      <g className={styles.bird} style={{ ["--fly" as string]: `${right - left}px` }}>
        <path d="M-10,0 q5,-7 10,0 q5,-7 10,0" stroke="var(--bird)" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}
