import { useState, useEffect, useRef } from "react";
import styles from "./BenjaminContact.module.css";

// ─────────────────────────────────────────────
//  🔧 REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
//     Sign up free at https://www.emailjs.com
//     1. Add Gmail service → connect csbenju76@gmail.com
//     2. Create a template with variables:
//        {{from_name}}, {{from_email}}, {{service}}, {{message}}
//     3. Paste your IDs below
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // e.g. "aBcDeFgHiJkLmNoP"

function Snow() {
  const flakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    dur: Math.random() * 12 + 10,
    delay: Math.random() * 18,
    left: Math.random() * 100,
  }));

  return (
    <div className={styles.cjSnow}>
      {flakes.map((f) => (
        <div
          key={f.id}
          className={styles.cjFlake}
          style={{
            width: f.size,
            height: f.size,
            left: `${f.left}%`,
            top: 0,
            animationDuration: `${f.dur}s`,
            animationDelay: `-${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function BenjaminContact({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  // Load EmailJS SDK and FontAwesome once
  useEffect(() => {
    const faId = "cj-fa";
    if (!document.getElementById(faId)) {
      const l = document.createElement("link");
      l.id = faId;
      l.rel = "stylesheet";
      l.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(l);
    }

    // Load EmailJS SDK
    const ejsId = "emailjs-sdk";
    if (!document.getElementById(ejsId)) {
      const script = document.createElement("script");
      script.id = ejsId;
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        }
      };
      document.head.appendChild(script);
    } else if (window.emailjs) {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError("");

    try {
      const templateParams = {
        to_email: "csbenju76@gmail.com",
        from_name: form.name,
        from_email: form.email,
        service: form.service || "Not specified",
        message: form.message,
        reply_to: form.email,
      };

      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
      );

      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(
        err?.text ||
          "Oops! Something went wrong. Please try again or email directly at csbenju76@gmail.com",
      );
    } finally {
      setLoading(false);
    }
  }

  const infoRows = [
    { icon: "fas fa-envelope", val: "csbenju76@gmail.com", label: "Email" },
    { icon: "fas fa-map-marker-alt", val: "India", label: "Location" },
    { icon: "fas fa-phone", val: "+91 9562358421", label: "Phone" },
    {
      icon: "fas fa-clock",
      val: "Usually replies within 24 hrs",
      label: "Response Time",
    },
  ];

  const socials = [
    { icon: "fas fa-envelope", href: "mailto:csbenju76@gmail.com" },
    { icon: "fab fa-linkedin-in", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-dribbble", href: "#" },
  ];

  return (
    <div className={styles.BenjaminContactVar}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div className={styles.cjBg}>
          <div className={`${styles.cjBokeh} ${styles.bk1}`} />
          <div className={`${styles.cjBokeh} ${styles.bk2}`} />
          <div className={`${styles.cjBokeh} ${styles.bk3}`} />
          <div className={`${styles.cjBokeh} ${styles.bk4}`} />
          <div className={`${styles.cjBokeh} ${styles.bk5}`} />
        </div>
        <Snow />
        <div className={styles.cjShell}>
          <div className={styles.cjModal}>
            <button
              className={styles.cjTopbarClose}
              onClick={onClose}
              aria-label="Close"
            >
              <i className="fas fa-times" />
            </button>
            {/* LEFT PANEL */}
            <div className={styles.cjLeft}>
              <div className={styles.cjEyebrow}>Let's Connect</div>
              <h1 className={styles.cjHeadline}>
                Let's create something <em>amazing</em> together!
              </h1>
              <div className={styles.cjDivider} />
              <p className={styles.cjTagline}>
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>
              <div className={styles.cjInfoCard}>
                <div className={styles.cjInfoCardHeader}>
                  <div className={styles.cjInfoBadge}>
                    <i className="fas fa-user" />
                  </div>
                  <div className={styles.cjInfoLabel}>Contact Info</div>
                </div>
                {infoRows.map((r, i) => (
                  <div key={i} className={styles.cjInfoRow}>
                    <div className={styles.cjInfoIcon}>
                      <i className={r.icon} />
                    </div>
                    <div className={styles.cjInfoText}>
                      <strong>{r.val}</strong>
                      <span>{r.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cjSocialsLabel}>Find Me On</div>
              <div className={styles.cjSocials}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} className={styles.cjSocialBtn}>
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>
            {/* CENTER PANEL - FORM */}
            <div className={styles.cjCenter}>
              <div className={styles.cjFormHeader}>
                <div className={styles.cjFormIcon}>
                  <i className="fas fa-paper-plane" />
                </div>
                <div className={styles.cjFormTitle}>Send Me a Message</div>
              </div>
              <p className={styles.cjFormSub}>
                Have a project, idea, or creative mission? I'd love to hear
                about it. Fill out the form below and I'll get back to you soon!
              </p>
              {sent ? (
                <div className={styles.cjSuccess}>
                  <div className={styles.cjSuccessIcon}>
                    <i className="fas fa-check" />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setForm({
                        name: "",
                        email: "",
                        service: "",
                        message: "",
                      });
                      setFileName("");
                      setSent(false);
                      setError("");
                    }}
                    style={{
                      marginTop: 8,
                      padding: "10px 24px",
                      background: "var(--blue-grad)",
                      border: "none",
                      borderRadius: "var(--r-md)",
                      color: "#fff",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Send Another
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      marginTop: 8,
                      padding: "10px 24px",
                      background: "transparent",
                      border: "1px solid rgba(30,115,208,.14)",
                      borderRadius: "var(--r-md)",
                      color: "var(--text-dark)",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className={styles.cjForm} onSubmit={handleSubmit}>
                  <div className={styles.cjRow}>
                    <div className={styles.cjField}>
                      <i className={`fas fa-user ${styles.cjFieldIcon}`} />
                      <input
                        className={styles.cjInput}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.cjField}>
                      <i className={`fas fa-envelope ${styles.cjFieldIcon}`} />
                      <input
                        className={styles.cjInput}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.cjSelectWrap}>
                    <select
                      className={styles.cjSelect}
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        What are you looking for?
                      </option>
                      <option value="3D Modeling & Art">
                        3D Modeling & Art
                      </option>
                      <option value="Concept Art">Concept Art</option>
                      <option value="Motion Graphics / Animation">
                        Motion Graphics / Animation
                      </option>
                      <option value="Branding & Graphic Design">
                        Branding & Graphic Design
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    <i
                      className={`fas fa-chevron-down ${styles.cjSelectIconRight}`}
                    />
                  </div>
                  <div className={styles.cjTextareaWrap}>
                    <textarea
                      className={styles.cjTextarea}
                      name="message"
                      placeholder="Tell me about your project"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                    <i className={`fas fa-pen ${styles.cjTextareaIcon}`} />
                  </div>
                  <div
                    className={styles.cjAttach}
                    onClick={() => fileRef.current?.click()}
                  >
                    <i className={`fas fa-paperclip ${styles.cjAttachIcon}`} />
                    <div className={styles.cjAttachText}>
                      <strong>{fileName || "Attach Files (Optional)"}</strong>
                      <span>
                        {fileName
                          ? "File selected"
                          : "JPG, PNG, PDF up to 10MB"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.cjBrowseBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileRef.current?.click();
                      }}
                    >
                      Browse
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      style={{ display: "none" }}
                      onChange={handleFile}
                    />
                  </div>
                  {error && (
                    <div className={styles.cjError}>
                      <i className="fas fa-exclamation-circle" />
                      {error}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      type="submit"
                      className={styles.cjSubmit}
                      disabled={loading}
                      style={{ flex: 1 }}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane" />
                          Send Message
                        </>
                      )}
                    </button>
                    {/* <button
                      type="button"
                      onClick={onClose}
                      style={{
                        padding: "14px 18px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,.06)",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button> */}
                  </div>
                  <div className={styles.cjSecure}>
                    <i className="fas fa-lock" style={{ fontSize: 10 }} />
                    Your information is safe and secure.
                  </div>
                </form>
              )}
            </div>
            {/* CHARACTER PANEL */}
            <div className={styles.cjCharPanel}>
              <div className={styles.cjCharGlow} />
              <img
                className={styles.cjCharImg}
                src="\assets\about\characters\benjamin_side_view.png"
                alt="Anime Benjamin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
