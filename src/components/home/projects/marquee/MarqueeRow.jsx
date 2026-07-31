import MarqueeProjectItem from "./MarqueeProjectItem";

import styles from "./MarqueeRow.module.css";

export default function MarqueeRow({
  projects,
  direction,
  speed,
  onProjectClick,
}) {
  return (
    <div className={styles.rowWrapper}>
      <div
        className={`${styles.track} ${
          direction === "ltr" ? styles.ltr : styles.rtl
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {projects.map((project) => (
          <MarqueeProjectItem
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
}
