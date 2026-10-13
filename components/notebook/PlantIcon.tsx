import { Growth } from "@/components/garden/Plant";
import type { Stage } from "@/lib/types";

// A single plant drawing for the notebook, reusing the garden's own artwork.
export default function PlantIcon({ stage, size = 64 }: { stage: Stage; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-60 -120 120 132" aria-hidden="true">
      <ellipse cx={0} cy={2} rx={26} ry={8} fill="var(--soil)" stroke="var(--bark-dark)" strokeWidth={2} />
      <Growth stage={stage} petal="var(--petal)" />
    </svg>
  );
}
