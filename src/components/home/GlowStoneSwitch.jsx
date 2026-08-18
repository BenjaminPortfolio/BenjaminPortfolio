import styles from "./GlowStoneSwitch.module.css";

const FACE_CELLS = Array.from({ length: 16 });

/**
 * GlowStoneSwitch
 *
 * Uiverse.io glowing lamp-block toggle (converted from styled-components
 * to a plain CSS module — this project doesn't depend on styled-components).
 * Master switch for every torch (`MapCheckbox`) on the map — when on, all
 * torches glow together; when off, they all go dark.
 *
 * Props:
 *   checked  - whether the torches are currently lit
 *   onChange - (nextChecked: boolean) => void
 */
export default function GlowStoneSwitch({ checked, onChange, position }) {
  return (
    <div className={styles.float} style={position}>
      <label className={styles.container}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={styles.simpleText}>GLOW STONE</div>
        <div className={styles.lampBlock}>
          {["top", "bottom", "front", "back", "left", "right"].map((face) => (
            <div key={face} className={`${styles.face} ${styles[face]}`}>
              {FACE_CELLS.map((_, i) => (
                <div key={i} />
              ))}
            </div>
          ))}
        </div>
      </label>
    </div>
  );
}
