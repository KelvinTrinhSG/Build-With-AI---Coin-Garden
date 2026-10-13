import styles from "./garden.module.css";

type Props = { x: number; y: number; onClick: () => void };

// The staked wooden sign beside an empty plot. Tapping it opens the notebook on a new entry.
export default function WelcomeSign({ x, y, onClick }: Props) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={styles.sign}
      role="button"
      tabIndex={0}
      aria-label="Plant your first seed"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <rect x={-6} y={-6} width={12} height={58} rx={3} fill="var(--bark)" stroke="var(--bark-dark)" strokeWidth={3} />
      <g className={styles.signBoard}>
        <rect x={-64} y={-62} width={128} height={60} rx={12} fill="var(--bark-dark)" />
        <rect x={-64} y={-68} width={128} height={60} rx={12} fill="var(--cream)" stroke="var(--bark)" strokeWidth={3} />
        <text y={-42} textAnchor="middle" className={styles.signText}>
          Plant your
        </text>
        <text y={-20} textAnchor="middle" className={styles.signText}>
          first seed 🌱
        </text>
      </g>
    </g>
  );
}
