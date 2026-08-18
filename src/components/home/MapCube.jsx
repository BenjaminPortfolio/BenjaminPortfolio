import { memo } from "react";
import styles from "./MapCube.module.css";

/**
 * MapCube
 *
 * Uiverse.io rotating 3D cube loader (by andrew-demchenk0).
 * Rendered as a floating element above the map.
 *
 * Props:
 *   position - optional CSS style object merged onto the .float wrapper,
 *              so callers can control placement per viewport.
 *   animate  - whether the cube rotation plays (default true). Pass false
 *              to freeze it on its resting frame.
 */
function MapCube({ position, animate = true }) {
  return (
    <div className={styles.float} style={position}>
      <div className={`${styles.cubeLoader} ${animate ? "" : styles.paused}`}>
        <div className={styles.cubeTop} />
        <div className={styles.cubeWrapper}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={styles.cubeSpan}
              style={{ "--i": i }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Avoid re-rendering the cube when an unrelated switch (trees/boxes/torches)
// toggles and re-renders DesktopMap.
export default memo(MapCube);
