import { useState, useEffect } from "react";
import styles from "./LoadingScreen.module.css";

/**
 * LoadingScreen
 *
 * Phase 1: Preloads all images, shows progress bar
 * Phase 2: Shows title + Start Now button
 * Phase 3: On click, calls onComplete() to reveal parallax
 *
 * Props:
 *   imageSrcs   - array of image URLs to preload
 *   onComplete  - callback fired when user clicks Start Now
 */
export default function LoadingScreen({ imageSrcs, onComplete }) {
  const [progress, setProgress] = useState(0); // 0–100
  const [phase, setPhase] = useState("loading"); // 'loading' | 'ready'

  useEffect(() => {
    let loaded = 0;
    const total = imageSrcs.length;

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };
        img.src = src;
      });

    //if you want super fast loading if the images are being cached already by the browser replace the promise block with this:
    /* Promise.all(imageSrcs.map(loadImage)).then(() => {
      // Small delay so user sees 100% before transitioning
      setTimeout(() => setPhase("ready"), 400);
    }); */

    //with a minimum delay of 500 ms to ensure the loading screen is visible even if images load instantly from cache
    const start = Date.now();

    Promise.all(imageSrcs.map(loadImage)).then(() => {
      const elapsed = Date.now() - start;
      const minDuration = 500; // ← minimum 1.5 seconds of loading screen
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(() => setPhase("ready"), remaining + 400);
    });
  }, [imageSrcs]);

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        {/* ── PHASE 1: Loading ── */}
        <div
          className={`${styles.loadingState} ${phase === "ready" ? styles.hidden : ""}`}
        >
          <p className={styles.loadingLabel}>Loading...</p>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={styles.progressPercent}>{progress}%</p>
        </div>

        {/* ── PHASE 2: Ready ── */}
        <div
          className={`${styles.readyState} ${phase === "ready" ? styles.visible : ""}`}
        >
          <div className={styles.title}>
            Benjamin
            <br />
            <span className={styles.subhead}>
              Where creativity meets craftsmanship
            </span>
          </div>
          <button className={styles.startButton} onClick={onComplete}>
            START JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
}
