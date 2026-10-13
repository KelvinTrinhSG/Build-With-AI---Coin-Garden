import type { Plant as PlantData, Stage } from "@/lib/types";

type Props = {
  plant: PlantData;
  stage: Stage;
  x: number;
  y: number;
  missingPrice?: boolean;
};

const STROKE = "var(--leaf-dark)";

function Leaf({ y, dir }: { y: number; dir: 1 | -1 }) {
  return (
    <path
      d={`M0,${y} q${12 * dir},-10 ${22 * dir},-2 q${-10 * dir},10 ${-22 * dir},2z`}
      fill="var(--leaf)"
      stroke={STROKE}
      strokeWidth={2}
    />
  );
}

function Stem({ top }: { top: number }) {
  return <path d={`M0,0 L0,${top}`} stroke={STROKE} strokeWidth={4} strokeLinecap="round" />;
}

function Sunflower({ cy, petal }: { cy: number; petal: string }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={cy - 14}
          rx={6}
          ry={12}
          fill={petal}
          stroke="var(--petal-edge)"
          strokeWidth={1.5}
          transform={`rotate(${i * 30} 0 ${cy})`}
        />
      ))}
      <circle cx={0} cy={cy} r={10} fill="var(--flower-heart)" stroke="var(--bark-dark)" strokeWidth={2} />
    </g>
  );
}

function Growth({ stage, petal }: { stage: Stage; petal: string }) {
  switch (stage) {
    case 0:
      return <ellipse cx={0} cy={-2} rx={10} ry={6} fill="var(--seed)" stroke="var(--bark-dark)" strokeWidth={2} />;
    case 1:
      return (
        <>
          <Stem top={-24} />
          <Leaf y={-18} dir={-1} />
          <Leaf y={-18} dir={1} />
        </>
      );
    case 2:
      return (
        <>
          <Stem top={-46} />
          <Leaf y={-16} dir={-1} />
          <Leaf y={-16} dir={1} />
          <Leaf y={-36} dir={-1} />
          <Leaf y={-36} dir={1} />
        </>
      );
    case 3:
      return (
        <>
          <Stem top={-62} />
          <Leaf y={-16} dir={-1} />
          <Leaf y={-16} dir={1} />
          <Leaf y={-38} dir={-1} />
          <Leaf y={-38} dir={1} />
          <ellipse cx={0} cy={-70} rx={8} ry={10} fill="var(--bud)" stroke={STROKE} strokeWidth={2} />
        </>
      );
    case 4:
      return (
        <>
          <Stem top={-80} />
          <Leaf y={-16} dir={-1} />
          <Leaf y={-16} dir={1} />
          <Leaf y={-40} dir={-1} />
          <Leaf y={-40} dir={1} />
          <Sunflower cy={-92} petal={petal} />
        </>
      );
  }
}

export default function Plant({ plant, stage, x, y, missingPrice }: Props) {
  const petal = plant.isDemo ? "var(--demo-petal)" : "var(--petal)";
  return (
    <g transform={`translate(${x} ${y})`} data-stage={stage}>
      <title>
        {`${plant.name} (${plant.symbol})`}
        {missingPrice ? " — price couldn't be found" : ""}
        {plant.demoSamplePrice ? " — simulated with a sample BTC price" : ""}
      </title>
      <ellipse cx={0} cy={0} rx={14} ry={6} fill="var(--soil-dark)" opacity={0.5} />
      <Growth stage={stage} petal={petal} />
      {plant.isDemo && (
        <g transform="translate(0 16)">
          <rect x={-24} y={-9} width={48} height={18} rx={8} fill="var(--demo-tint)" stroke="var(--bark-dark)" strokeWidth={2} />
          <text y={4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--cream)">
            Demo
          </text>
        </g>
      )}
      {missingPrice && (
        <g transform="translate(14 -16)" aria-label="Price couldn't be found">
          <circle r={9} fill="var(--brick)" stroke="var(--bark-dark)" strokeWidth={2} />
          <text y={5} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--cream)">
            !
          </text>
        </g>
      )}
    </g>
  );
}
