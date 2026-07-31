import { useMemo, useState, useCallback } from "react";

import ClassicProjectItem from "./ClassicProjectItem";

import styles from "./ClassicProjectGrid.module.css";

export default function ClassicProjectGrid({ projects }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const visibleProjects = useMemo(() => projects, [projects]);

  return (
    <div className={styles.scrollArea}>
      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <ClassicProjectItem
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
