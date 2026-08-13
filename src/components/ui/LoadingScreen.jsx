import { useState, useEffect } from "react";
import styles from "./LoadingScreen.module.css";
import SplitText from "./SplitText";
import ClickSpark from "./ClickSpark";

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
        const finish = () => {
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };
        img.onload = () => {
          // Fetching is only half of "loaded" — decoding is often deferred
          // by the browser until the image actually needs to paint, which
          // is exactly what caused a visible jank/blink the first time
          // these images appeared in the parallax scene. Forcing the
          // decode now, while the progress bar is still showing, means
          // every image is genuinely paint-ready before "100%".
          if (img.decode) {
            img.decode().then(finish).catch(finish);
          } else {
            finish();
          }
        };
        img.onerror = finish;
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
      {/* ClickSpark overlays a transparent canvas on the whole loading screen
          and emits sparks wherever the user clicks (including the START
          JOURNEY button). .sparkContent re-centers the .content column so the
          layout stays exactly as it was before the wrapper was added. */}
      <ClickSpark
        sparkColor="#111111"
        sparkSize={14}
        sparkRadius={55}
        sparkCount={10}
        duration={400}
        easing="ease-out"
        extraScale={1.2}
      >
        <div className={styles.sparkContent}>
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
            {/* SplitText mounts only once the ready phase begins so the
                letter animation plays as the opening text appears */}
            {phase === "ready" && (
              <>
                <SplitText
                  text="Benjamin"
                  tag="span"
                  className={styles.titleWord}
                  delay={90}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars, words"
                  from={{ opacity: 0, y: 50 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
                <br />
                <span className={styles.subhead}>
                  <SplitText
                    text="Where creativity meets"
                    tag="span"
                    className={styles.subheadWord}
                    delay={40}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars, words"
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                  <br />
                  <SplitText
                    text="craftsmanship"
                    tag="span"
                    className={styles.subheadWord}
                    delay={40}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars, words"
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                </span>
              </>
            )}
          </div>
          <button className={styles.startButton} onClick={onComplete}>
            START JOURNEY
          </button>
        </div>
          </div>
        </div>
      </ClickSpark>
    </div>
  );
}