import { useMemo } from "react";

import styles from "./ModalBackdrop.module.css";

/**
 * ModalBackdrop
 *
 * Rendered behind whichever overlay/modal is currently open (Projects,
 * About, Services, Contact). It provides two things WITHOUT touching the
 * modal's own layout/design:
 *
 *  1. A slight dim over the map behind the modal.
 *  2. A gentle falling-snow effect.
 *
 * The layer is `position: fixed` with a z-index BELOW every overlay shell
 * (About/Contact/Projects/Services all sit at z-index 200), so it always
 * paints behind the modal but above the home page. It is pointer-events:
 * none and sits under the (full-screen, opaque-to-clicks) modal shells, so
 * it never intercepts clicks, scroll, or focus — the modal keeps working
 * exactly as before.
 */
export default function ModalBackdrop() {
  // Generate flakes once per mount — new random values on every render would
  // cause pointless object churn and layout recalculations.
  const flakes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 5,
        duration: 9 + Math.random() * 8,
        delay: -Math.random() * 14,
        drift: 15 + Math.random() * 40,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.dim} />
      <div className={styles.snowWrap}>
        {flakes.map((f) => (
          <span
            key={f.id}
            className={styles.flake}
            style={{
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
