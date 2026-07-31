import { forwardRef } from 'react';
import { CTA_CONFIG } from '../../data/parallaxConfig';
import styles from './CTAButton.module.css';

/**
 * CTAButton
 *
 * The call-to-action button that fades in at the end of the scroll.
 * Uses forwardRef so the parent can control opacity imperatively.
 *
 * Props:
 *   onClick   - override handler (optional)
 */
const CTAButton = forwardRef(function CTAButton({ onClick }, ref) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    } else {
      // Default: scroll to href target if it's an ID
      const target = document.querySelector(CTA_CONFIG.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Welcome! Ready to begin your journey?');
      }
    }
  };

  return (
    <a
      ref={ref}
      href={CTA_CONFIG.href}
      className={styles.button}
      onClick={handleClick}
      style={{ opacity: 0 }} // driven imperatively by ParallaxScene
    >
      {CTA_CONFIG.label}
    </a>
  );
});

export default CTAButton;
