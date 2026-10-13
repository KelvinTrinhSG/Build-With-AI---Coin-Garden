import { STAGES } from "@/lib/growth";
import PlantIcon from "./PlantIcon";
import styles from "./notebook.module.css";

export default function GuidePage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>How your garden grows</h2>
      <p className={styles.hint}>
        Every coin you buy is a seed. It grows as the price rises above what you paid. A loss never hurts it; it just
        waits as a seed.
      </p>
      <ul className={styles.stageList}>
        {STAGES.map((s) => (
          <li key={s.stage} className={styles.stageRow}>
            <PlantIcon stage={s.stage} />
            <span>
              <strong>{s.gainLabel}</strong>
              <br />
              {s.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
