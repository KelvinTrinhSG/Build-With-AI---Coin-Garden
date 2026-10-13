"use client";

import { useState } from "react";
import CoinSearch from "./CoinSearch";
import type { CoinMatch, NewPlant } from "@/lib/types";
import styles from "./notebook.module.css";

type Props = { onPlant: (entry: NewPlant) => void };
type Errors = Partial<Record<"coin" | "buyPrice" | "amount" | "date", string>>;

function today() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function NewEntryPage({ onPlant }: Props) {
  const [coin, setCoin] = useState<CoinMatch | null>(null);
  const [buyPrice, setBuyPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState<Errors>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const price = Number(buyPrice);
    const qty = Number(amount);
    const next: Errors = {};
    if (!coin) next.coin = "Pick a coin from the list.";
    if (!buyPrice || !(price > 0)) next.buyPrice = "Enter a buy price above 0.";
    if (!amount || !(qty > 0)) next.amount = "Enter an amount above 0.";
    if (!date) next.date = "Choose the date you bought it.";
    setErrors(next);
    if (Object.keys(next).length > 0 || !coin) return;

    onPlant({
      coinId: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      thumb: coin.thumb,
      buyPrice: price,
      amount: qty,
      date,
    });
  }

  return (
    <form className={styles.page} onSubmit={submit} noValidate>
      <h2 className={styles.pageTitle}>Plant a new seed</h2>
      <p className={styles.hint}>Write down a purchase. When you close the book, a seed goes into your garden.</p>

      <div className={styles.field}>
        <span className={styles.label}>Coin</span>
        <CoinSearch value={coin} onChange={setCoin} />
        {errors.coin && <p className={styles.error}>{errors.coin}</p>}
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Buy price (USD per coin)</span>
        <input
          className={styles.input}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          aria-invalid={!!errors.buyPrice}
        />
        {errors.buyPrice && <p className={styles.error}>{errors.buyPrice}</p>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Amount</span>
        <input
          className={styles.input}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-invalid={!!errors.amount}
        />
        {errors.amount && <p className={styles.error}>{errors.amount}</p>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Date</span>
        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={!!errors.date}
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}
      </label>

      <button type="submit" className="chunky primary">
        Close the book &amp; plant 🌱
      </button>
    </form>
  );
}
