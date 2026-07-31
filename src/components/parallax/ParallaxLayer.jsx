import { useRef } from 'react';
import styles from './ParallaxLayer.module.css';

/**
 * ParallaxLayer
 *
 * A single depth image layer in the scene.
 * Receives its transform imperatively via a ref for maximum performance
 * (avoids React re-renders on every scroll frame).
 *
 * Props:
 *   src        - image URL
 *   layerRef   - ref forwarded from parent to allow direct DOM manipulation
 */
export default function ParallaxLayer({ src, layerRef }) {
  return (
    <img
      ref={layerRef}
      src={src}
      className={styles.layer}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
