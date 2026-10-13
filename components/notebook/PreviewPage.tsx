import PlantIcon from "./PlantIcon";
import styles from "./notebook.module.css";

export default function PreviewPage() {
  return (
    <div className={`${styles.page} ${styles.preview}`}>
      <h2 className={styles.pageTitle}>Your seed can become this.</h2>
      <PlantIcon stage={4} size={220} />
      <p className={styles.hint}>When a coin reaches x2 of your buy price, its plant blooms into a golden sunflower.</p>
    </div>
  );
}
