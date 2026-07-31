import { useEffect, useRef, memo } from "react";

import styles from "./MarqueeProjectItem.module.css";

import { getMediaType } from "../../../../utils/getMediaType";

function MarqueeProjectItem({ project, onClick }) {
  const videoRef = useRef(null);

  const type = getMediaType(project.src);

  // ============================================================
  // PLAY ONLY WHEN VISIBLE using observer
  // ============================================================

  // useEffect(() => {
  //   if (type !== "video" || !videoRef.current) return;

  //   const video = videoRef.current;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         video.play().catch(() => {});
  //       } else {
  //         video.pause();
  //       }
  //     },
  //     {
  //       threshold: 0.35,
  //     },
  //   );

  //   observer.observe(video);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [type]);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    video.play(); // default safe state
  }, [type]);

  return (
    <div className={styles.item} onClick={onClick}>
      {type === "video" ? (
        <video
          ref={videoRef}
          src={project.src}
          muted
          loop
          playsInline
          preload="none"
          className={styles.media}
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
    </div>
  );
}

export default memo(MarqueeProjectItem);
