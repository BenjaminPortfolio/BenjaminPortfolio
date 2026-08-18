const prefetched = new Set();

/**
 * Fire-and-forget background prefetch — warms the browser's HTTP cache for
 * assets that aren't needed on this page yet (e.g. home/about/contact media
 * while the user is still on the parallax intro), so navigating there later
 * hits cache instead of the network. Never blocks or throws; doesn't touch
 * any visible loading UI.
 */
export function prefetchAssets(urls) {
  urls.forEach((url) => {
    if (!url || prefetched.has(url)) return;
    prefetched.add(url);
    fetch(url, { credentials: 'same-origin' }).catch(() => {});
  });
}

// The About/Services overlays both inject this stylesheet on first open;
// the Services overlay's Spline scene binary is by far the heaviest asset
// either modal loads. Both are needed the instant either modal opens, so
// they're worth warming in the background wherever the user is likely to
// have idle time before tapping into a modal (the parallax intro, and a
// direct landing on /home).
export const MODAL_CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
];

let splineModulePrefetched = false;

/**
 * Warms the Spline React wrapper's JS chunk (a multi-hundred-KB dynamic
 * import) ahead of time, so ServicesOverlay's own lazy import resolves
 * from cache instead of triggering the download the moment it's clicked.
 */
export function prefetchSplineModule() {
  if (splineModulePrefetched) return;
  splineModulePrefetched = true;
  import('@splinetool/react-spline').catch(() => {});
}
