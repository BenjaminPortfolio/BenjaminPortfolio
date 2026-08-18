import MapItem from "../MapItem";
import MapLoader from "../MapLoader";
import MapPortal from "../MapPortal";
import MapTree from "../MapTree";
// import styles from "../HomePage.module.css";
import styles from "./DesktopMap.module.css";

// Positions/scales/themes for every rotating tree on the map. Pulled into
// one list (instead of 14 near-identical <MapTree> blocks) so all of them
// render with the same `animate` flag.
// `position` objects are built once here (module scope), not inline in the
// component body — that keeps their reference stable across re-renders,
// which is what lets React.memo on MapTree skip re-rendering all 14 trees
// when an unrelated state change re-renders DesktopMap.
const TREES = [
  { top: "20px", left: "20px", scale: 0.4 },
  { top: "65%", left: "35%", scale: 0.4 },
  { top: "30%", left: "70%", scale: 0.4 },
  { top: "80%", left: "15%", scale: 0.4 },
  { top: "10%", left: "45%", scale: 0.25 },
  { top: "50%", left: "5%", scale: 0.55 },
  { top: "40%", left: "85%", scale: 0.3 },
  { top: "72%", left: "60%", scale: 0.45 },
  { top: "15%", left: "90%", scale: 0.2 },
  { top: "55%", left: "50%", scale: 0.35, theme: "themeIce" },
  { top: "22%", left: "22%", scale: 0.5, theme: "themePowder" },
  { top: "88%", left: "75%", scale: 0.28, theme: "themeFrost" },
  { top: "8%", left: "65%", scale: 0.4, theme: "themeGlacier" },
  { top: "60%", left: "92%", scale: 0.22, theme: "themeBlush" },
].map((tree) => ({
  theme: tree.theme,
  position: {
    top: tree.top,
    left: tree.left,
    transform: `scale(${tree.scale})`,
    transformOrigin: "top left",
  },
}));

// Single-instance loaders/switches — hoisted to module scope for the same
// reason as TREES: a stable object reference so memo (where used)
// and prop-diffing don't see a "new" position on every unrelated re-render.
const LOADER_POSITION = {
  top: "621px",
  right: "383px",
  transform: "scale(0.5)",
  transformOrigin: "right top",
};
const PORTAL_POSITION = {
  top: "108px",
  right: "457px",
  transform: "scale(0.5)",
  transformOrigin: "right top",
};
function DesktopMap({ mapItems, handleClick, treePositions }) {
  // Trees stay static — their rotation was opt-in via a now-removed switch.
  const treesAnimated = false;

  return (
    <div className={styles.page}>
      {/* Snow map background */}
      <div className={styles.mapContainer}>
        {/* Bouncing loader — floats above the map (desktop placement) */}
        <MapLoader position={LOADER_POSITION} />
        {/* Server loader — floats on the right side of the map (desktop) */}
        <MapPortal position={PORTAL_POSITION} />
        {/* Rotating tree loaders — floats above the map (desktop placement) */}
        {TREES.map((tree, i) => (
          <MapTree
            key={i}
            theme={tree.theme}
            animate={treesAnimated}
            position={tree.position}
          />
        ))}
        <img
          // src="/assets/home/map_bg.png"
          src="/assets/home/empty_map_bg1.webp"
          alt="Portfolio Map"
          className={styles.mapBg}
          draggable={false}
          width="1920"
          height="1080"
          loading="eager"
          fetchpriority="high"
        />

        {/* Render trees behind the house */}
        {/* {treePositions.filter((tree) => tree.zIndex < 10).map((tree, idx) => (
          <img
            key={`tree-back-${idx}`}
            src="/assets/home/single_tree.svg"
            alt="Tree"
            style={{
              position: "absolute",
              top: tree.top,
              left: tree.left,
              width: tree.width,
              height: "auto",
              zIndex: tree.zIndex,
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ))} */}

        {/* Render trees in front of the house */}
        {/* {treePositions.filter((tree) => tree.zIndex > 10).map((tree, idx) => (
          <img
            key={`tree-front-${idx}`}
            src="/assets/home/single_tree.svg"
            alt="Tree"
            style={{
              position: "absolute",
              top: tree.top,
              left: tree.left,
              width: tree.width,
              height: "auto",
              zIndex: tree.zIndex,
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ))} */}

        {/* Render all map items */}
        {mapItems.map((item) => {
          return (
            <MapItem
              key={item.id}
              label={item.label}
              clip={item.clip}
              videoSrc={item.videoSrc}
              imageSrc={item.imageSrc}
              style={item.desktop.position}
              tagPosition={item.desktop.tagPosition}
              mediaOffsetY={item.desktop.mediaOffsetY}
              onClick={() => handleClick(item.id)}
              disabled={item.disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DesktopMap;
