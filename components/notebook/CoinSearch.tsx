"use client";

import { useEffect, useState } from "react";
import { searchCoins } from "@/lib/priceClient";
import type { CoinMatch } from "@/lib/types";
import styles from "./notebook.module.css";

const DEBOUNCE_MS = 300;
const MIN_CHARS = 2;

type Props = {
  value: CoinMatch | null;
  onChange: (coin: CoinMatch | null) => void;
};

type Status = "idle" | "loading" | "done" | "error";

export default function CoinSearch({ value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<CoinMatch[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const q = query.trim();
    if (value || q.length < MIN_CHARS) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("loading");
      const result = await searchCoins(q, controller.signal);
      if (controller.signal.aborted) return;
      if (result === null) {
        setMatches([]);
        setStatus("error");
      } else {
        setMatches(result);
        setStatus("done");
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, value]);

  if (value) {
    return (
      <div className={styles.chosen}>
        {value.thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value.thumb} alt="" width={24} height={24} />
        )}
        <strong>{value.name}</strong> <span className={styles.symbol}>{value.symbol}</span>
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => {
            onChange(null);
            setQuery("");
            setMatches([]);
            setStatus("idle");
          }}
        >
          change
        </button>
      </div>
    );
  }

  const showList = query.trim().length >= MIN_CHARS;

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Type a coin, e.g. bitcoin or ETH"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        aria-label="Search for a coin"
      />
      {showList && (
        <ul className={styles.matches} role="listbox" aria-label="Matching coins">
          {status === "loading" && <li className={styles.muted}>Looking through the seed catalogue…</li>}
          {status === "error" && <li className={styles.error}>Couldn&apos;t reach the coin list — try again.</li>}
          {status === "done" && matches.length === 0 && <li className={styles.muted}>No coins match that.</li>}
          {status === "done" &&
            matches.map((m) => (
              <li key={m.id}>
                <button type="button" className={styles.match} role="option" aria-selected={false} onClick={() => onChange(m)}>
                  {m.thumb && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.thumb} alt="" width={20} height={20} />
                  )}
                  <span>{m.name}</span>
                  <span className={styles.symbol}>{m.symbol}</span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
