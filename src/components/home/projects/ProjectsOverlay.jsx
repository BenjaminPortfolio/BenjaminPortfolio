import { useState, useEffect } from "react";
import { PROJECTS } from "../../../data/projectData.js";
import { FEATURED_PROJECTS } from "../../../data/featuredProjects.js"; // to show in all projects category
import { CATEGORIES } from "../../../data/categories.js";
import MarqueeProjectGrid from "./marquee/MarqueeProjectGrid.jsx";
import ClassicProjectGrid from "./classic/ClassicProjectGrid.jsx";
import styles from "./ProjectsOverlay.module.css";

/**
 * ProjectsOverlay
 *
 * Full-screen glassmorphic overlay with:
 * - Left sidebar: category tabs
 * - Right panel: scrollable image grid with expand/collapse
 * - Back arrow to close
 *
 * Props:
 *   onClose - called when back arrow is clicked
 */
export default function ProjectsOverlay({ onClose }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Filter projects based on active category
  const filtered =
    activeCategory === "all"
      ? FEATURED_PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const faId = "projects-overlay-fa";
    if (!document.getElementById(faId)) {
      const link = document.createElement("link");
      link.id = faId;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.overlay}>
        {/* ── LEFT SIDEBAR ── */}
        <aside
          className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""}`}
        >
          <div className={styles.sidebarInner}>
            {/* Category tabs */}
            <nav className={styles.tabs}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className={styles.tabTitle}>{cat.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main
          className={`${styles.panel} ${isSidebarCollapsed ? styles.panelExpanded : ""}`}
        >
          <div
            className={`${styles.topBar} ${!isSidebarCollapsed ? styles.topBarExpanded : ""}`}
          >
            <div className={styles.topBarLeft}>
              <button
                type="button"
                className={`${styles.backBtn} ${isSidebarCollapsed ? styles.backBtnCollapsed : ""}`}
                onClick={toggleSidebar}
                aria-label={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
              >
                <i
                  className={`fas ${isSidebarCollapsed ? "fa-bars" : "fa-times"}`}
                />
                <span>{"Categories"}</span>
              </button>
              <div className={styles.topBarTitle}>Projects Section</div>
            </div>

            <button
              type="button"
              className={styles.topRightClose}
              onClick={() => {
                if (typeof onClose === "function") onClose();
              }}
              aria-label="Close modal"
            >
              <i className="fas fa-times" />
            </button>
          </div>

          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Explore MY Gallery</h1>
              <p className={styles.subtitle}>
                A curated gallery of my work, showcasing how ideas turn into
                impactful visuals across design, motion, and digital experiences
              </p>
            </div>
          </div>

          {/* Scrollable grid */}
          {activeCategory === "all" ? (
            <MarqueeProjectGrid projects={filtered} />
          ) : (
            <ClassicProjectGrid projects={filtered} />
          )}
        </main>
      </div>
    </div>
  );
}
