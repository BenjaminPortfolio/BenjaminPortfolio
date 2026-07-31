import { useEffect, useRef, useState, memo, useCallback } from "react";

import styles from "./ClassicProjectItem.module.css";

import { getMediaType } from "../../../../utils/getMediaType";

function ClassicProjectItem({ project, isExpanded, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const videoRef = useRef(null);
  const itemRef = useRef(null);

  const type = getMediaType(project.src);

  const handleToggle = useCallback(
    (e) => {
      e.stopPropagation();
      onToggle();
    },
    [onToggle],
  );

  useEffect(() => {
    if (type !== "video" || !videoRef.current || !itemRef.current) return;

    const video = videoRef.current;
    const node = itemRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [type]);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const video = videoRef.current;

    if (!isVisible && !isExpanded) {
      video.pause();
      video.muted = true;
      video.volume = 0;
      return;
    }

    video.muted = !isExpanded;
    video.volume = isExpanded ? 1 : 0;

    if (video.paused) {
      video.play().catch(() => {});
    }
  }, [type, isVisible, isExpanded]);

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${isExpanded ? styles.expanded : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
    >
      {type === "video" ? (
        <video
          ref={videoRef}
          src={project.src}
          muted={!isExpanded}
          loop
          playsInline
          preload="metadata"
          className={styles.media}
          poster={project.poster || ""}
        />
      ) : (
        <img
          src={project.src}
          alt=""
          className={styles.media}
          draggable={false}
          loading="lazy"
        />
      )}

      <button
        className={`${styles.expandBtn} ${hovered ? styles.visible : ""}`}
        onClick={handleToggle}
      >
        {isExpanded ? "−" : "+"}
      </button>
    </div>
  );
}

export default memo(ClassicProjectItem);
