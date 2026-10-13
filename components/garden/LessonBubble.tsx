import type { Lesson } from "@/lib/lessons";
import styles from "./garden.module.css";

const WIDTH = 240;
const HEIGHT = 120;

type Props = { lesson: Lesson; x: number; y: number; onOpenPage: () => void };

// A wooden speech-sign floating above a tapped sunflower.
export default function LessonBubble({ lesson, x, y, onOpenPage }: Props) {
  return (
    <foreignObject x={x - WIDTH / 2} y={y - 110 - HEIGHT - 8} width={WIDTH} height={HEIGHT + 12} overflow="visible">
      <div className={styles.bubble} role="status" onClick={(e) => e.stopPropagation()}>
        <p className={styles.bubbleText}>“{lesson.text}”</p>
        <div className={styles.bubbleFooter}>
          {lesson.source && <span className={styles.bubbleSource}>— {lesson.source}</span>}
          <button type="button" className={styles.bubbleLink} onClick={onOpenPage}>
            📖 page
          </button>
        </div>
      </div>
    </foreignObject>
  );
}
