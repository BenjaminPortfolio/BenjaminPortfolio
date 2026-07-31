import styles from "./ExpandedProjectModal.module.css";
import { getMediaType } from "../../../utils/getMediaType";

export default function ExpandedProjectModal({ project, onClose }) {
  if (!project) return null;

  const type = getMediaType(project.src);

  return (
    <div className={styles.wrapper}>
      {/* Close button */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        <span style={{ fontSize: "18px", fontWeight: "700" }}>✕</span>
      </button>

      {/* Click empty area to close */}
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.content}>
          {type === "video" ? (
            <video
              src={project.src}
              controls
              autoPlay
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
