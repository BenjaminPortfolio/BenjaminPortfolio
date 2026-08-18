import styles from "./TreeAnimationSwitch.module.css";

/**
 * TreeAnimationSwitch
 *
 * Uiverse.io-style rocker toggle (converted from styled-components to a
 * plain CSS module — this project doesn't depend on styled-components).
 * Lets the user turn the rotating tree animation on/off, since running
 * a dozen+ animated 3D trees at once was adding real load time and jank.
 *
 * Props:
 *   checked  - whether tree animation is currently enabled
 *   onChange - (nextChecked: boolean) => void
 */
export default function TreeAnimationSwitch({ checked, onChange, position }) {
  return (
    <div className={styles.float} style={position}>
      <label className={`${styles.rocker} ${styles.rockerSmall}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.switchLeft}>On</span>
        <span className={styles.switchRight}>Off</span>
      </label>
    </div>
  );
}
