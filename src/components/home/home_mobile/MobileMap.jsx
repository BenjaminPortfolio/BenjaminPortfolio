import { useEffect, useState } from "react";
import MapItem from "../MapItem";
import styles from "./MobileMap.module.css";

export default function MobileMap({ mapItems, handleClick, treePositions }) {
  const DEBUG_TREES = false;
  const [atBottom, setAtBottom] = useState(false);

  // Track scroll position — when the user reaches the bottom of the tall
  // map, flip the hint to "Scroll up" (and back to "Scroll down" at top).
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight;
      const clientHeight = doc.clientHeight;
      // Within ~40px of the bottom → show "Scroll up"
      setAtBottom(scrollHeight - (scrollTop + clientHeight) < 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.mapContainer}>
        {/* Scroll hint — fixed to the bottom of the viewport so it stays
            visible while the user scrolls the tall map. Flips to
            "Scroll up" once the user reaches the bottom. */}
        <div
          className={`${styles.scrollHint} ${atBottom ? styles.scrollHintUp : ""}`}
          aria-hidden="true"
        >
          <span className={styles.scrollHintText}>
            {atBottom ? "Scroll up" : "Scroll down"}
          </span>
          <span className={styles.scrollHintArrow}>
            {atBottom ? "↑" : "↓"}
          </span>
        </div>
        <img
          src="/assets/home/mobile_map_path_new.webp"
          alt="Portfolio Map"
          className={styles.mapImage}
          draggable={false}
          width="1351"
          height="4096"
          decoding="async"
          fetchpriority="high"
        />

        {/* Map items go here later */}
        {mapItems.map((item) => {
          return (
            <MapItem
              key={item.id}
              label={item.label}
              videoSrc={item.videoSrc}
              imageSrc={item.imageSrc}
              style={item.mobile.position}
              tagPosition={item.mobile.tagPosition}
              onClick={() => handleClick(item.id)}
              disabled={item.disabled}
            />
          );
        })}

        {/* tree positions */}
        {treePositions.map((tree, i) => (
          <img
            key={i}
            src="/assets/home/single_tree.svg"
            style={{
              ...tree,
              outline: DEBUG_TREES ? `2px solid ${tree.debug}` : undefined,
              background: DEBUG_TREES ? tree.debug : undefined,
              opacity: DEBUG_TREES ? 0.6 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
