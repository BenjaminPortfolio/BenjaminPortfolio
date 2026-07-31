// ============================================
// PARALLAX SCENE CONFIGURATION
// ============================================
// Edit this file to customize layers, clouds, and text cards.
// No need to touch component files for content changes.

// --- ZOOM SETTINGS ---
export const ZOOM_CONFIG = {
  start: 0.8, // scroll progress when zoom begins (0 to 1)
  max: 1.1, // maximum zoom scale
  easing: 0.08, // lerp smoothing factor (lower = smoother/slower)
};
// Also adjust zoom — we'll disable global zoom since we're doing custom cave effect
// export const ZOOM_CONFIG = {
//   start: 0.5,
//   max: 1.0, // ← set to 1.0 to DISABLE the generic zoom (no more uniform scale-up)
//   easing: 0.08,
// };

// --- SCROLL SETTINGS ---
export const SCROLL_CONFIG = {
  totalViewportMultiplier: 7, // body height = this × 100vh
};

// --- IMAGE LAYERS ---
// Ordered back-to-front (index 0 is furthest back)
// speed: how fast this layer moves (higher = more parallax offset)
// baseRange: the total pixel range of movement
export const LAYERS = [
  {
    id: "layer8",
    src: "/assets/8.png",
    speed: 0.22,
    baseRange: 2200,
    sticksToBottom: true,
  },
  {
    id: "layer7",
    src: "/assets/7.png",
    speed: 0.12,
    baseRange: 2000,
    sticksToBottom: true,
  },
  {
    id: "layer6",
    src: "/assets/6.png",
    speed: 0.22,
    baseRange: 2200,
    sticksToBottom: true,
  },
  {
    id: "layer5",
    src: "/assets/5.png",
    speed: 0.34,
    baseRange: 2400,
    sticksToBottom: true,
  },
  {
    id: "layer4",
    src: "/assets/4.png",
    speed: 0.46,
    baseRange: 2600,
    sticksToBottom: true,
  },
  {
    id: "layer2",
    src: "/assets/2.png",
    speed: 0.6,
    baseRange: 2000,
    sticksToBottom: true,
  },
  { id: "layer3", src: "/assets/3.png", speed: 0.5, baseRange: 1900 },
  {
    id: "layer1",
    src: "/assets/1.png",
    speed: 0.6,
    baseRange: 3000,
    // isForeground: true,
    sticksToBottom: true,
  },
];

// --- CLOUD LAYERS ---
// moveType: 'ltr' (left to right) or 'rtl' (right to left)
// startX / endX: horizontal position as % offset from center (e.g. -70 = 30% from left)
// yPercent: vertical position as % of viewport height
// speedMult: multiplier on scroll progress (1 = full range, 0.5 = half speed)
export const CLOUDS = [
  {
    id: "cloud1",
    src: "/assets/cloud1.png",
    moveType: "ltr",
    startX: -70,
    endX: 70,
    yPercent: 27,
    speedMult: 0.6,
    opacity: 0.75,
    width: 400,
  },
  {
    id: "cloud2",
    src: "/assets/cloud2.png",
    moveType: "rtl",
    startX: 70,
    endX: -70,
    yPercent: 77,
    speedMult: 0.8,
    opacity: 0.75,
    width: 700,
  },
  {
    id: "cloud3",
    src: "/assets/cloud3.png",
    moveType: "ltr",
    startX: -80,
    endX: 60,
    // yPercent: 103,
    yPercent: 133,
    speedMult: 1.0,
    opacity: 0.75,
    width: 700,
  },
];

// --- TEXT CARDS ---
// fadeStart / fadeEnd: scroll progress range during which text fades in then out
// variant: 'hero' (large centered) | 'body' (paragraph style)
export const TEXT_CARDS = [
  {
    id: "text1",
    content: "Welcome to the Depths",
    fadeStart: 0,
    fadeEnd: 0.35,
    variant: "hero",
  },
  {
    id: "text2",
    content:
      "In a world where imagination shapes reality, one artist crafts stories, worlds, and heroes. Enter the realm of Benjamin, the Game Artist who turns ideas into living worlds.",
    fadeStart: 0.25,
    fadeEnd: 0.65,
    variant: "body",
  },
  // {
  //   id: "text3",
  //   content:
  //     "In a world shaped by imagination, Benjamin brings ideas to life — crafting characters, worlds, and stories that feel real. Step into his creative space and explore the work behind the worlds.",
  //   fadeStart: 0.55,
  //   fadeEnd: 0.95,
  //   variant: "body",
  // },
];

// --- CTA BUTTON ---
export const CTA_CONFIG = {
  label: "✨ LET'S GET STARTED ✨",
  href: "#contact", // Change to your target section or URL
  fadeInAt: 0.7, // scroll progress when button fades in
};

// --- BACKGROUND ---
export const BACKGROUND_CONFIG = {
  src: "/assets/9.png", // Fixed background image
};
