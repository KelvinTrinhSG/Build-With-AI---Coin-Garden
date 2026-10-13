import type { Plant as PlantData } from "@/lib/types";

type Props = { plant: PlantData; x: number; y: number };

export default function Plant({ plant, x, y }: Props) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <title>{`${plant.name} (${plant.symbol})`}</title>
      <ellipse cx={0} cy={0} rx={10} ry={6} fill="var(--seed)" stroke="var(--bark-dark)" strokeWidth={2} />
    </g>
  );
}
