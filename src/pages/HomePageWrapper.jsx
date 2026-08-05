import { useEffect, useState } from "react";
import HomePage from "../components/home/HomePage";
import ProjectsOverlay from "../components/home/projects/ProjectsOverlay";
import AboutOverlay from "../components/home/about/AboutOverlay";
import BenjaminContact from "../components/home/contact/BenjaminContact.jsx";
import ServicesOverlay from "../components/home/services/ServicesOverlay.jsx";

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
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
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
