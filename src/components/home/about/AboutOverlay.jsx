import { useState, useEffect, useRef } from "react";

import styles from "./AboutOverlay.module.css";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* â”€â”€â”€ Data â”€â”€â”€ */
const CAR_DATA = [
  {
    role: "Artist",
    desc: '"Creative visionary bringing imagination to life"',
    image: "/assets/about/characters/benjamin_char.png",
    tools: [
      { icon: "fas fa-palette", color: "#8e44ad", title: "Krita" },
      { icon: "fas fa-pen-nib", color: "#2563ae", title: "Procreate" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
      { icon: "fas fa-paint-brush", color: "#c0392b", title: "Clip Studio" },
    ],
  },
  {
    role: "Motion Artist",
    desc: '"Crafting fluid animations and cinematic motion graphics"',
    image: "/assets/about/characters/benjamin_char2.png",
    tools: [
      { icon: "fas fa-film", color: "#6c2dd4", title: "After Effects" },
      { icon: "fas fa-cube", color: "#e87d0d", title: "Blender" },
      { icon: "fas fa-video", color: "#0a7d9e", title: "Premiere Pro" },
      { icon: "fas fa-magic", color: "#27ae60", title: "Motion" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
    ],
  },
  {
    role: "3D Artist",
    desc: '"Specialized in modeling, texturing, and real-time assets"',
    image: "/assets/about/characters/benjamin_char3.png",
    tools: [
      { icon: "fas fa-cube", color: "#e87d0d", title: "Blender" },
      { icon: "fas fa-gamepad", color: "#1a1a2e", title: "Unreal Engine" },
      { icon: "fas fa-project-diagram", color: "#0a7d9e", title: "Maya" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
    ],
  },
  {
    role: "Digital Artist",
    desc: '"Fusing traditional art sensibility with digital mastery"',
    image: "/assets/about/characters/benjamin_char4.png",
    tools: [
      { icon: "fas fa-pen-nib", color: "#2563ae", title: "Procreate" },
      { icon: "fas fa-layer-group", color: "#001d6e", title: "Photoshop" },
      { icon: "fas fa-palette", color: "#8e44ad", title: "Krita" },
      { icon: "fas fa-vector-square", color: "#e67e22", title: "Illustrator" },
    ],
  },
];

const CAR_LABELS = ["Artist", "Motion Artist", "3D Artist", "Digital Artist"];

/* â”€â”€â”€ Snow component â”€â”€â”€ */
function Snow() {
  const flakes = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    dur: Math.random() * 14 + 10,
    delay: Math.random() * 20,
    left: Math.random() * 100,
    op: Math.random() * 0.55 + 0.28,
  }));
  return (
    <div className={styles["benji-snow-wrap"]}>
      {flakes.map((f) => (
        <div
          key={f.id}
          className={styles["benji-flake"]}
          style={{
            width: f.size,
            height: f.size,
            left: `${f.left}%`,
            top: "-10px",
            opacity: f.op,
            animationDuration: `${f.dur}s`,
            animationDelay: `-${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* â”€â”€â”€ Carousel Section â”€â”€â”€ */
function CarouselSection({ height }) {
  const [current, setCurrent] = useState(0);
  const total = CAR_DATA.length;

  const goTo = (idx) => setCurrent(((idx % total) + total) % total);

  function charClass(i) {
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    if (i === current) return cx(styles["benji-car-char"], styles.active);
    if (i === prev) return cx(styles["benji-car-char"], styles.prev);
    if (i === next) return cx(styles["benji-car-char"], styles.next);
    return cx(styles["benji-car-char"], styles.hidden);
  }

  const d = CAR_DATA[current];

  return (
    <div className={styles["benji-sec-carousel"]} style={{ height }}>
      <div className={styles["benji-car-header"]}>
        <div className={styles["benji-car-eyebrow"]}>About the Artist</div>
        <div className={styles["benji-car-title"]}>
          Benjamin <span>CS</span>
        </div>
        <div className={styles["benji-car-subtitle"]}>
          Each version showcases a different area of Benjamin's expertise,
          <br />
          highlighting his skills across art, design, 3D, and motion.
        </div>
      </div>

      <div className={styles["benji-car-stage"]}>
        <div className={styles["benji-car-glow"]} />

        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={charClass(i)}
            onClick={() => {
              if (i !== current) goTo(i);
            }}
          >
            <div className={styles["benji-car-float"]}>
              <img
                src={
                  CAR_DATA[i]?.image ||
                  "/assets/about/characters/benjamin_char.png"
                }
                alt={CAR_LABELS[i]}
              />
            </div>
            <div className={styles["benji-car-char-label"]}>
              {CAR_LABELS[i]}
            </div>
          </div>
        ))}

        <div className={styles["benji-car-role-card"]}>
          <button
            className={styles["benji-car-nav-btn"]}
            onClick={() => goTo(current - 1)}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <div className={styles["benji-car-role-inner"]}>
            <div className={styles["benji-car-tools"]}>
              {d.tools.map((t, ti) => (
                <div
                  key={ti}
                  className={styles["benji-car-tool-icon"]}
                  title={t.title}
                  style={{ color: t.color }}
                >
                  <i className={t.icon} />
                </div>
              ))}
            </div>
            <div className={styles["benji-car-role-text"]}>
              <div className={styles["benji-car-role-title"]}>{d.role}</div>
              <div className={styles["benji-car-role-desc"]}>{d.desc}</div>
            </div>
          </div>
          <button
            className={styles["benji-car-nav-btn"]}
            onClick={() => goTo(current + 1)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* â”€â”€â”€ Main Portfolio Component â”€â”€â”€ */
export default function BenjiPortfolio({ onClose }) {
  const scrollRef = useRef(null);
  // const heroWrapRef = useRef(null);
  // const detailImgRef = useRef(null);
  // const secDetailRef = useRef(null);

  const [hintOpacity, setHintOpacity] = useState(0.45);
  // const [heroScale, setHeroScale] = useState(1);
  // const [detailZoomed, setDetailZoomed] = useState(false);
  const [sectionHeight, setSectionHeight] = useState("100%");
  const [activeSkill, setActiveSkill] = useState(2);

  useEffect(() => {
    const faId = "benji-fa";
    if (!document.getElementById(faId)) {
      const link = document.createElement("link");
      link.id = faId;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  /* Sync section heights to scroll container */
  useEffect(() => {
    function sync() {
      if (scrollRef.current) {
        setSectionHeight(scrollRef.current.clientHeight + "px");
      }
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* Scroll handler */

  const skillBtns = [
    { icon: "fas fa-palette", label: "3D Art" },
    { icon: "fas fa-gamepad", label: "Game Art" },
    { icon: "fas fa-pen-nib", label: "Concept Art" },
  ];

  return (
    <div className={styles["benji-shell"]}>
      {/* Fixed BG */}
      <div className={styles["benji-bg-fixed"]}>
        <div className={cx(styles["benji-bokeh"], styles["b1"])} />
        <div className={cx(styles["benji-bokeh"], styles["b2"])} />
        <div className={cx(styles["benji-bokeh"], styles["b3"])} />
        <div className={cx(styles["benji-bokeh"], styles["b4"])} />
        <div className={cx(styles["benji-bokeh"], styles["b5"])} />
        <Snow />
      </div>

      <div className={styles["benji-modal"]}>
        {/* Topbar */}
        <div className={styles["benji-topbar"]}>
          <div className={styles["benji-topbar-pill"]}>
            <i className="fas fa-user-circle" /> About the Artist
          </div>
          <div className={styles["benji-topbar-socials"]}>
            <a href="https://www.instagram.com/ben_.jmin?igsh=eXV2NGhhdGJibnp4&utm_source=qr">
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://www.linkedin.com/in/benjamin-cs-823b602b0
"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://benjamincs1.artstation.com/">
              <i className="fab fa-artstation" />
            </a>
          </div>
          <button
            type="button"
            className={styles["benji-topbar-close"]}
            onClick={() => {
              if (typeof onClose === "function") onClose();
            }}
            aria-label="Close modal"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Scroll area */}
        <div className={styles["benji-modal-scroll"]} ref={scrollRef}>
          {/* â”€â”€ SECTION 1: HERO â”€â”€ */}
          <div
            className={styles["benji-sec-hero"]}
            style={{ height: sectionHeight, minHeight: "500px" }}
          >
            <div className={styles["benji-hero-left"]}>
              <div className={styles["benji-hero-big-name"]}>Benjamin CS</div>

              <div className={styles["benji-skill-btns"]}>
                {skillBtns.map((b, i) => (
                  <a
                    key={i}
                    href="#"
                    className={cx(
                      styles["benji-skill-btn"],
                      activeSkill === i && styles.active,
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSkill(i);
                    }}
                  >
                    <i className={b.icon} />
                    <span>{b.label}</span>
                  </a>
                ))}
              </div>
              <div className={styles["benji-detail-tagline"]}>
                I bring ideas to life through art, creating characters full of
                personality and immersive worlds that tell a story.
              </div>
            </div>

            <div className={styles["benji-hero-center"]}>
              <div className={styles["benji-hero-circle"]} />
              <div
                // ref={heroWrapRef}
                className={styles["benji-hero-img-wrap"]}
                style={{
                  // transform: `scale(${heroScale})`,
                  transformOrigin: "bottom center",
                }}
              >
                <img
                  className={styles["benji-hero-img"]}
                  src="/assets/about/characters/benjamin_char.png"
                  alt="Benjamin CS"
                />
              </div>
            </div>

            <div className={styles["benji-hero-right"]}>
              <div className={styles["benji-bubble"]}>
                Hey everyone! I'm Benji
                <br />a passionate 3D Game Artist and Concept Artist who loves
                bringing stories to life through characters, worlds, and
                creative design. I'm highly dedicated, deadline-friendly, and
                always focused on delivering my best work. Let's create
                something amazing together!
              </div>
            </div>

            <div
              className={styles["benji-scroll-hint"]}
              style={{ opacity: hintOpacity }}
            >
              <span>Scroll</span>
              <i className="fas fa-chevron-down" />
            </div>
          </div>

          <div className={styles["benji-sec-divider"]} />

          {/* â”€â”€ SECTION 2: DETAIL â”€â”€ */}
          <div
            className={styles["benji-sec-detail"]}
            // ref={secDetailRef}
            style={{ height: sectionHeight }}
          >
            {/* Left */}
            <div className={styles["benji-col-left"]}>
              <div
                className={cx(
                  styles["benji-card"],
                  styles["benji-projects-card"],
                )}
              >
                <div className={styles["benji-card-header"]}>
                  <div className={styles["benji-badge"]}>
                    <i className="fas fa-layer-group" />
                  </div>
                  <div className={styles["benji-card-title"]}>
                    Projects &amp; Achievements
                  </div>
                </div>
                <div className={styles["benji-card-body"]}>
                  {[
                    {
                      icon: "fas fa-film",
                      text: (
                        <>
                          Created 2D lyrical animations and promotional visuals
                          for <strong>Aromal Chekaver.</strong>
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-tshirt",
                      text: (
                        <>
                          Designed branding materials and{" "}
                          <strong>100+ T-shirt designs</strong> for the clothing
                          brand <strong>NAKED.</strong>
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-music",
                      text: (
                        <>
                          Created cover art and visuals for emerging{" "}
                          <strong>Malayalam music artists.</strong>
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-cube",
                      text: (
                        <>
                          Developed <strong>3D models</strong> and explored
                          different texturing workflows for creative projects.
                        </>
                      ),
                    },
                    {
                      icon: "fas fa-pen-nib",
                      text: (
                        <>
                          Produced <strong>concept art</strong> for indie
                          studios and independent clients worldwide.
                        </>
                      ),
                    },
                  ].map((p, i) => (
                    <div key={i} className={styles["benji-proj-item"]}>
                      <div className={styles["benji-proj-icon"]}>
                        <i className={p.icon} />
                      </div>
                      <div className={styles["benji-proj-text"]}>{p.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={cx(styles["benji-card"], styles["benji-edu-card"])}
              >
                <div className={styles["benji-card-header"]}>
                  <div className={styles["benji-badge"]}>
                    <i className="fas fa-graduation-cap" />
                  </div>
                  <div className={styles["benji-card-title"]}>Education</div>
                </div>
                <div className={styles["benji-card-body"]}>
                  <div className={styles["benji-edu-item"]}>
                    <div className={styles["benji-dot-col"]}>
                      <div className={styles["benji-dot"]} />
                      <div className={styles["benji-dot-line"]} />
                    </div>
                    <div>
                      <div className={styles["benji-edu-school"]}>
                        Mahatma Gandhi University &nbsp;BA Animation &amp;
                        Graphic Design
                      </div>
                      <div className={styles["benji-edu-date"]}>2022 2025</div>
                      <div className={styles["benji-edu-desc"]}>
                        5th Rank Holder. Strong foundation in 3D art, animation,
                        lighting, visual storytelling and 2D concept art.
                      </div>
                    </div>
                  </div>
                  <div className={styles["benji-edu-item"]}>
                    <div className={styles["benji-dot-col"]}>
                      <div className={styles["benji-dot"]} />
                    </div>
                    <div>
                      <div className={styles["benji-edu-school"]}>
                        Asian Institute of Design (AID)
                      </div>
                      <div className={styles["benji-edu-date"]}>
                        MAY 2022 2025
                      </div>
                      <div className={styles["benji-edu-desc"]}>
                        Focused on 3D game art, character &amp; environment
                        modeling, texturing, lighting. Skilled in
                        highpoly/lowpoly modeling &amp; optimization workflows.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center */}
            <div className={styles["benji-col-center"]}>
              {/* <div className={styles["benji-about-badge"]}>
                About the Artist
              </div>
              <div className={styles["benji-detail-name"]}>Benji</div>
              <div className={styles["benji-detail-role"]}>
                3D Game Artist &amp; Concept Artist
              </div>
              <div className={styles["benji-detail-tagline"]}>
                I bring ideas to life through art.
                <br />
                From characters full of personality
                <br />
                to immersive worlds that tell a story.
              </div> */}
              <div className={styles["benji-char-wrap"]}>
                <div className={styles["benji-rings"]}>
                  <div className={styles["benji-ring-glow"]} />
                  <div className={styles["benji-ring"]} />
                  <div className={styles["benji-ring"]} />
                  <div className={styles["benji-ring"]} />
                </div>
                <img
                  // ref={detailImgRef}
                  className={cx(styles["benji-char-img-detail"])}
                  src="/assets/about/characters/benjamin_char.png"
                  alt="Benji"
                />
              </div>
            </div>

            {/* Right */}
            <div className={styles["benji-col-right"]}>
              <div
                className={cx(styles["benji-card"], styles["benji-exp-card"])}
              >
                <div className={styles["benji-card-header"]}>
                  <div className={styles["benji-badge"]}>
                    <i className="fas fa-briefcase" />
                  </div>
                  <div className={styles["benji-card-title"]}>Experience</div>
                </div>
                <div className={styles["benji-card-body"]}>
                  {[
                    {
                      title: "Egllu Studio | 3D Animation Intern",
                      date: "April 2024 May 2025",
                      desc: "Worked on 3D animation projects, creating 3D props and 2D animatics with a focus on visual storytelling, quality, and detail in a fast-paced studio environment.",
                      line: true,
                    },
                    {
                      title: "Naked Lifestyle Brand | Fashion Graphic Designer",
                      date: "May 2025 Present",
                      desc: "Currently designing trend-focused T-shirt visuals, apparel graphics, and branding materials including logos, brochures, posters, and mockups for a clothing brand.",
                      line: true,
                    },
                    {
                      title: "2D Animator & Lyric Video Designer | Freelancer",
                      date: "June 2025 Present",
                      desc: "Freelance designer creating lyrical animations, cover art, thumbnails, and 2D visuals for indie-pop artist Aromal Chekaver and other clients.",
                      line: false,
                    },
                  ].map((e, i) => (
                    <div key={i} className={styles["benji-exp-item"]}>
                      <div className={styles["benji-dot-col"]}>
                        <div className={styles["benji-dot"]} />
                        {e.line && <div className={styles["benji-dot-line"]} />}
                      </div>
                      <div>
                        <div className={styles["benji-exp-title"]}>
                          {e.title}
                        </div>
                        <div className={styles["benji-exp-date"]}>{e.date}</div>
                        <div className={styles["benji-exp-desc"]}>{e.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={cx(
                  styles["benji-card"],
                  styles["benji-skills-card"],
                )}
              >
                <div className={styles["benji-card-header"]}>
                  <div className={styles["benji-badge"]}>
                    <i className="fas fa-star" />
                  </div>
                  <div className={styles["benji-card-title"]}>Skills</div>
                </div>
                <div className={styles["benji-card-body"]} />
                <div className={styles["benji-skills-wrap"]}>
                  {[
                    // "Blender",
                    "Branding",
                    "Animation",
                    "Photoshop",
                    "3D Modeling",
                    "Concept Art",
                    "Software Skills",
                    "Character Design",
                    "Visual Development",
                    "Visual Design & Art",
                  ].map((s, i) => (
                    <span key={i} className={styles["benji-skill-tag"]}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles["benji-sec-divider"]} />

          {/* â”€â”€ SECTION 3: CAROUSEL â”€â”€ */}
          <CarouselSection height={sectionHeight} />
        </div>
        {/* /modal-scroll */}

        {/* Floating pill bar */}
        <div className={styles["benji-modal-pill-bar"]}>
          <a href="mailto:kpminishaji007@gmail.com">
            <i className="fas fa-envelope" /> <span>csbenju76@gmail.com</span>
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt" /> <span>India</span>
          </a>
          <a href="/assets/about/pdf/CV_BENJAMIN.pdf" download>
            <i className="fas fa-download" /> <span>Download CV</span>
          </a>
        </div>
      </div>
      {/* /modal */}
    </div>
  );
}
