import { useVisualViewportHeight } from '../../hooks/useVisualViewportHeight';
import styles from './Overlay.module.css';

/**
 * Overlay
 * Renders a top/bottom gradient vignette over the entire scene.
 * Purely decorative — no props needed.
 */
export default function Overlay() {
  // JS-driven fallback for the CSS dvh sizing — see useVisualViewportHeight's
  // comment for why this matters on top of the CSS fix alone.
  const viewportHeight = useVisualViewportHeight();
  return (
    <div
      className={styles.overlay}
      style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
      aria-hidden="true"
    />
  );
}
