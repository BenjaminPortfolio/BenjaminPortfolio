import styles from './CloudLayer.module.css';

/**
 * CloudLayer
 *
 * A decorative cloud image that drifts horizontally as you scroll.
 * Position is controlled imperatively via cloudRef for perf.
 *
 * Props:
 *   src        - image URL
 *   width      - image width in px
 *   opacity    - base opacity
 *   cloudRef   - ref forwarded from parent
 */
export default function CloudLayer({ src, width, opacity, cloudRef }) {
  return (
    <img
      ref={cloudRef}
      src={src}
      className={styles.cloud}
      style={{ width: `${width}px`, opacity }}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
