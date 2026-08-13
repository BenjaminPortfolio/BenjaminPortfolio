import { useEffect, useState } from "react";
import HomePage from "../components/home/HomePage";
import ProjectsOverlay from "../components/home/projects/ProjectsOverlay";
import AboutOverlay from "../components/home/about/AboutOverlay";
import BenjaminContact from "../components/home/contact/BenjaminContact.jsx";
import ServicesOverlay from "../components/home/services/ServicesOverlay.jsx";
import ModalBackdrop from "../components/ui/ModalBackdrop";

/**
 * HomePageWrapper
 * Manages which overlay is open on top of the map.
 */
export default function HomePageWrapper() {
  const [activeOverlay, setActiveOverlay] = useState(null);
  // null | 'projects' | 'about' | 'contact'

  // Overlays are plain React state, not real navigation — so a phone's
  // back button (which pops browser history, not this state) used to skip
  // straight past "close the overlay" and leave /home entirely, landing on
  // the parallax page. Pushing a history entry when an overlay opens means
  // one back-press just pops that entry (closing the overlay, staying on
  // /home's map) instead of leaving the page; a second back-press then
  // behaves normally.
  const open = (name) => {
    window.history.pushState({ overlay: name }, "", window.location.pathname);
    setActiveOverlay(name);
  };

  const close = () => {
    setActiveOverlay(null);
    // Only pop history if we're the ones who pushed the entry (i.e. this
    // was a direct UI close, not already triggered by a back-button
    // popstate) — otherwise closing via the X button would leave a stale
    // extra entry in the stack.
    if (window.history.state?.overlay) {
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      // Whatever the user was doing, a back-press while an overlay is open
      // should always just close it and land on the plain map.
      setActiveOverlay(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (activeOverlay) {
      // Lock background scroll. Using position:fixed in addition to
      // overflow:hidden is the most reliable cross-browser way to
      // prevent iOS Safari from rubber-banding / scrolling the page
      // behind a fixed modal — overflow alone is not always enough.
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll position exactly where it was before the overlay
      // opened (the fixed-position trick moves the body to top: -scrollY,
      // so we read that back and remove the fixed positioning).
      const top = document.body.style.top;
      const scrollY = top ? parseInt(top.replace("-", ""), 10) || 0 : 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeOverlay]);

  return (
    <>
      <HomePage
        onProjectsClick={() => open("projects")}
        onAboutClick={() => open("about")}
        onContactClick={() => open("contact")}
        onServicesClick={() => open("services")}
      />

      {/* Dim + snow layer behind whichever modal is open (Projects, About,
          Services, Contact). Sits below the overlay shells, so it never
          interferes with the modal's functionality. */}
      {activeOverlay && <ModalBackdrop />}

      {activeOverlay === "projects" && <ProjectsOverlay onClose={close} />}

      {activeOverlay === "about" && (
        <div key="about-overlay">
          <AboutOverlay onClose={close} />
        </div>
      )}
      {activeOverlay === "contact" && (
        <div key="contact-overlay">
          <BenjaminContact onClose={close} />
        </div>
      )}

      {activeOverlay === "services" && (
        <div key="services-overlay">
          <ServicesOverlay onClose={close} />
        </div>
      )}
    </>
  );
}
