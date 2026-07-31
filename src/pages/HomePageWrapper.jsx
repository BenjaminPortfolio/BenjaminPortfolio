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

  const open = (name) => setActiveOverlay(name);
  const close = () => setActiveOverlay(null);

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
