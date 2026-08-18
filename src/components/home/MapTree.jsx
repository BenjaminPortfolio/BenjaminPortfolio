import { memo } from "react";
import styles from "./MapTree.module.css";

/**
 * MapTree
 *
 * Uiverse.io 3D rotating tree loader (by NlghtM4re).
 * Rendered as a floating element above the map.
 *
 * Props:
 *   position - optional CSS style object merged onto the .float wrapper,
 *              so callers can control placement per viewport.
 *   theme    - optional snow-theme variant name (see MapTree.module.css for
 *              the available `.theme*` classes), swaps the foliage/trunk colors.
 *   animate  - whether the rotation animation plays (default true). Pass
 *              false to freeze the tree on a still frame — used by the
 *              animation switch to cut load when many trees are on screen.
 */
function MapTree({ position, theme, animate = true }) {
  return (
    <div className={styles.float} style={position}>
      <div className={styles.container}>
        <div
          className={`${styles.tree} ${theme ? styles[theme] : ""} ${
            animate ? "" : styles.paused
          }`}
        >
          {[0, 1, 2, 3].map((x) => (
            <div key={x} className={styles.branch} style={{ "--x": x }}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} style={{ "--i": i }} />
              ))}
            </div>
          ))}
          <div className={styles.stem}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} style={{ "--i": i }} />
            ))}
          </div>
          <span className={styles.shadow} />
        </div>
      </div>
    </div>
  );
}

// Toggling an unrelated switch (cube/boxes/torches) re-renders DesktopMap,
// which would otherwise re-render every one of these 14 trees for nothing —
// memo bails out unless this tree's own props actually changed.
export default memo(MapTree);
