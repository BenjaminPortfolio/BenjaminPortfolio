import styles from './Overlay.module.css';

/**
 * Overlay
 * Renders a top/bottom gradient vignette over the entire scene.
 * Purely decorative — no props needed.
 */
export default function Overlay() {
  return <div className={styles.overlay} aria-hidden="true" />;
}
