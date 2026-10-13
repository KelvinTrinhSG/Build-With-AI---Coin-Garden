import styles from "./DemoButton.module.css";

type Props = { onClick: () => void; running: boolean };

export default function DemoButton({ onClick, running }: Props) {
  return (
    <button type="button" className={`chunky primary ${styles.demo}`} onClick={onClick} disabled={running}>
      {running ? "🌱 Growing…" : "▶ Demo"}
    </button>
  );
}
