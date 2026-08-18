import { memo } from "react";
import styles from "./MapBoxes.module.css";

/**
 * MapBoxes
 *
 * Uiverse.io 3D "boxes" loader (by Nawsome).
 * Rendered as a floating element above the map.
 *
 * Props:
 *   position - optional CSS style object merged onto the .float wrapper,
 *              so callers can control placement per viewport.
 *   animate  - whether the boxes animation plays (default true). Pass
 *              false to freeze them on their resting frame.
 */
function MapBoxes({ position, animate = true }) {
  return (
    <div className={styles.float} style={position}>
      <div className={`${styles.boxes} ${animate ? "" : styles.paused}`}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.box}>
            <div />
            <div />
            <div />
            <div />
          </div>
        ))}
      </div>
    </div>
  );
}

// Avoid re-rendering the boxes loader when an unrelated switch
// (trees/cube/torches) toggles and re-renders DesktopMap.
export default memo(MapBoxes);
