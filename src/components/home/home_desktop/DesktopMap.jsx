import React from "react";
import MapItem from "../MapItem";
// import styles from "../HomePage.module.css";
import styles from "./DesktopMap.module.css";

function DesktopMap({ mapItems, handleClick, treePositions }) {
  return (
    <div className={styles.page}>
      {/* Snow map background */}
      <div className={styles.mapContainer}>
        <img
          // src="/assets/home/map_bg.png"
          src="/assets/home/empty_map_bg1.png"
          alt="Portfolio Map"
          className={styles.mapBg}
          draggable={false}
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
