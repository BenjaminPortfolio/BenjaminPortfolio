import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Prevent scroll restoration on reload and ensure we start at the top
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);
//

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
