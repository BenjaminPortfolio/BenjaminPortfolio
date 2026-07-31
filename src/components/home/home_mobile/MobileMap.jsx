import MapItem from "../MapItem";
import styles from "./MobileMap.module.css";

export default function MobileMap({ mapItems, handleClick, treePositions }) {
  const DEBUG_TREES = false;
  return (
    <div className={styles.page}>
      <div className={styles.mapContainer}>
        <img
          src="/assets/home/mobile_map_path_new.png"
          alt="Portfolio Map"
          className={styles.mapImage}
          draggable={false}
        />

        {/* Map items go here later */}
        {mapItems.map((item) => {
          return (
            <MapItem
              key={item.id}
              label={item.label}
              videoSrc={item.videoSrc}
              imageSrc={item.imageSrc}
              style={item.mobile.position}
              tagPosition={item.mobile.tagPosition}
              onClick={() => handleClick(item.id)}
              disabled={item.disabled}
            />
          );
        })}

        {/* tree positions */}
        {treePositions.map((tree, i) => (
          <img
            key={i}
            src="/assets/home/single_tree.svg"
            style={{
              ...tree,
              outline: DEBUG_TREES ? `2px solid ${tree.debug}` : undefined,
              background: DEBUG_TREES ? tree.debug : undefined,
              opacity: DEBUG_TREES ? 0.6 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
