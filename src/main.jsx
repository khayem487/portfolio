import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { projects } from "./data/projects.js";
import "./styles.css";

function PortfolioRoot() {
  const [hash, setHash] = useState(() => location.hash);
  useEffect(() => {
    const sync = () => setHash(location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    const legacyDemo = hash.match(/^#demo\/([^/]+)$/);
    if (legacyDemo) {
      const project = projects.find((item) => item.id === decodeURIComponent(legacyDemo[1]));
      if (project?.demo) window.location.replace(project.demo.url);
      else window.location.replace(project ? `#project/${project.id}` : "#projects");
    } else if (!hash.startsWith("#project/"))
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "instant" });
  }, [hash]);
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PortfolioRoot />
  </React.StrictMode>
);
