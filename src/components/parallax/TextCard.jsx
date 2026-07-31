import styles from './TextCard.module.css';

/**
 * TextCard
 *
 * A glassmorphism card that floats between parallax layers.
 * Opacity is controlled imperatively via cardRef.
 *
 * Props:
 *   content   - the text string to display
 *   variant   - 'hero' (large) | 'body' (paragraph)
 *   cardRef   - ref forwarded from parent
 */
export default function TextCard({ content, variant = 'body', cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[variant]}`}
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      {content}
    </div>
  );
}
