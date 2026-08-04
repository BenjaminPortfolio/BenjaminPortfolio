import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
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
  const [glassReady, setGlassReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState(null);
  const categoryMenuRef = useRef(null);
  const backBtnRef = useRef(null);
  const dropdownPortalRef = useRef(null);

  // Position the portaled dropdown against the button's live position —
  // it renders outside the overlay's stacking context, so it can no
  // longer rely on being an absolutely-positioned CSS child of the button.
  useLayoutEffect(() => {
    if (!isCategoryMenuOpen || !backBtnRef.current) return;

    const updatePos = () => {
      const rect = backBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, [isCategoryMenuOpen]);

  // Keep isMobile in sync with viewport (not just the value at mount)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Close the mobile category dropdown on outside click / Escape
  useEffect(() => {
    if (!isCategoryMenuOpen) return;

    const handlePointerDown = (e) => {
      const inButton = categoryMenuRef.current?.contains(e.target);
      const inPortal = dropdownPortalRef.current?.contains(e.target);
      if (!inButton && !inPortal) {
        setIsCategoryMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsCategoryMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCategoryMenuOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsCategoryMenuOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  const handleCategorySelect = (id) => {
    setActiveCategory(id);
    setIsCategoryMenuOpen(false);
  };

  // On mobile the sidebar drawer is replaced by the dropdown — keep it collapsed
  const sidebarCollapsed = isMobile ? true : isSidebarCollapsed;
  const menuOpen = isMobile ? isCategoryMenuOpen : !isSidebarCollapsed;

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

  // Wait for the slide-up animation (0.35s) to finish before enabling
  // backdrop-filter blur. The expensive blur only runs on a settled
  // frame — never during the opening animation — so the gradient paints
  // instantly AND the glassmorphism effect returns right after.
  useEffect(() => {
    const id = setTimeout(() => setGlassReady(true), 380);
    return () => clearTimeout(id);
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
      <div
        className={`${styles.overlay} ${glassReady ? styles.glassReady : ""}`}
      >
        {/* ── LEFT SIDEBAR (desktop only — mobile uses the Categories dropdown) ── */}
        <aside
          className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}
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
          className={`${styles.panel} ${sidebarCollapsed ? styles.panelExpanded : ""}`}
        >
          <div
            className={`${styles.topBar} ${!sidebarCollapsed ? styles.topBarExpanded : ""}`}
          >
            <div className={styles.topBarLeft}>
              {isMobile && (
                <div className={styles.categoryMenuWrap} ref={categoryMenuRef}>
                  <button
                    ref={backBtnRef}
                    type="button"
                    className={`${styles.backBtn} ${!menuOpen ? styles.backBtnCollapsed : ""}`}
                    onClick={toggleSidebar}
                    aria-haspopup="true"
                    aria-expanded={isCategoryMenuOpen}
                    aria-label={menuOpen ? "Collapse categories" : "Expand categories"}
                  >
                    <i className={`fas ${!menuOpen ? "fa-bars" : "fa-times"}`} />
                    <span>{"Categories"}</span>
                  </button>

                  {/* ── Mobile category dropdown — portaled to <body> so it can't
                       get buried by ancestor stacking-context/compositing quirks
                       (animated transforms, backdrop-filter, marquee video
                       layers) ── */}
                  {isCategoryMenuOpen &&
                    dropdownPos &&
                    createPortal(
                      <nav
                        ref={dropdownPortalRef}
                        className={styles.categoryDropdown}
                        style={{
                          position: "fixed",
                          top: dropdownPos.top,
                          left: dropdownPos.left,
                          minWidth: dropdownPos.width,
                        }}
                      >
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            className={`${styles.dropdownItem} ${activeCategory === cat.id ? styles.dropdownItemActive : ""}`}
                            onClick={() => handleCategorySelect(cat.id)}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </nav>,
                      document.body,
                    )}
                </div>
              )}
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
              <h1 className={styles.title}>Explore My Gallery</h1>
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
