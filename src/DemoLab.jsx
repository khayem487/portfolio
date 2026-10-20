import { useEffect, useRef, useState } from "react";
import { projects } from "./data/projects.js";
import { Icon } from "./icons.jsx";
import {
  SmartHomeDemo,
  CarRentalDemo,
  HealthRadarDemo,
  OopGameDemo,
} from "./demos/web.jsx";
import {
  CrousDemo,
  FanReplayDemo,
  PluginsDemo,
  WatchPartyDemo,
  SteamDemo,
} from "./demos/tools.jsx";
import { AslDemo, AttendanceDemo, ExchangeDemo } from "./demos/core.jsx";
import "./lab.css";

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
const local = (value, lang) =>
  typeof value === "string" ? value : value?.[lang] || value?.fr || "";
const localAsset = (path) =>
  /^https?:/.test(path) ? path : `${import.meta.env.BASE_URL}${path}`;
const modules = {
  "asl-recognition": AslDemo,
  "facial-attendance": AttendanceDemo,
  "smart-home": SmartHomeDemo,
  "car-rental": CarRentalDemo,
  healthradar: HealthRadarDemo,
  "oop-game-java": OopGameDemo,
  "crous-notifier": CrousDemo,
  "adaptive-fan-control": FanReplayDemo,
  "vencord-plugins": PluginsDemo,
  "watch-party": WatchPartyDemo,
  "steam-recommendations": SteamDemo,
  "exchange-matcher": ExchangeDemo,
};

export default function DemoLab({ id }) {
  const [lang, setLang] = useState(() => read("portfolio-language", "fr"));
  const [theme, setTheme] = useState(() =>
    read(
      "portfolio-theme",
      matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    )
  );
  const frameRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(720);
  const project = projects.find((p) => p.id === id);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101827" : "#f8f9fb");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${
      project ? local(project.title, lang) : "Laboratoire"
    } · Khayem`;
    try {
      localStorage.setItem("portfolio-language", lang);
    } catch {}
  }, [lang, project]);
  useEffect(() => {
    const resize = (event) => {
      if (
        event.origin === location.origin &&
        event.source === frameRef.current?.contentWindow &&
        event.data?.type === "portfolio-lab-size" &&
        Number.isFinite(event.data.height)
      )
        setFrameHeight(Math.min(5000, Math.max(360, event.data.height)));
    };
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);
  const Demo = modules[id];
  const iframePath =
    id === "onetech-tender-agent"
      ? "stage-demo/index.html"
      : id === "data-dashboard"
      ? "demos/data-dashboard/index.html"
      : null;
  const en = lang === "en";
  return (
    <div className="demo-lab">
      <a
        className="skip-link"
        href="#lab-main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("lab-main");
          main?.scrollIntoView({ behavior: "instant" });
          main?.focus({ preventScroll: true });
        }}
      >
        {en ? "Skip to the demo" : "Aller à la démo"}
      </a>
      <header className="lab-header">
        <a className="brand" href="#projects">
          khayem<span>.</span>
          <small> / lab</small>
        </a>
        <div className="lab-header-actions">
          <a className="lab-back" href="#projects">
            <Icon name="arrow" size={16} />
            {en ? "Portfolio" : "Portfolio"}
          </a>
          <button
            className="lab-button"
            onClick={() => setLang(en ? "fr" : "en")}
            aria-label={en ? "Passer en français" : "Switch to English"}
          >
            {en ? "FR" : "EN"}
          </button>
          <button
            className="lab-button lab-icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={en ? "Change colour theme" : "Changer le thème"}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
        </div>
      </header>
      <div className="lab-layout">
        <aside
          className="lab-sidebar"
          aria-label={en ? "Project navigation" : "Navigation des projets"}
        >
          <p className="lab-sidebar-title">
            {en ? "PROJECT WORKSPACE" : "ATELIERS PROJETS"}
            <span>{projects.length}</span>
          </p>
          <nav>
            {projects.map((p, index) => (
              <a
                key={p.id}
                href={`#demo/${p.id}`}
                aria-current={p.id === id ? "page" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {local(p.title, lang)}
              </a>
            ))}
          </nav>
          <p className="lab-sidebar-note">
            {en
              ? "Try an interaction, explore the result, then read the source."
              : "Essayez une interaction, explorez le résultat, puis découvrez le code."}
          </p>
        </aside>
        <main className="lab-main" id="lab-main" tabIndex={-1}>
          <div className="lab-project-picker">
            <label htmlFor="lab-project">{en ? "Project" : "Projet"}</label>
            <select
              id="lab-project"
              value={project?.id || ""}
              onChange={(e) => {
                location.hash = `demo/${e.target.value}`;
              }}
            >
              {!project && <option value="">—</option>}
              {projects.map((p) => (
                <option value={p.id} key={p.id}>
                  {local(p.title, lang)}
                </option>
              ))}
            </select>
          </div>
          {project ? (
            <>
              <div className="lab-titlebar">
                <div>
                  <p className="lab-kicker">
                    {project.tech.slice(0, 3).join(" / ")}
                  </p>
                  <h1>{local(project.title, lang)}</h1>
                </div>
                <div className="lab-title-actions">
                  {project.codeUrl && (
                    <a
                      className="lab-button"
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="github" size={16} />
                      {en ? "Source" : "Code source"}
                    </a>
                  )}
                  {project.originalDemo &&
                    /^https?:/.test(project.originalDemo.url) && (
                      <a
                        className="lab-button"
                        href={project.originalDemo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {en ? "Server application" : "Application serveur"}
                        <Icon name="external" size={14} />
                      </a>
                    )}
                  <a className="lab-button" href={`#project/${project.id}`}>
                    {en ? "Project details" : "Fiche projet"}
                    <Icon name="arrow" size={15} />
                  </a>
                </div>
              </div>
              {iframePath ? (
                <iframe
                  ref={frameRef}
                  key={`${id}-${theme}`}
                  className="lab-frame"
                  style={{ height: frameHeight }}
                  title={local(project.title, lang)}
                  src={`${localAsset(iframePath)}?embed=1&theme=${theme}`}
                  loading="eager"
                />
              ) : Demo ? (
                <Demo key={id} lang={lang} />
              ) : (
                <p>
                  {en
                    ? "Choose a project from the list."
                    : "Choisissez un projet dans la liste."}
                </p>
              )}
            </>
          ) : (
            <section className="lab-card">
              <h1>{en ? "Project not found" : "Projet introuvable"}</h1>
              <a href="#projects">
                {en ? "Back to projects" : "Retour aux projets"}
              </a>
            </section>
          )}
          <footer className="lab-footer">
            <span>
              Khayem Ben Ghorbel ·{" "}
              {en ? "Project workspace" : "Ateliers projets"}
            </span>
            <a href="#projects">
              {en ? "Back to portfolio" : "Retour au portfolio"} ↗
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
