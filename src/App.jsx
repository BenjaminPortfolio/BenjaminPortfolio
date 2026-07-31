// src/App.jsx — router only
// Parallax logic → src/pages/ParallaxPage.jsx
// Home map logic → src/pages/HomePageWrapper.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParallaxPage from "./pages/ParallaxPage";
import HomePageWrapper from "./pages/HomePageWrapper";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<ParallaxPage />} />
        <Route path="/home" element={<HomePageWrapper />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
