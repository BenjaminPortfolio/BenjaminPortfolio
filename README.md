# Benjamin Portfolio — React + Vite + Framer Motion

A scroll-driven parallax portfolio with multi-layer depth, cloud animations, and glassmorphism text cards.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── parallax/
│   │   ├── ParallaxScene.jsx      ← Orchestrates ALL scroll-driven animation
│   │   ├── ParallaxLayer.jsx      ← Individual depth image layer
│   │   ├── CloudLayer.jsx         ← Horizontally drifting cloud
│   │   └── TextCard.jsx           ← Glassmorphism text overlay
│   └── ui/
│       ├── Overlay.jsx            ← Top/bottom vignette gradient
│       └── CTAButton.jsx          ← Scroll-in call-to-action button
├── hooks/
│   ├── useParallaxScroll.js       ← Smooth scroll loop + utility math
│   └── useWindowSize.js           ← Reactive window dimensions
├── data/
│   └── parallaxConfig.js          ← ⭐ ALL content & tuning lives here
├── styles/
│   └── global.css                 ← Design tokens (CSS variables)
├── App.jsx
└── main.jsx
```

---

## ✏️ How to Customize

### Change text content
Edit `src/data/parallaxConfig.js` → `TEXT_CARDS` array.

### Add/remove layers
Edit `LAYERS` array in `parallaxConfig.js`. Add your PNG to `public/assets/`.

### Tune parallax feel
- `ZOOM_CONFIG.easing` — lower = smoother, higher = snappier
- `ZOOM_CONFIG.max` — how much zoom at end of scroll
- `layer.speed` — higher = more parallax offset (faster movement)
- `layer.baseRange` — total pixel travel range

### Change the CTA button
Edit `CTA_CONFIG` in `parallaxConfig.js`.

### Add new sections after the parallax
Add components below the comment in `src/App.jsx`:
```jsx
{/* ADD MORE SECTIONS BELOW */}
<AboutSection />
<WorkSection />
<ContactSection />
```

---

## 🏗️ Performance Notes

- All scroll animations are **imperative** (direct DOM ref manipulation), NOT React state updates
- This means 0 React re-renders during scroll — full 60fps
- `will-change: transform` applied to all animated elements
- Passive scroll event listener for maximum scroll performance

---

## 📦 Build for Production

```bash
npm run build
# Output in /dist — deploy to Netlify, Vercel, etc.
```
