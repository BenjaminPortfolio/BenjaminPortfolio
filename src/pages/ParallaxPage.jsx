import { useRef, useState } from 'react';
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
import '../styles/global.css';
import styles from './ParallaxPage.module.css';

const ALL_IMAGES = [
  BACKGROUND_CONFIG.src,
  ...LAYERS.map((l) => l.src),
  ...CLOUDS.map((c) => c.src),
];

export default function ParallaxPage() {
  const ctaRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => setStarted(true), 600);
  };

  // CTA click → transition to homepage
  const handleCTAClick = (e) => {
    e.preventDefault();
    // Fade out then navigate
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = '';
      navigate('/home');
    }, 500);
  };

  return (
    <>
      <div
        className={styles.page}
        style={{
          height: `${SCROLL_CONFIG.totalViewportMultiplier * 100}vh`,
          minHeight: `${SCROLL_CONFIG.totalViewportMultiplier * 1000}px`,
          backgroundImage: `url('${BACKGROUND_CONFIG.src}')`,
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
