import { useEffect, useState } from 'react';

/**
 * useVisualViewportHeight
 *
 * Returns the current TRUE visible viewport height in px, kept in sync via
 * the visualViewport API (falls back to window.innerHeight where it isn't
 * supported).
 *
 * Why this exists: CSS `100dvh` is the right tool for this, but it only
 * works on browser versions that implement it correctly — some real-world
 * mobile Safari versions have had buggy/partial dvh support, so a
 * position:fixed element sized with `height: 100dvh` can still visually
 * detach from the viewport for a frame during the URL bar's collapse/
 * expand animation. Driving the height directly from JS via
 * visualViewport's own resize/scroll events (which fire continuously
 * through that exact transition) is a more reliable fallback layer on top
 * of the CSS fix, not a replacement for it.
 */
export function useVisualViewportHeight() {
  const [height, setHeight] = useState(() =>
    typeof window === 'undefined'
      ? 0
      : window.visualViewport?.height ?? window.innerHeight,
  );

  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => {
      setHeight(vv?.height ?? window.innerHeight);
    };

    update();

    if (vv) {
      vv.addEventListener('resize', update);
      vv.addEventListener('scroll', update);
    }
    window.addEventListener('resize', update);

    return () => {
      if (vv) {
        vv.removeEventListener('resize', update);
        vv.removeEventListener('scroll', update);
      }
      window.removeEventListener('resize', update);
    };
  }, []);

  return height;
}
