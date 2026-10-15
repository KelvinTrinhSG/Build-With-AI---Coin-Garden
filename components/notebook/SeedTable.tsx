"use client";

import { useCallback, useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import CoinSearch from "./CoinSearch";
import PlantIcon from "./PlantIcon";
import { STAGES } from "@/lib/growth";
import { parsePositive, today } from "@/lib/entry";
import type { CoinMatch, NewPlant, Plant, Stage } from "@/lib/types";
import styles from "./notebook.module.css";

type Props = {
  plants: Plant[]; // real plants only, in planting order
  stageOf: (plant: Plant) => Stage;
  priceMissing: (plant: Plant) => boolean;
  onPlant: (entry: NewPlant) => void;
  onUpdate: (id: string, patch: Partial<NewPlant>) => void;
  onRemove: (id: string) => void;
  onOpenPlant: (plant: Plant) => void;
};

const coinFields = (c: CoinMatch) => ({ coinId: c.id, symbol: c.symbol, name: c.name, thumb: c.thumb });

/**
 * A number cell that edits in place. Every valid keystroke goes straight to the garden;
 * an invalid one is only kept in the cell (marked red) and is undone when the cell loses focus.
 */
function NumberCell({ value, label, onCommit }: { value: number; label: string; onCommit: (n: number) => void }) {
  const [text, setText] = useState(String(value));
  const invalid = parsePositive(text) === null;
  return (
    <input
      className={styles.cell}
      type="number"
      inputMode="decimal"
      min="0"
      step="any"
      aria-label={label}
      aria-invalid={invalid}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const n = parsePositive(e.target.value);
        if (n !== null) onCommit(n);
      }}
      onBlur={() => invalid && setText(String(value))}
    />
  );
}

function DateCell({ value, label, onCommit }: { value: string; label: string; onCommit: (d: string) => void }) {
  const [text, setText] = useState(value);
  return (
    <input
      className={styles.cell}
      type="date"
      aria-label={label}
      aria-invalid={!text}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        if (e.target.value) onCommit(e.target.value);
      }}
      onBlur={() => !text && setText(value)}
    />
  );
}

function CoinCell({ plant, onChange }: { plant: Plant; onChange: (coin: CoinMatch) => void }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <div className={styles.coinEdit}>
        <CoinSearch
          value={null}
          onChange={(coin) => {
            if (!coin) return;
            onChange(coin);
            setEditing(false);
          }}
        />
        <button type="button" className={styles.linkButton} onClick={() => setEditing(false)}>
          cancel
        </button>
      </div>
    );
  }
  return (
    <div className={styles.coinCell}>
      {plant.thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={plant.thumb} alt="" width={20} height={20} />
      )}
      <span className={styles.coinName}>{plant.name}</span>
      <span className={styles.symbol}>{plant.symbol}</span>
      <button type="button" className={styles.linkButton} onClick={() => setEditing(true)} aria-label={`Change the coin for ${plant.name}`}>
        change
      </button>
    </div>
  );
}

function Status({ plant, stage, missing }: { plant: Plant; stage: Stage; missing: boolean }) {
  if (plant.harvestedAt) return <span className={styles.statusText}>🌻 Harvested</span>;
  if (missing) {
    return (
      <span className={styles.statusText}>
        <span className={styles.badge}>!</span> No price
      </span>
    );
  }
  return (
    <span className={styles.statusText}>
      <PlantIcon stage={stage} size={26} />
      {STAGES[stage].name.split(",")[0]}
    </span>
  );
}

type Draft = { coin: CoinMatch | null; buyPrice: string; amount: string; date: string };
const emptyDraft = (): Draft => ({ coin: null, buyPrice: "", amount: "", date: today() });

/** The blank row at the bottom: fill it in and press Plant (or Enter) to add a seed. */
function NewRow({ onPlant }: { onPlant: (entry: NewPlant) => void }) {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [tried, setTried] = useState(false);
  // A fresh CoinSearch after each planting, so its typed query is cleared too.
  const [round, setRound] = useState(0);

  const price = parsePositive(draft.buyPrice);
  const qty = parsePositive(draft.amount);
  const problems = {
    coin: !draft.coin,
    buyPrice: price === null,
    amount: qty === null,
    date: !draft.date,
  };

  function plant() {
    setTried(true);
    if (!draft.coin || price === null || qty === null || !draft.date) return;
    onPlant({ ...coinFields(draft.coin), buyPrice: price, amount: qty, date: draft.date });
    setDraft(emptyDraft());
    setTried(false);
    setRound((r) => r + 1);
  }

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      plant();
    }
  };

  return (
    <>
      <tr className={styles.newRow}>
        <td>
          <CoinSearch key={round} value={draft.coin} onChange={(coin) => setDraft((d) => ({ ...d, coin }))} />
        </td>
        <td>
          <input
            className={styles.cell}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0.00"
            aria-label="Buy price for the new seed"
            aria-invalid={tried && problems.buyPrice}
            value={draft.buyPrice}
            onChange={(e) => setDraft((d) => ({ ...d, buyPrice: e.target.value }))}
            onKeyDown={onEnter}
          />
        </td>
        <td>
          <input
            className={styles.cell}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            aria-label="Amount for the new seed"
            aria-invalid={tried && problems.amount}
            value={draft.amount}
            onChange={(e) => setDraft((d) => ({ ...d, amount: e.target.value }))}
            onKeyDown={onEnter}
          />
        </td>
        <td>
          <input
            className={styles.cell}
            type="date"
            aria-label="Date for the new seed"
            aria-invalid={tried && problems.date}
            value={draft.date}
            onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
            onKeyDown={onEnter}
          />
        </td>
        <td colSpan={2}>
          <button type="button" className={`chunky primary ${styles.plantButton}`} onClick={plant}>
            ＋ Plant
          </button>
        </td>
      </tr>
      {tried && Object.values(problems).some(Boolean) && (
        <tr>
          <td colSpan={6} className={styles.error}>
            {problems.coin && "Pick a coin from the list. "}
            {problems.buyPrice && "Enter a buy price above 0. "}
            {problems.amount && "Enter an amount above 0. "}
            {problems.date && "Choose the date you bought it."}
          </td>
        </tr>
      )}
    </>
  );
}

export default function SeedTable({ plants, stageOf, priceMissing, onPlant, onUpdate, onRemove, onOpenPlant }: Props) {
  const [pendingRemove, setPendingRemove] = useState<Plant | null>(null);
  const cancelRemove = useCallback(() => setPendingRemove(null), []);

  return (
    <div className={styles.page}>
      {pendingRemove && (
        <ConfirmDialog
          title="Pull up this plant?"
          icon={<PlantIcon stage={stageOf(pendingRemove)} size={56} />}
          confirmLabel="Remove"
          cancelLabel="Keep it"
          onCancel={cancelRemove}
          onConfirm={() => {
            onRemove(pendingRemove.id);
            setPendingRemove(null);
          }}
        >
          <p>
            <strong>{pendingRemove.name}</strong> <span className={styles.symbol}>{pendingRemove.symbol}</span>, bought
            on {pendingRemove.date}, will leave your garden along with its lesson.
          </p>
          <p className={styles.hint}>This can&apos;t be undone.</p>
        </ConfirmDialog>
      )}
      <h2 className={styles.pageTitle}>Your seed table</h2>
      <p className={styles.hint}>
        Every row is a purchase and a plant. Edit any cell and the garden updates right away. Add a new seed in the
        last row.
      </p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Coin</th>
              <th scope="col">Buy price (USD)</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Plant</th>
              <th scope="col">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {plants.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>
                  No seeds yet. Fill in the row below to plant your first one. 🌱
                </td>
              </tr>
            )}
            {plants.map((p) => (
              <tr key={p.id}>
                <td>
                  <CoinCell plant={p} onChange={(coin) => onUpdate(p.id, coinFields(coin))} />
                </td>
                <td>
                  <NumberCell value={p.buyPrice} label={`Buy price for ${p.name}`} onCommit={(buyPrice) => onUpdate(p.id, { buyPrice })} />
                </td>
                <td>
                  <NumberCell value={p.amount} label={`Amount of ${p.name}`} onCommit={(amount) => onUpdate(p.id, { amount })} />
                </td>
                <td>
                  <DateCell value={p.date} label={`Date bought for ${p.name}`} onCommit={(date) => onUpdate(p.id, { date })} />
                </td>
                <td>
                  <button type="button" className={styles.statusButton} onClick={() => onOpenPlant(p)} title="Open this plant's page">
                    <Status plant={p} stage={stageOf(p)} missing={priceMissing(p)} />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.removeButton}
                    aria-label={`Remove ${p.name} bought on ${p.date}`}
                    onClick={() => setPendingRemove(p)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <NewRow onPlant={onPlant} />
          </tfoot>
        </table>
      </div>
    </div>
  );
}
