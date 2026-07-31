import { useMemo, useState } from "react";

import MarqueeRow from "./MarqueeRow";
import ExpandedProjectModal from "../ExpandedProjectModal";

import styles from "./MarqueeProjectGrid.module.css";
// ============================================================
// FIXED NUMBER OF ROWS
// ============================================================

const ROW_COUNT = 3;

export default function MarqueeProjectGrid({ projects }) {
  const [expandedProject, setExpandedProject] = useState(null);

  // ============================================================
  // SHUFFLE ONLY ONCE
  // prevents videos from remounting repeatedly
  // ============================================================

  const [shuffledProjects] = useState(() =>
    [...projects].sort(() => Math.random() - 0.5),
  );

  // ============================================================
  // DISTRIBUTE PROJECTS ACROSS ROWS
  // ============================================================

  const rows = useMemo(() => {
    const result = Array.from({ length: ROW_COUNT }, () => []);

    shuffledProjects.forEach((project, index) => {
      result[index % ROW_COUNT].push(project);
    });

    return result;
  }, [shuffledProjects]);

  return (
    <>
      <div className={styles.scrollArea}>
        <div className={styles.rows}>
          {rows.map((row, index) => (
            <MarqueeRow
              key={`row-${index}`}
              projects={row}
              direction={index % 2 === 0 ? "ltr" : "rtl"}
              speed={40 + index}
              onProjectClick={setExpandedProject}
            />
          ))}
        </div>
      </div>

      <ExpandedProjectModal
        project={expandedProject}
        onClose={() => setExpandedProject(null)}
      />
    </>
  );
}
