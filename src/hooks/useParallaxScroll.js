import { useEffect, useRef, useState, useCallback } from 'react';
import { ZOOM_CONFIG, SCROLL_CONFIG } from '../data/parallaxConfig';

/**
 * useParallaxScroll
 *
 * Manages smooth scroll progress with lerp easing.
 * Returns a ref to the current scroll progress (0 to 1).
 * Uses a ref (not state) to avoid re-renders on every frame.
 *
 * @param {Function} onFrame - Called every animation frame with (progress, smoothScroll)
 */
export function useParallaxScroll(onFrame) {
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const rafRef = useRef(null);

  const getMetrics = useCallback(() => {
    const bodyHeight = document.body.scrollHeight;
    const vh = window.innerHeight;
    const totalRange = Math.max(1, bodyHeight - vh);
    return { vh, totalRange };
  }, []);

  useEffect(() => {
    const { totalRange } = getMetrics();

    const handleScroll = () => {
      const { totalRange: range } = getMetrics();
      targetScrollRef.current = Math.min(range, Math.max(0, window.scrollY));
    };

    const animate = () => {
      const { totalRange: range } = getMetrics();
      const diff = targetScrollRef.current - currentScrollRef.current;

      // Lerp easing
      if (Math.abs(diff) < 0.5) {
        currentScrollRef.current = targetScrollRef.current;
      } else {
        currentScrollRef.current += diff * ZOOM_CONFIG.easing;
      }

      const progress = Math.min(1, Math.max(0, currentScrollRef.current / range));
      onFrame(progress, currentScrollRef.current);

      rafRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    currentScrollRef.current = Math.min(totalRange, window.scrollY);
    targetScrollRef.current = currentScrollRef.current;

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onFrame, getMetrics]);
}

/**
 * Utility: Calculate parallax Y offset for a layer
 */
export function calcLayerOffset(progress, speed, baseRange, viewportHeight) {
  const maxRange = viewportHeight * 1.8;
  const finalRange = Math.min(baseRange, maxRange);
  const speedFactor = 0.7 + speed * 1.4;
  let offset = (0.5 - progress) * finalRange * 1.1 * speedFactor;
  const maxOffset = viewportHeight * 1.0;
  return Math.min(maxOffset, Math.max(-maxOffset, offset));
}

/**
 * Utility: Calculate zoom scale based on scroll progress
 */
export function calcZoomScale(progress) {
  const { start, max } = ZOOM_CONFIG;
  if (progress <= start) return 1;
  let zoomProgress = (progress - start) / (1 - start);
  zoomProgress = 1 - Math.pow(1 - zoomProgress, 1.5);
  return 1 + zoomProgress * (max - 1);
}

/**
 * Utility: Calculate text card opacity (fades in then out within a range)
 */
export function calcTextOpacity(progress, fadeStart, fadeEnd) {
  if (progress < fadeStart || progress > fadeEnd) return 0;
  const range = fadeEnd - fadeStart;
  let t = (progress - fadeStart) / range;
  if (t < 0.5) {
    return Math.sin((t * 2) * Math.PI / 2);
  }
  return Math.sin((2 - t * 2) * Math.PI / 2);
}

/**
 * Utility: Calculate cloud horizontal position
 */
export function calcCloudPosition(progress, cloud) {
  const { startX, endX, speedMult, yPercent } = cloud;
  let adjustedProgress = Math.min(1, progress * speedMult);
  const horizontalPos = startX + adjustedProgress * (endX - startX);
  const oscillation = Math.sin(progress * Math.PI * 2) * 5;
  return {
    x: 50 + horizontalPos + oscillation, // percent from left
    y: yPercent,                          // percent from top
  };
}
