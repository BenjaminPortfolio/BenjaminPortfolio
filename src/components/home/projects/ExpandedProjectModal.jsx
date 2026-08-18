import styles from "./ExpandedProjectModal.module.css";
import { getMediaType } from "../../../utils/getMediaType";
import { useVisualViewportHeight } from "../../../hooks/useVisualViewportHeight";

export default function ExpandedProjectModal({ project, onClose }) {
  if (!project) return null;

  const type = getMediaType(project.src);
  const viewportHeight = useVisualViewportHeight();
  const contentMaxHeight =
    viewportHeight > 0
      ? `${Math.max(viewportHeight * 0.88 - 40, 300)}px`
      : undefined;

  return (
    <div className={styles.wrapper}>
      {/* Close button */}
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close"
        style={{
          top: `max(28px, env(safe-area-inset-top, 0px))`,
          right: `max(28px, env(safe-area-inset-right, 0px))`,
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "700" }}>✕</span>
      </button>

      {/* Click empty area to close */}
      <div className={styles.modal} onClick={onClose}>
        <div
          className={styles.content}
          style={contentMaxHeight ? { maxHeight: contentMaxHeight } : undefined}
        >
          {type === "video" ? (
            <video
              src={project.src}
              controls
              autoPlay
              muted
              preload="none"
              loop
              playsInline
              className={styles.media}
            />
          ) : (
            <img
              src={project.src}
              alt=""
              className={styles.media}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
