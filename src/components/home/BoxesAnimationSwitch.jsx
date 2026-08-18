import styles from "./BoxesAnimationSwitch.module.css";

/**
 * BoxesAnimationSwitch
 *
 * Uiverse.io lever-style toggle (converted from styled-components to a
 * plain CSS module — this project doesn't depend on styled-components).
 * Controls whether the rotating map boxes loader animates.
 *
 * Props:
 *   checked  - whether boxes animation is currently enabled
 *   onChange - (nextChecked: boolean) => void
 */
export default function BoxesAnimationSwitch({ checked, onChange, position }) {
  return (
    <div className={styles.float} style={position}>
      <div className={styles.toggleContainer}>
        <input
          className={styles.toggleInput}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={styles.toggleHandleWrapper}>
          <div className={styles.toggleHandle}>
            <div className={styles.toggleHandleKnob} />
            <div className={styles.toggleHandleBarWrapper}>
              <div className={styles.toggleHandleBar} />
            </div>
          </div>
        </div>
        <div className={styles.toggleBase}>
          <div className={styles.toggleBaseInside} />
        </div>
      </div>
    </div>
  );
}
