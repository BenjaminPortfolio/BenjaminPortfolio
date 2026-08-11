import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Prevent scroll restoration on reload and ensure we start at the top.
// Some mobile browsers (especially Safari) restore the previous scroll
// position before React mounts — using requestAnimationFrame plus a
// fallback timeout ensures the reset happens after any browser-side
// restoration.
window.history.scrollRestoration = "manual";

const resetScroll = () => window.scrollTo(0, 0);
resetScroll();
requestAnimationFrame(() => {
  resetScroll();
  setTimeout(resetScroll, 0);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
