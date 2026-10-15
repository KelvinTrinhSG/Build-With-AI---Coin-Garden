// Shared rules for what the seed table accepts.

/** A typed buy price or amount, or null unless it is a finite number above 0. */
export function parsePositive(text: string): number | null {
  if (text.trim() === "") return null;
  const n = Number(text);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Today's date as "YYYY-MM-DD" in the visitor's own time zone. */
export function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
