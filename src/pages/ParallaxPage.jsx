import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParallaxScene from '../components/parallax/ParallaxScene';
import Overlay from '../components/ui/Overlay';
import CTAButton from '../components/ui/CTAButton';
import LoadingScreen from '../components/ui/LoadingScreen';
import {
  SCROLL_CONFIG,
  BACKGROUND_CONFIG,
  LAYERS,
  CLOUDS,
} from '../data/parallaxConfig';
import { pickResponsiveSrc, isMobileViewport } from '../utils/responsiveAsset';
import { prefetchAssets } from '../utils/prefetchAssets';
import '../styles/global.css';
import styles from './ParallaxPage.module.css';

const ALL_IMAGES = [
  pickResponsiveSrc(BACKGROUND_CONFIG),
  ...LAYERS.map(pickResponsiveSrc),
  ...CLOUDS.map(pickResponsiveSrc),
];

// Not needed on this page, but needed the moment the user reaches /home or
// opens an overlay — warming these in the background while the parallax
// intro plays means they're already cached by the time they're used,
// without affecting the loading screen's own progress bar/timing.
const SECONDARY_ASSETS = [
  '/assets/home/house_jump_gif2.webp',
  '/assets/home/services_withoutbg.webp',
  '/assets/home/boy_withoutbg.webm',
  '/assets/home/ship_withoutbg.webm',
  '/assets/home/single_tree.svg',
  isMobileViewport()
    ? '/assets/home/mobile_map_path_new.webp'
    : '/assets/home/empty_map_bg1.webp',
  '/assets/about/characters/benjamin_char.webp',
  '/assets/about/characters/benjamin_char2.webp',
  '/assets/about/characters/benjamin_char3.webp',
  '/assets/about/characters/benjamin_char4.webp',
  '/assets/about/characters/benjamin_side_view.webp',
];

export default function ParallaxPage() {
  const ctaRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [started, setStarted] = useState(false);
  const [scrollMultiplier, setScrollMultiplier] = useState(() =>
    isMobileViewport()
      ? SCROLL_CONFIG.totalViewportMultiplierMobile
      : SCROLL_CONFIG.totalViewportMultiplier,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handleChange = (e) => {
      setScrollMultiplier(
        e.matches
          ? SCROLL_CONFIG.totalViewportMultiplierMobile
          : SCROLL_CONFIG.totalViewportMultiplier,
      );
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const handleStart = () => {
    setFadeOut(true);
    // Mobile-only: land a bit into the (intentionally shortened) scene
    // instead of the very top. Desktop keeps its original long scroll and
    // starts at the top like before.
    if (isMobileViewport()) {
      const totalRange = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.max(0, totalRange) * 0.25);
    }
    setTimeout(() => setStarted(true), 600);

    // Only NOW start prefetching secondary (home/about/contact) assets —
    // this only fires once the critical parallax images have already
    // finished loading (that's what unlocks the Start Journey button in
    // the first place). Firing it earlier, in parallel with the critical
    // images, competes for the same limited concurrent-connection slots on
    // a real mobile network and can slow down the loading screen itself.
    prefetchAssets(SECONDARY_ASSETS);
  };

  // Some browsers restore the previous scroll position on load/refresh
  // (history.scrollRestoration defaults to "auto"), which left the
  // parallax's initial progress slightly above 0 instead of starting
  // clean at the top.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // The loading/"Start Journey" screen sits on top of the (very tall)
  // parallax page, which is otherwise still scrollable underneath it —
  // lock scroll until the user actually starts, then release it. Both
  // html and body need the lock: overflow:hidden on body alone doesn't
  // reliably block scrolling in every browser.
  useEffect(() => {
    const value = started ? '' : 'hidden';
    document.body.style.overflow = value;
    document.documentElement.style.overflow = value;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [started]);

  // CTA click → transition to homepage
  const handleCTAClick = (e) => {
    e.preventDefault();
    // Fade out then navigate
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = '';
      // React Router doesn't reset scroll on navigation — without this,
      // the mobile "start 25% in" scroll position on this page carries
      // straight into the home map, landing on Contact instead of the
      // Projects house at the top.
      window.scrollTo(0, 0);
      navigate('/home');
    }, 500);
  };

  return (
    <>
      <div
        className={styles.page}
        style={{
          height: `${scrollMultiplier * 100}vh`,
          minHeight: `${scrollMultiplier * 1000}px`,
        }}
      >
        <ParallaxScene ctaRef={ctaRef} />
        <Overlay />
        <CTAButton ref={ctaRef} onClick={handleCTAClick} />
      </div>

      {!started && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: fadeOut ? 'none' : 'auto',
          }}
        >
          <LoadingScreen imageSrcs={ALL_IMAGES} onComplete={handleStart} />
        </div>
      )}
    </>
  );
}
