import "./MapLoaderAnim.css";
import styles from "./MapLoader.module.css";

/**
 * MapLoader
 *
 * Uiverse.io bouncing-ball loader (by alexs_8179) — a 3D cube/gem
 * bouncing over a shadow with rising particles.
 * Rendered as a floating element above the map, like the MapCheckbox.
 *
 * Props:
 *   position - optional CSS style object merged onto the .float wrapper,
 *              so callers can control placement (e.g. different top/right/
 *              bottom + scale for mobile vs desktop).
 */
export default function MapLoader({ position }) {
  return (
    <div className={styles.float} style={position}>
      <svg xmlns="http://www.w3.org/2000/svg" height={200} width={200}>
        <g>
          <polygon
            transform="rotate(45 100 100)"
            strokeWidth={1}
            stroke="#6fc8e5"
            fill="none"
            points="70,70 148,50 130,130 50,150"
            id="bounce"
          />
          <polygon
            transform="rotate(45 100 100)"
            strokeWidth={1}
            stroke="#bdf0ffcc"
            fill="none"
            points="70,70 148,50 130,130 50,150"
            id="bounce2"
          />
          <polygon
            transform="rotate(45 100 100)"
            strokeWidth={2}
            stroke=""
            fill="#3a4a5c"
            points="70,70 150,50 130,130 50,150"
          />
          <polygon
            strokeWidth={2}
            stroke=""
            fill="url(#gradiente)"
            points="100,70 150,100 100,130 50,100"
          />
          <defs>
            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
              <stop
                style={{ stopColor: "#2b3a4a", stopOpacity: 1 }}
                offset="20%"
              />
              <stop
                style={{ stopColor: "#4a5f73", stopOpacity: 1 }}
                offset="60%"
              />
            </linearGradient>
          </defs>
          <polygon
            transform="translate(20, 31)"
            strokeWidth={2}
            stroke=""
            fill="#4a90c2"
            points="80,50 80,75 80,99 40,75"
          />
          <polygon
            transform="translate(20, 31)"
            strokeWidth={2}
            stroke=""
            fill="url(#gradiente2)"
            points="40,-40 80,-40 80,99 40,75"
          />
          <defs>
            <linearGradient
              y2="100%"
              x2="0%"
              y1="-17%"
              x1="10%"
              id="gradiente2"
            >
              <stop
                style={{ stopColor: "#1f474400", stopOpacity: 1 }}
                offset="20%"
              />
              <stop
                style={{ stopColor: "#6fc8e554", stopOpacity: 1 }}
                offset="100%"
                id="animatedStop"
              />
            </linearGradient>
          </defs>
          <polygon
            transform="rotate(180 100 100) translate(20, 20)"
            strokeWidth={2}
            stroke=""
            fill="#6fc8e5"
            points="80,50 80,75 80,99 40,75"
          />
          <polygon
            transform="rotate(0 100 100) translate(60, 20)"
            strokeWidth={2}
            stroke=""
            fill="url(#gradiente3)"
            points="40,-40 80,-40 80,85 40,110.2"
          />
          <defs>
            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
              <stop
                style={{ stopColor: "#6fc8e500", stopOpacity: 1 }}
                offset="20%"
              />
              <stop
                style={{ stopColor: "#cfe8ff54", stopOpacity: 1 }}
                offset="100%"
                id="animatedStop"
              />
            </linearGradient>
          </defs>
          <polygon
            transform="rotate(45 100 100) translate(80, 95)"
            strokeWidth={2}
            stroke=""
            fill="#ffffff"
            points="5,0 5,5 0,5 0,0"
            id="particles"
          />
          <polygon
            transform="rotate(45 100 100) translate(80, 55)"
            strokeWidth={2}
            stroke=""
            fill="#6fc8e5"
            points="6,0 6,6 0,6 0,0"
            id="particles"
          />
          <polygon
            transform="rotate(45 100 100) translate(70, 80)"
            strokeWidth={2}
            stroke=""
            fill="#6fc8e5"
            points="2,0 2,2 0,2 0,0"
            id="particles"
          />
          <polygon
            strokeWidth={2}
            stroke=""
            fill="#2b3a4a"
            points="29.5,99.8 100,142 100,172 29.5,130"
          />
          <polygon
            transform="translate(50, 92)"
            strokeWidth={2}
            stroke=""
            fill="#24303c"
            points="50,50 120.5,8 120.5,35 50,80"
          />
        </g>
      </svg>
    </div>
  );
}
