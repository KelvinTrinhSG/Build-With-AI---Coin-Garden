"use client";

import { useEffect, useRef } from "react";
import styles from "./ConfirmDialog.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/** A storybook-style "are you sure?" card, used instead of the browser's own confirm box. */
export default function ConfirmDialog({ title, children, icon, confirmLabel, cancelLabel = "Cancel", onConfirm, onCancel }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // The safe choice has focus, so a stray Enter never deletes anything.
    cancelRef.current?.focus();
    // Capture phase on window runs before the notebook's own Escape handler, so Escape closes only this card.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onCancel]);

  return (
    <div
      className={styles.scrim}
      onClick={(e) => {
        e.stopPropagation();
        onCancel();
      }}
    >
      <div
        className={styles.card}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-body"
        onClick={(e) => e.stopPropagation()}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <h2 id="confirm-title" className={styles.title}>
          {title}
        </h2>
        <div id="confirm-body" className={styles.body}>
          {children}
        </div>
        <div className={styles.actions}>
          <button ref={cancelRef} type="button" className="chunky" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="chunky primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
