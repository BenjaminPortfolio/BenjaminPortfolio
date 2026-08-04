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
