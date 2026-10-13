import type { Plant } from "./types";

export type Lesson = { text: string; source?: string };

export const BUILT_IN_LESSONS: Lesson[] = [
  {
    text: "We don't have to be smarter than the rest. We have to be more disciplined than the rest.",
    // Widely attributed; verify the original source before shipping.
    source: "Warren Buffett",
  },
  { text: "Plants need time to grow; fruit doesn't appear in a day." },
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** The plant's own lesson if it has one (never for the demo plant), otherwise a built-in one that stays the same for that plant. */
export function lessonFor(plant: Plant): Lesson {
  if (!plant.isDemo && plant.lesson?.trim()) return { text: plant.lesson.trim() };
  return BUILT_IN_LESSONS[hash(plant.id) % BUILT_IN_LESSONS.length];
}
