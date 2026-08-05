// src/components/parallax/ParallaxScene.jsx

import { useRef, useCallback } from "react";
import ParallaxLayer from "./ParallaxLayer";
import CloudLayer from "./CloudLayer";
import TextCard from "./TextCard";
import {
  useParallaxScroll,
  calcLayerOffset,
  calcZoomScale,
  calcTextOpacity,
  calcCloudPosition,
} from "../../hooks/useParallaxScroll";
import { useVisualViewportHeight } from "../../hooks/useVisualViewportHeight";
import {
  LAYERS,
  CLOUDS,
  TEXT_CARDS,
  ZOOM_CONFIG,
  BACKGROUND_CONFIG,
} from "../../data/parallaxConfig";
import { pickResponsiveSrc } from "../../utils/responsiveAsset";
import styles from "./ParallaxScene.module.css";

// Resolve mobile/desktop src once per mount instead of letting the browser's
// srcset heuristics decide (they can still choose the large image on
// high-DPR phones), keeping this in sync with what LoadingScreen preloads.
const RESOLVED_BACKGROUND = {
  ...BACKGROUND_CONFIG,
  src: pickResponsiveSrc(BACKGROUND_CONFIG),
};
const RESOLVED_LAYERS = LAYERS.map((l) => ({ ...l, src: pickResponsiveSrc(l) }));
const RESOLVED_CLOUDS = CLOUDS.map((c) => ({ ...c, src: pickResponsiveSrc(c) }));

export default function ParallaxScene({ ctaRef }) {
  // One ref slot per layer — LAYERS now has 8 items (index 0–7)
  const layerRefs = useRef(LAYERS.map(() => ({ current: null })));
  const cloudRefs = useRef(CLOUDS.map(() => ({ current: null })));
  const textRefs = useRef(TEXT_CARDS.map(() => ({ current: null })));

  // JS-driven fallback for the .scene/.bgFill dvh sizing — see the hook's
  // own comment for why this matters on top of the CSS dvh fix.
  const viewportHeight = useVisualViewportHeight();


  const onFrame = useCallback(
    (progress) => {
      const vh = window.innerHeight;
      const zoom = calcZoomScale(progress);

   

      // In ParallaxScene.jsx, inside LAYERS.forEach:
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i]?.current;
        if (!el) return;

        // ── Clamp parallax to stop at zoom start point ──
        const parallaxProgress = Math.min(progress, ZOOM_CONFIG.start);

        let offsetY = calcLayerOffset(
          parallaxProgress,
          layer.speed,
          layer.baseRange,
          vh,
        );
        const depthFactor = 0.7 + (i / LAYERS.length) * 0.5;
        const layerZoom = 1 + (zoom - 1) * depthFactor;

        // ── Bottom clamp ── (skip until the image has actually loaded —
        // el.naturalWidth is 0 before then, which turns this into a NaN
        // offset; browsers drop the whole `transform` declaration when it
        // contains NaN, silently reverting to the CSS default transform
        // and leaving the tall layer centered instead of anchored to the
        // bottom, i.e. showing plain sky instead of the mountain art)
        if (layer.sticksToBottom && el.naturalWidth > 0) {
          const imageHeight = el.naturalHeight * (el.width / el.naturalWidth);
          const imageHalfHeight = (imageHeight * layerZoom) / 2;
          const minOffsetY = vh / 2 - imageHalfHeight;
          offsetY = Math.max(offsetY, minOffsetY);
        }

        if (!Number.isFinite(offsetY)) offsetY = 0;

        el.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) scale(${layerZoom})`;
      });

      // Clouds
      CLOUDS.forEach((cloud, i) => {
        const el = cloudRefs.current[i]?.current;
        if (!el) return;
        const { x, y } = calcCloudPosition(progress, cloud);
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
      });

      // Text cards
      TEXT_CARDS.forEach((card, i) => {
        const el = textRefs.current[i]?.current;
        if (!el) return;
        el.style.opacity = calcTextOpacity(
          progress,
          card.fadeStart,
          card.fadeEnd,
        );
      });

      // CTA button — fades in inside the cave
      if (ctaRef?.current) {
        let btnOpacity = 0;
        if (progress >= 0.75) {
          const t = Math.min(1, (progress - 0.75) / 0.2);
          btnOpacity = Math.sin((t * Math.PI) / 2);
        }
        ctaRef.current.style.opacity = btnOpacity;
      }
    },
    [ctaRef],
  );
  useParallaxScroll(onFrame);

  return (
    <div
      className={styles.scene}
      style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
    >
      {/* ── FIXED BACKGROUND FILL — the 9.webp / 9-mobile.webp image,
           rendered as a fixed <img> instead of a CSS background with
           background-attachment: fixed. On mobile, background-attachment:
           fixed is re-rasterized while scrolling (and every time the URL
           bar collapses/expands), which shows the black rectangle/blink.
           A fixed <img> is composited once and never repainted. ── */}
      <ParallaxLayer bgFill src={RESOLVED_BACKGROUND.src} fillHeight={viewportHeight} />

      {/* ── LAYER 8 index=0 — big cloud/bg behind mountains, slow parallax ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[0]} layerRef={layerRefs.current[0]} />

      {/* ── LAYER 7 index=1 — furthest mountain layer ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[1]} layerRef={layerRefs.current[1]} />

      {/* ── CLOUD 1 — between layer7 and text1 ── */}
      <CloudLayer {...RESOLVED_CLOUDS[0]} cloudRef={cloudRefs.current[0]} />

      {/* ── TEXT 1 — between layer7 and layer6 ── */}
      <TextCard {...TEXT_CARDS[0]} cardRef={textRefs.current[0]} />

      {/* ── LAYER 6 index=2 ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[2]} layerRef={layerRefs.current[2]} />

      {/* ── CLOUD 2 — between layer6 and text2 ── */}
      <CloudLayer {...RESOLVED_CLOUDS[1]} cloudRef={cloudRefs.current[1]} />

      {/* ── LAYER 5 index=3 ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[3]} layerRef={layerRefs.current[3]} />
      {/* ── TEXT 2 — between layer6 and layer5 ── */}
      <TextCard {...TEXT_CARDS[1]} cardRef={textRefs.current[1]} />

      {/* ── CLOUD 3 — between layer5 and text3 ── */}
      <CloudLayer {...RESOLVED_CLOUDS[2]} cloudRef={cloudRefs.current[2]} />

      {/* ── TEXT 3 — between layer5 and layer4 ── */}
      <TextCard {...TEXT_CARDS[2]} cardRef={textRefs.current[2]} />

      {/* ── LAYER 4 index=4 ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[4]} layerRef={layerRefs.current[4]} />

      {/* ── LAYER 2 index=5 ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[5]} layerRef={layerRefs.current[5]} />

      {/* ── LAYER 1 index=6 — front/closest layer (layer3 removed: its
           source image, /assets/3.1.png, doesn't exist on disk — was a
           dead 404 request producing nothing visible anyway) ── */}
      <ParallaxLayer {...RESOLVED_LAYERS[6]} layerRef={layerRefs.current[6]} />
    </div>
  );
}
