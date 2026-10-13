import styles from "./TopBar.module.css";

type Props = { onOpenNotebook: () => void };

export default function TopBar({ onOpenNotebook }: Props) {
  return (
    <header className={styles.bar}>
      <span className={`${styles.name} on-world`}>🌻 Coin Garden</span>
      <button type="button" className={`chunky ${styles.notebook}`} onClick={onOpenNotebook}>
        📖 <span className={styles.label}>Notebook</span>
      </button>
    </header>
  );
}
