import { memo, useState } from "react";
import styles from "./MapCheckbox.module.css";

/**
 * MapCheckbox
 *
 * Minecraft-style torch checkbox that lights up when switched on.
 * Rendered as a floating element above the map (mirrors the way the
 * `.media` frames are placed on top of the map container).
 *
 * Props:
 *   position - optional CSS style object merged onto the .float wrapper,
 *              so callers can control placement per viewport.
 *   checked  - optional controlled glow state. When omitted, the torch
 *              manages its own state internally (click to toggle) — pass
 *              this (with `onChange`) to drive the glow from elsewhere,
 *              e.g. a master switch that lights every torch at once.
 *   onChange - (nextChecked: boolean) => void, paired with `checked`.
 */
function MapCheckbox({ position, checked: checkedProp, onChange: onChangeProp }) {
  const [internalChecked, setInternalChecked] = useState(true);
  const checked = checkedProp !== undefined ? checkedProp : internalChecked;
  const handleChange = (e) => {
    if (onChangeProp) onChangeProp(e.target.checked);
    else setInternalChecked(e.target.checked);
  };

  return (
    <div className={styles.float} style={position}>
      <label className={styles.container}>
        <div className={styles.simpleText}>Click me!</div>
        <input
          type="checkbox"
          className={styles.input}
          checked={checked}
          onChange={handleChange}
        />
        <div className={styles.checkmark} />

        <div className={styles.torch}>
          <div className={styles.head}>
            <div className={`${styles.face} ${styles.top}`}>
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className={`${styles.face} ${styles.left}`}>
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className={`${styles.face} ${styles.right}`}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>

          <div className={styles.stick}>
            <div
              className={`${styles.side} ${styles.sideLeft}`}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`l-${i}`} />
              ))}
            </div>
            <div
              className={`${styles.side} ${styles.sideRight}`}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`r-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}

// Avoid re-rendering a torch when an unrelated switch (trees/cube/boxes)
// toggles and re-renders DesktopMap.
export default memo(MapCheckbox);
