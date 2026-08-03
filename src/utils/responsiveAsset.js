const MOBILE_BREAKPOINT = 768;

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT;
}

/**
 * Picks the mobile-sized asset when on a small viewport, otherwise the
 * full-resolution one. Deciding in JS (rather than via <img srcset>) keeps
 * this in sync with what the loading screen preloads — native srcset
 * selection can still choose the large image on high-DPR phones.
 */
export function pickResponsiveSrc(item) {
  return isMobileViewport() && item.srcMobile ? item.srcMobile : item.src;
}
