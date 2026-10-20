import React, { useEffect, useState, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const DemoLab = lazy(() => import("./DemoLab.jsx"));
function PortfolioRoot() {
  const [hash, setHash] = useState(() => location.hash);
  useEffect(() => {
    const sync = () => setHash(location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (hash.startsWith("#demo/"))
      window.scrollTo({ top: 0, behavior: "instant" });
    else if (!hash.startsWith("#project/"))
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "instant" });
  }, [hash]);
  const match = hash.match(/^#demo\/([^/]+)$/);
  return match ? (
    <Suspense
      fallback={<p className="lab-loading">Chargement de l’atelier…</p>}
    >
      <DemoLab id={decodeURIComponent(match[1])} />
    </Suspense>
  ) : (
    <App />
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PortfolioRoot />
  </React.StrictMode>
);
