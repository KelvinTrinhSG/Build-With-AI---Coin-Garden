import { QUOTES, type Quote } from "./quotes";
import type { Plant } from "./types";

export type Lesson = { text: string; author?: string; source?: string };

const BY_ID = new Map(QUOTES.map((q) => [q.id, q]));

const fromQuote = (q: Quote): Lesson => ({ text: q.text, author: q.author, source: q.source });

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * A random quote id for a new harvest. Quotes no other flower holds yet are preferred,
 * so the harvest plot fills with different lessons until all 100 have been used.
 */
export function pickQuoteId(usedIds: Iterable<string>, random: () => number = Math.random): string {
  const used = new Set(usedIds);
  const fresh = QUOTES.filter((q) => !used.has(q.id));
  const pool = fresh.length > 0 ? fresh : QUOTES;
  return pool[Math.floor(random() * pool.length) % pool.length].id;
}

/**
 * The lesson a flower carries, or null while it is still growing: lessons arrive with the harvest.
 * A harvested flower shows the quote it received; one harvested before quotes existed keeps its own
 * written lesson, or else gets a quote chosen steadily from its id. The demo flower shows a quote
 * too, since it plays out the whole journey.
 */
export function lessonFor(plant: Plant): Lesson | null {
  if (!plant.harvestedAt && !plant.isDemo) return null;
  const quote = plant.quoteId ? BY_ID.get(plant.quoteId) : undefined;
  if (quote) return fromQuote(quote);
  if (!plant.isDemo && plant.lesson?.trim()) return { text: plant.lesson.trim() };
  return fromQuote(QUOTES[hash(plant.id) % QUOTES.length]);
}
