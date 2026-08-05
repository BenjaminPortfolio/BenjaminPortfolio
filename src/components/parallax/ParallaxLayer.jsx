import styles from './ParallaxLayer.module.css';

/**
 * ParallaxLayer
 *
 * A single depth image layer in the scene.
 * Receives its transform imperatively via a ref for maximum performance
 * (avoids React re-renders on every scroll frame).
 *
 * Props:
 *   src        - image URL (already resolved to the mobile/desktop variant)
 *   layerRef   - ref forwarded from parent to allow direct DOM manipulation
 *   bgFill     - when true, renders as a fixed background-fill image
 *                (covers the viewport at every dynamic height with no
 *                repaint, replacing the glitchy background-attachment:
 *                fixed approach on mobile)
 *   fillHeight - optional JS-measured viewport height (px) to force via
 *                inline style, as a fallback for mobile browsers whose
 *                dvh support doesn't perfectly track the URL bar's
 *                collapse/expand animation
 */
export default function ParallaxLayer({ src, layerRef, bgFill = false, fillHeight }) {
  return (
    <img
      ref={layerRef}
      src={src}
      className={bgFill ? styles.bgFill : styles.layer}
      style={bgFill && fillHeight ? { height: `${fillHeight}px` } : undefined}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
