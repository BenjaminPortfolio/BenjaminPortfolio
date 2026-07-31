import { useState, useEffect, useRef } from "react";
import { SplineScene } from "./SplineScene";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

:root {
  --blue-accent:  #1e73d0;
  --blue-deep:    #0f4fa8;
  --blue-grad:    linear-gradient(135deg,#2a7de1,#1354c4);
  --blue-light:   rgba(30,115,208,.09);
  --blue-border:  rgba(30,115,208,.18);
  --text-dark:    #0d1f3c;
  --text-mid:     #2e4a6a;
  --text-soft:    #5a7898;
  --text-muted:   #8aaac8;
  --card-bg:      rgba(255,255,255,0.72);
  --card-border:  rgba(255,255,255,0.95);
  --card-shadow:  0 4px 20px rgba(80,140,200,.11),0 1px 4px rgba(80,140,200,.07);
  --card-shadow-h:0 10px 36px rgba(59,130,212,.20),0 2px 8px rgba(59,130,212,.12);
  --r-xl:24px; --r-lg:16px; --r-md:12px; --r-sm:8px;
}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

/* ── SHELL & MODAL ── */
.sv-shell{
  position:fixed;inset:0;z-index:200;
  display:flex;align-items:center;justify-content:center;
  padding:24px;overflow:auto;pointer-events:auto;
}
.sv-modal{
   width:100%;max-width:1200px;
   height:85vh;max-height:85vh;
  background:rgba(218,234,252,0.52);
  backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);
  border:1.5px solid rgba(255,255,255,.84);
  border-radius:var(--r-xl);
  box-shadow:0 8px 48px rgba(80,140,200,.22),0 2px 10px rgba(80,140,200,.12),
             inset 0 1.5px 0 rgba(255,255,255,.92);
  display:flex;flex-direction:column;
  overflow:hidden;position:relative;
  animation:svIn .5s cubic-bezier(.34,1.1,.64,1) both;
}
@keyframes svIn{from{opacity:0;transform:scale(.96) translateY(12px)}to{opacity:1;transform:none}}

/* ── TOPBAR ── */
.sv-topbar{
  flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
  padding:13px 26px 11px;
  border-bottom:1px solid rgba(255,255,255,.6);
  background:rgba(255,255,255,.18);
}
.sv-topbar-pill{
  display:flex;align-items:center;gap:7px;
  padding:6px 16px;
  background:rgba(255,255,255,.70);border:1.5px solid rgba(255,255,255,.95);
  border-radius:20px;
  font-family:'Outfit',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;color:var(--text-mid);
  box-shadow:0 2px 7px rgba(80,140,200,.12);
}
.sv-topbar-pill i{color:var(--blue-accent)}
.sv-close{
  width:36px;height:36px;border-radius:50%;border:none;
  background:rgba(255,255,255,.72);cursor:pointer;color:var(--text-dark);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 7px rgba(80,140,200,.14);transition:all .18s;
}
.sv-close:hover{background:#fff;color:var(--blue-accent);transform:scale(1.08)}

/* ── SCROLL AREA ── */
.sv-scroll{
  flex:1;overflow-y:auto;overflow-x:hidden;
  scrollbar-width:thin;scrollbar-color:rgba(59,130,212,.22) transparent;
}
.sv-scroll::-webkit-scrollbar{width:4px}
.sv-scroll::-webkit-scrollbar-thumb{background:rgba(59,130,212,.22);border-radius:4px}

/* ══════════════════════════════════
   SECTION 1 — HERO / SERVICES GRID
══════════════════════════════════ */
.sv-hero{
  display:grid;
  grid-template-columns:1fr 380px;
  min-height:520px;
  position:relative;overflow:hidden;
}

/* left text + grid */
.sv-hero-left{
  padding:40px 36px 40px 44px;
  display:flex;flex-direction:column;
}
.sv-eyebrow{
  display:flex;align-items:center;gap:8px;
  font-family:'Outfit',sans-serif;font-size:9.5px;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;color:var(--blue-accent);
  margin-bottom:10px;
}
.sv-eyebrow i{font-size:12px}
.sv-h1{
  font-family:'Outfit',sans-serif;
  font-size:clamp(34px,4vw,54px);font-weight:900;
  line-height:1.04;letter-spacing:-2px;color:var(--text-dark);
  margin-bottom:14px;
}
.sv-h1 em{color:var(--blue-accent);font-style:normal}
.sv-lead{
  font-size:12.5px;color:var(--text-mid);line-height:1.72;
  max-width:380px;margin-bottom:28px;
}

/* service cards grid */
.sv-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:10px;
  flex:1;align-content:start;
}
.sv-card{
  background:var(--card-bg);
  backdrop-filter:blur(16px);
  border:1.5px solid var(--card-border);
  border-radius:var(--r-lg);
  box-shadow:var(--card-shadow);
  padding:16px 16px 18px;
  display:flex;flex-direction:column;gap:7px;
  transition:transform .26s,box-shadow .26s,background .26s;
  cursor:default;
}
.sv-card:hover{
  transform:translateY(-4px) scale(1.012);
  box-shadow:var(--card-shadow-h);
  background:rgba(255,255,255,.92);
}
.sv-card-icon{
  width:38px;height:38px;border-radius:var(--r-sm);
  background:var(--blue-light);border:1.5px solid var(--blue-border);
  display:flex;align-items:center;justify-content:center;
  color:var(--blue-accent);font-size:16px;
  transition:background .24s,border-color .24s;
}
.sv-card:hover .sv-card-icon{background:rgba(30,115,208,.17);border-color:rgba(30,115,208,.36)}
.sv-card-title{font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:700;color:var(--text-dark)}
.sv-card-desc{font-size:10.5px;color:var(--text-soft);line-height:1.58}
.sv-card-content{display:flex;flex-direction:column;gap:5px}

/* right — character */
.sv-hero-right{
  position:relative;display:flex;align-items:flex-end;justify-content:center;
  overflow:hidden;
}
.sv-hero-glow{
  position:absolute;bottom:-40px;left:50%;transform:translateX(-50%);
  width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(175,212,248,.50) 0%,transparent 70%);
  animation:glowB 3.5s ease-in-out infinite;pointer-events:none;
}
@keyframes glowB{
  0%,100%{opacity:.6;transform:translateX(-50%) scale(1)}
  50%{opacity:1;transform:translateX(-50%) scale(1.07)}
}
.sv-hero-char{
  position:relative;z-index:2;
  height:88%;max-height:480px;width:100%;
  display:flex;align-items:center;justify-content:center;
}
@keyframes charBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* floating skill orbs */
.sv-orb{
  position:absolute;z-index:3;
  width:46px;height:46px;border-radius:50%;
  background:rgba(255,255,255,.82);
  border:1.5px solid rgba(255,255,255,.96);
  display:flex;align-items:center;justify-content:center;
  color:var(--blue-accent);font-size:17px;
  box-shadow:0 4px 18px rgba(80,140,200,.20);
  animation:orbFloat 3.8s ease-in-out infinite;
}
.sv-orb:nth-child(2){top:14%;left:6%;animation-delay:0s}
.sv-orb:nth-child(3){top:16%;right:8%;animation-delay:.8s}
.sv-orb:nth-child(4){top:44%;left:2%;animation-delay:1.6s}
.sv-orb:nth-child(5){top:56%;right:5%;animation-delay:2.4s}
@keyframes orbFloat{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-7px)}
}

/* divider */
.sv-divider{height:1px;background:rgba(255,255,255,.55);flex-shrink:0}

/* ══════════════════════════════════
   SECTION 2 — HOW I WORK
══════════════════════════════════ */
.sv-process{
  padding:36px 44px 40px;
  background:rgba(255,255,255,.36);
  position:relative;overflow:hidden;
}
/* faint mountain silhouette bg */
.sv-process-bg{
  position:absolute;bottom:0;left:0;right:0;height:90px;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 90'%3E%3Cpath d='M0 90 L0 55 L80 20 L160 55 L240 10 L320 50 L400 15 L480 45 L560 5 L640 40 L720 18 L800 48 L900 20 L900 90 Z' fill='rgba(200%2C225%2C248%2C0.22)'/%3E%3Cpath d='M0 90 L0 68 L100 38 L200 70 L300 35 L400 62 L500 30 L600 58 L700 34 L800 60 L900 40 L900 90 Z' fill='rgba(180%2C215%2C245%2C0.15)'/%3E%3C/svg%3E") no-repeat bottom/cover;
  pointer-events:none;opacity:.9;
}
.sv-process-top{
  display:grid;grid-template-columns:200px 1fr;gap:32px;align-items:start;
}
.sv-process-label{
  display:flex;align-items:center;gap:8px;
  font-family:'Outfit',sans-serif;font-size:9.5px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:var(--blue-accent);
  margin-bottom:10px;
}
.sv-process-label i{font-size:12px}
.sv-process-h{
  font-family:'Outfit',sans-serif;font-size:30px;font-weight:800;
  color:var(--text-dark);letter-spacing:-1px;margin-bottom:8px;
}
.sv-process-sub{font-size:12px;color:var(--text-soft);line-height:1.65;max-width:180px}

/* steps */
.sv-steps{
  display:grid;grid-template-columns:repeat(5,1fr);gap:8px;
  align-items:start;
}
.sv-step{display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}
.sv-step:not(:last-child)::after{
  content:'';
  position:absolute;top:22px;left:calc(50% + 22px);
  width:calc(100% - 44px);height:1.5px;
  background:repeating-linear-gradient(90deg,var(--blue-accent) 0,var(--blue-accent) 4px,transparent 4px,transparent 9px);
  opacity:.35;
}
.sv-step-icon{
  width:44px;height:44px;border-radius:50%;
  background:rgba(255,255,255,.80);
  border:1.5px solid rgba(255,255,255,.95);
  display:flex;align-items:center;justify-content:center;
  color:var(--blue-accent);font-size:17px;
  box-shadow:0 3px 12px rgba(80,140,200,.15);
  margin-bottom:10px;flex-shrink:0;
}
.sv-step-num{font-family:'Outfit',sans-serif;font-size:9px;font-weight:700;color:var(--text-muted);margin-bottom:3px;letter-spacing:.06em}
.sv-step-title{font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;color:var(--text-dark);margin-bottom:5px}
.sv-step-desc{font-size:10px;color:var(--text-soft);line-height:1.58}
.sv-step-text{display:flex;flex-direction:column;gap:2px}

/* ══════════════════════════════════
   SECTION 3 — TESTIMONIALS
══════════════════════════════════ */
.sv-testi{
  padding:36px 44px 48px;
}
.sv-testi-label{
  display:flex;align-items:center;gap:8px;
  font-family:'Outfit',sans-serif;font-size:9.5px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:var(--blue-accent);
  margin-bottom:10px;
}
.sv-testi-label i{color:#f5b200;font-size:12px}
.sv-testi-header{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:22px;
}
.sv-testi-h{
  font-family:'Outfit',sans-serif;font-size:clamp(24px,3vw,36px);
  font-weight:800;color:var(--text-dark);letter-spacing:-1px;
}
.sv-testi-h em{color:var(--blue-accent);font-style:normal}

.sv-testi-nav{display:flex;gap:8px}
.sv-testi-btn{
  width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;
  background:rgba(255,255,255,.72);border:1.5px solid rgba(255,255,255,.95);
  display:flex;align-items:center;justify-content:center;
  color:var(--text-mid);font-size:13px;
  box-shadow:0 2px 8px rgba(80,140,200,.14);transition:all .2s;
}
.sv-testi-btn:hover{background:#fff;color:var(--blue-accent);transform:translateY(-2px)}

.sv-testi-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:14px;
}
.sv-tcard{
  background:var(--card-bg);
  backdrop-filter:blur(16px);
  border:1.5px solid var(--card-border);
  border-radius:var(--r-lg);
  box-shadow:var(--card-shadow);
  padding:20px 20px 18px;
  display:flex;flex-direction:column;gap:10px;
  transition:transform .26s,box-shadow .26s;
}
.sv-tcard:hover{transform:translateY(-3px);box-shadow:var(--card-shadow-h)}

.sv-tcard-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.sv-quote-icon{
  font-size:28px;color:rgba(30,115,208,.18);line-height:1;flex-shrink:0;
  font-family:Georgia,serif;font-style:normal;margin-top:-4px;
}
.sv-stars{display:flex;gap:2px}
.sv-star{color:#f5b200;font-size:11px}

.sv-tcard-body{font-size:11.5px;color:var(--text-mid);line-height:1.72;flex:1}

.sv-tcard-footer{
  display:flex;align-items:center;gap:10px;
  padding-top:10px;border-top:1px solid rgba(180,210,240,.22);
}
.sv-avatar{
  width:36px;height:36px;border-radius:50%;flex-shrink:0;
  background:var(--blue-grad);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;
  border:2px solid rgba(255,255,255,.9);
  box-shadow:0 2px 8px rgba(30,115,208,.22);
  overflow:hidden;
}
.sv-avatar img{width:100%;height:100%;object-fit:cover}
.sv-author strong{display:block;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;color:var(--text-dark)}
.sv-author span{font-size:10px;color:var(--text-soft)}

/* ══════════════════════════════════
   RESPONSIVE
════════════════════════════════== */

/* ── Tablet landscape / small desktop (≤900px) ── */
@media(max-width:900px){
  // .sv-modal{ max-width:100%; }
  .sv-hero{ grid-template-columns:1fr 300px; }
  .sv-hero-left{ padding:32px 24px 32px 32px; }
  .sv-h1{ font-size:clamp(30px,4.5vw,44px); }
  .sv-grid{ grid-template-columns:repeat(3,1fr); gap:9px; }
  .sv-process{ padding:32px 32px 38px; }
  .sv-steps{ gap:6px; }
  .sv-step-title{ font-size:11px; }
  .sv-step-desc{ font-size:9.5px; }
  .sv-testi{ padding:32px 32px 40px; }
  .sv-testi-grid{ gap:12px; }
}

/* ── Tablet portrait (≤768px) ── */
@media(max-width:768px){
  /* shell & modal */
  .sv-shell{ padding:10px; align-items:flex-start; overflow-y:auto; }
  .sv-modal{
    height:auto; max-height:none; min-height:100svh;
    border-radius:20px; flex-direction:column;
  }
  .sv-scroll{ overflow-y:visible; flex:none; }

  /* topbar */
  .sv-topbar{ padding:11px 16px; }

  /* hero section — single column, hide character */
  .sv-hero{ grid-template-columns:1fr; min-height:auto; }
  .sv-hero-right{ display:none; }
  .sv-hero-left{ padding:28px 20px 24px; }
  .sv-h1{ font-size:clamp(28px,7vw,40px); letter-spacing:-1px; margin-bottom:10px; }
  .sv-lead{ font-size:12px; margin-bottom:20px; }

  /* service grid — 2 columns */
  .sv-grid{ grid-template-columns:1fr 1fr; gap:8px; }
  .sv-card{ padding:14px 13px 15px; }
  .sv-card-icon{ width:34px; height:34px; font-size:14px; }
  .sv-card-title{ font-size:11.5px; }
  .sv-card-desc{ font-size:10px; }

  /* process section */
  .sv-process{ padding:28px 20px 80px; }
  .sv-process-top{ grid-template-columns:1fr; gap:20px; }
  .sv-process-h{ font-size:24px; }
  .sv-process-sub{ max-width:100%; }

  /* steps — 2x3 grid */
  .sv-steps{
    grid-template-columns:repeat(2,1fr);
    row-gap:18px; column-gap:12px;
  }
  .sv-step:not(:last-child)::after{ display:none; }
  .sv-step-icon{ width:40px; height:40px; font-size:15px; margin-bottom:8px; }
  .sv-step-num{ font-size:8.5px; }
  .sv-step-title{ font-size:11.5px; }
  .sv-step-desc{ font-size:10px; }

  /* testimonials */
  .sv-testi{ padding:28px 20px 36px; }
  .sv-testi-h{ font-size:clamp(22px,6vw,30px); }
  .sv-testi-grid{ grid-template-columns:1fr; gap:10px; }
  .sv-tcard{ padding:16px 16px 14px; }
  .sv-quote-icon{ font-size:24px; }
  .sv-tcard-body{ font-size:11px; }
}

/* ── Large mobile (≤600px) ── */
@media(max-width:600px){
  .sv-hero-left{ padding:22px 16px 20px; }
  .sv-h1{ font-size:clamp(24px,8vw,34px); }
  .sv-grid{ grid-template-columns:1fr 1fr; gap:7px; }
  .sv-card{ padding:12px 11px 13px; gap:5px; }
  .sv-card-icon{ width:32px; height:32px; font-size:13px; border-radius:6px; }
  .sv-card-title{ font-size:10.5px; }
  .sv-card-desc{ font-size:9.5px; line-height:1.5; }
  .sv-process{ padding:24px 16px 70px; }
  .sv-process-h{ font-size:22px; }
  .sv-steps{ grid-template-columns:1fr 1fr; row-gap:14px; }
  .sv-testi{ padding:24px 16px 32px; }
  .sv-testi-nav{ gap:6px; }
  .sv-testi-btn{ width:34px; height:34px; }
  .sv-tcard-body p{ font-size:10.5px; }
}

/* ── Small mobile (≤480px) ── */
@media(max-width:480px){
  // .sv-shell{ padding:0; }
  .sv-modal{ min-height:100svh; }
  .sv-hero-left{ padding:20px 14px 18px; }
  .sv-eyebrow{ font-size:8.5px; }
  .sv-h1{ font-size:clamp(22px,9vw,30px); letter-spacing:-0.5px; margin-bottom:8px; }
  .sv-lead{ font-size:11.5px; margin-bottom:16px; }

  /* service grid — 1 column on very small */
  .sv-grid{ grid-template-columns:1fr; gap:7px; }
  .sv-card{ flex-direction:row; align-items:flex-start; gap:12px; padding:13px; }
  .sv-card-icon{ flex-shrink:0; width:36px; height:36px; }
  .sv-card-content{ display:flex; flex-direction:column; gap:3px; }

  /* process */
  .sv-process{ padding:22px 14px 60px; }
  .sv-steps{ grid-template-columns:1fr; gap:10px; }
  .sv-step{ flex-direction:row; text-align:left; gap:12px; align-items:flex-start; }
  .sv-step-icon{ flex-shrink:0; margin-bottom:0; width:38px; height:38px; }
  .sv-step-text{ display:flex; flex-direction:column; gap:2px; padding-top:2px; }

  /* testimonials */
  .sv-testi{ padding:22px 14px 28px; }
  .sv-testi-header{ flex-wrap:wrap; gap:10px; }
  .sv-tcard{ padding:14px 14px 12px; }
  .sv-tcard-body p{ font-size:10px; line-height:1.65; }
  .sv-author strong{ font-size:11px; }
  .sv-author span{ font-size:9.5px; }
}
`;

/* ── DATA ── */
const SERVICES = [
  {
    icon: "fas fa-cube",
    title: "3D Art & Modeling",
    desc: "High-quality 3D models, props, characters & environments.",
  },
  {
    icon: "fas fa-gamepad",
    title: "Game Art",
    desc: "Assets and visuals for games with style and performance in mind.",
  },
  {
    icon: "fas fa-film",
    title: "2D Animation",
    desc: "Smooth, expressive 2D animations and motion graphics.",
  },
  {
    icon: "fas fa-video",
    title: "Lyrical Animation",
    desc: "Engaging lyrical videos that bring music and lyrics to life.",
  },
  {
    icon: "fas fa-image",
    title: "Graphic Design",
    desc: "Posters, social media visuals, branding & promotional designs.",
  },
  {
    icon: "fas fa-tshirt",
    title: "Merch & Apparel Design",
    desc: "Trend-focused T-shirt graphics and apparel designs.",
  },
];

const STEPS = [
  {
    icon: "fas fa-user-friends",
    num: "01",
    title: "Understand",
    desc: "I listen to your ideas, goals, and vision in detail.",
  },
  {
    icon: "fas fa-lightbulb",
    num: "02",
    title: "Plan & Concept",
    desc: "I brainstorm and create concepts that fit your needs.",
  },
  {
    icon: "fas fa-pen-nib",
    num: "03",
    title: "Design & Create",
    desc: "I bring the concept to life with precision and creativity.",
  },
  {
    icon: "fas fa-sync-alt",
    num: "04",
    title: "Review & Refine",
    desc: "We review, refine, and perfect every detail together.",
  },
  {
    icon: "fas fa-cloud-upload-alt",
    num: "05",
    title: "Deliver",
    desc: "Final delivery with all required formats & support.",
  },
];

const TESTIMONIALS = [
  {
    avatar: null,
    initials: "N",
    name: "– Shanis",
    brand: "NAKED Lifestyle Brand",
    stars: 5,
    text: `Benjamin played an important role in shaping the visual identity of NAKED. His T-shirt graphics were stylish, bold, and aligned perfectly with modern fashion trends. He has a strong creative sense and always brings fresh ideas to the table.\n\nHis professionalism, fast workflow, and design quality made him a valuable creative partner for our brand.`,
  },
  {
    avatar: null,
    initials: "A",
    name: "– Aromal Chekaver",
    brand: "",
    stars: 5,
    text: `"I've worked with Benjamin on multiple lyrical animation and visual projects, and every time he brought something unique to the table. His visuals have a strong artistic feel and really help elevate the music experience.\n\nFrom lyric animations to thumbnails and cover art, his creativity and dedication consistently stand out. He's someone who genuinely cares about the final output and puts real effort into every detail."`,
  },
  {
    avatar: null,
    initials: "N",
    name: "– Nivedh CJ",
    brand: "",
    stars: 5,
    text: `"Working with Benjamin on my Tamil song Varam Neeye was a really good experience. He perfectly understood the emotion and feel of the song and turned it into beautiful lyrical visuals. The animation style and overall presentation gave the video a cinematic touch.\n\nHe was creative, easy to work with, and delivered great quality work."`,
  },
  {
    avatar: null,
    initials: "I",
    name: "– Ishan Shabeer, NIHAL SHAJU & Shamel",
    brand: "",
    stars: 5,
    text: `"Benjamin absolutely nailed the cover art for Loop Days. The whole artwork had a fresh vibe and matched the energy of the track perfectly. The colors, character styling, and overall presentation gave the project a unique identity and made it stand out instantly.\n\nSuper creative, easy to work with, and someone who really understands modern music visuals."`,
  },
];

/* ── STARS ── */
function Stars({ n }) {
  return (
    <div className="sv-stars">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} className="fas fa-star sv-star" />
      ))}
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function ServicesOverlay({ onClose }) {
  const [tPage, setTPage] = useState(0);
  const perPage = 4;
  const pages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(
    tPage * perPage,
    tPage * perPage + perPage,
  );

  useEffect(() => {
    const id = "sv-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    const faId = "sv-fa";
    if (!document.getElementById(faId)) {
      const l = document.createElement("link");
      l.id = faId;
      l.rel = "stylesheet";
      l.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(l);
    }
  }, []);

  return (
    <div className="sv-shell">
      <div className="sv-modal">
        {/* TOPBAR */}
        <div className="sv-topbar">
          <div className="sv-topbar-pill">
            <i className="fas fa-briefcase" /> Services
          </div>
          <button
            className="sv-close"
            onClick={() => typeof onClose === "function" && onClose()}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="sv-scroll">
          {/* ── SECTION 1: HERO + SERVICE GRID ── */}
          <div className="sv-hero">
            <div className="sv-hero-left">
              <div className="sv-eyebrow">
                <i className="fas fa-briefcase" /> Services
              </div>
              <h1 className="sv-h1">
                <em>Creative</em> Services
              </h1>
              <p className="sv-lead">
                From concept to final output, I help brands and artists bring
                their ideas to life through powerful visuals, engaging
                animations, and thoughtful design.
              </p>
              <div className="sv-grid">
                {SERVICES.map((s, i) => (
                  <div key={i} className="sv-card">
                    <div className="sv-card-icon">
                      <i className={s.icon} />
                    </div>
                    <div className="sv-card-content">
                      <div className="sv-card-title">{s.title}</div>
                      <div className="sv-card-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHARACTER + ORBS */}
            <div className="sv-hero-right">
              <div className="sv-hero-glow" />
              {/* orbs */}
              <div className="sv-orb">
                <i className="fas fa-pen-nib" />
              </div>
              <div className="sv-orb">
                <i className="fas fa-cube" />
              </div>
              <div className="sv-orb">
                <i className="fas fa-gamepad" />
              </div>
              <div className="sv-orb">
                <i className="fas fa-palette" />
              </div>
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="sv-hero-char"
              />
            </div>
          </div>

          <div className="sv-divider" />

          {/* ── SECTION 2: PROCESS ── */}
          <div className="sv-process">
            <div className="sv-process-bg" />
            <div className="sv-process-top">
              <div>
                <div className="sv-process-label">
                  <i className="fas fa-cog" /> My Process
                </div>
                <div className="sv-process-h">How I Work</div>
                <p className="sv-process-sub">
                  A clear and collaborative process to ensure the best results.
                </p>
              </div>
              <div className="sv-steps">
                {STEPS.map((s, i) => (
                  <div key={i} className="sv-step">
                    <div className="sv-step-icon">
                      <i className={s.icon} />
                    </div>
                    <div className="sv-step-text">
                      <div className="sv-step-num">{s.num}</div>
                      <div className="sv-step-title">{s.title}</div>
                      <div className="sv-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sv-divider" />

          {/* ── SECTION 3: TESTIMONIALS ── */}
          <div className="sv-testi">
            <div className="sv-testi-label">
              <i className="fas fa-star" /> Testimonials
            </div>
            <div className="sv-testi-header">
              <div className="sv-testi-h">
                What <em>Clients</em> Say
              </div>
              <div className="sv-testi-nav">
                <button
                  className="sv-testi-btn"
                  onClick={() => setTPage((p) => Math.max(0, p - 1))}
                >
                  <i className="fas fa-chevron-left" />
                </button>
                <button
                  className="sv-testi-btn"
                  onClick={() => setTPage((p) => Math.min(pages - 1, p + 1))}
                >
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>

            <div className="sv-testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="sv-tcard">
                  <div className="sv-tcard-top">
                    <div className="sv-quote-icon">"</div>
                    <Stars n={t.stars} />
                  </div>
                  <div className="sv-tcard-body">
                    {t.text.split("\n\n").map((para, pi) => (
                      <p
                        key={pi}
                        style={{
                          marginBottom:
                            pi < t.text.split("\n\n").length - 1 ? "10px" : 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="sv-tcard-footer">
                    <div className="sv-avatar">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} />
                      ) : (
                        t.initials
                      )}
                    </div>
                    <div className="sv-author">
                      <strong>{t.name}</strong>
                      {t.brand && <span>{t.brand}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* /sv-scroll */}
      </div>
    </div>
  );
}
