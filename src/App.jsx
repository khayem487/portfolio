import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { projects, profile } from "./data/projects.js";
import { Icon } from "./icons.jsx";
import "./styles.css";

const copy = {
  fr: {
    skip: "Aller au contenu",
    projects: "Projets",
    journey: "Parcours",
    contact: "Contact",
    menu: "Ouvrir le menu",
    close: "Fermer",
    themeDark: "Activer le thème sombre",
    themeLight: "Activer le thème clair",
    language: "Switch to English",
    heroLabel: "Étudiant ingénieur · CY Tech · Cergy",
    heroTitleA: "Khayem",
    heroTitleB: "Ben Ghorbel.",
    heroLead: "IA, données & développement logiciel.",
    heroDescription:
      "Des documents à analyser, des signes à reconnaître, des données à explorer : je construis les applications qui relient ces idées à un usage concret.",
    availability:
      "Stage de 4–6 mois dès mars 2027 · Contrat pro de 12 mois dès septembre 2027",
    explore: "Explorer les projets",
    cv: "Mon CV",
    availabilityLabel: "Prochaines opportunités",
    pipelineLabel: "DANS LES COULISSES D’UN PROJET",
    pipelineTitle: "Des documents à une décision éclairée.",
    pipelineNote: "Agent d’analyse d’appels d’offres · Stage One Tech",
    pipelineSteps: [
      ["Documents", "Rassembler les sources"],
      ["Extraction", "Structurer l’information"],
      ["Analyse", "Relier les critères aux sources"],
      ["Décision", "Préparer une fiche de synthèse"],
    ],
    pipelineFooter: "Un parcours traçable, avec validation humaine.",
    pipelineLink: "Découvrir le projet",
    selectedLabel: "01 / PROJETS",
    selectedTitle: "Ce que je construis.",
    selectedDescription:
      "Des projets pour apprendre, expérimenter et résoudre des problèmes concrets.",
    featured: "À la une",
    all: "Tous les projets",
    ai: "IA & Data",
    web: "Web & applications",
    tools: "Outils",
    search: "Rechercher un projet",
    searchPlaceholder: "Un projet, une technologie…",
    results: (n) => `${n} projet${n > 1 ? "s" : ""}`,
    noResults: "Aucun projet ne correspond à cette recherche.",
    clear: "Effacer la recherche",
    details: "Le projet",
    code: "Voir le code",
    demo: "Démo en ligne",
    interactive: "Essayer",
    illustrative: "Démo illustrative",
    status: {
      live: "Démo en ligne",
      interactive: "Démo interactive",
      "case-study": "Présentation du projet",
      prototype: "Prototype",
    },
    categories: {
      ai: "Intelligence artificielle",
      data: "Données & visualisation",
      web: "Web & applications",
      tools: "Logiciels & outils",
    },
    role: "Mon rôle",
    context: "Le contexte",
    work: "Ce que j’ai réalisé",
    outcomes: "Ce que le projet apporte",
    stack: "Technologies",
    source: "Code source",
    projectLinks: "Explorer ce projet",
    previewLabel: "Aperçu du projet",
    modalClose: "Fermer la présentation du projet",
    detailsTitle: "LE PROJET EN DÉTAIL",
    journeyLabel: "03 / PARCOURS",
    journeyTitle: "Apprendre en faisant.",
    journeyDescription:
      "De la préparation scientifique à CY Tech, avec deux stages pour mettre mes connaissances à l’épreuve du terrain.",
    experience: "Expérience",
    education: "Formation",
    skills: "Mes terrains de travail",
    skillGroups: [
      ["IA & données", "Python, OpenCV, scikit-learn, SQL"],
      ["Applications", "React, Java, Flask, interfaces web"],
      ["Outils & méthode", "Git, Docker, automatisation, documentation"],
    ],
    contactLabel: "05 / CONTACT",
    contactTitle: "Et si on travaillait ensemble ?",
    contactDescription:
      "Un stage, une alternance ou un projet à discuter ? Je serai ravi d’échanger avec vous.",
    contactMail: "Écrivez-moi",
    footer: "Conçu avec soin, développé avec curiosité.",
    backTop: "Retour en haut",
    githubLabel: "Mon profil GitHub",
    linkedinLabel: "Mon profil LinkedIn",
    external: "S’ouvre dans un nouvel onglet",
    copyright: "Portfolio de Khayem Ben Ghorbel",
  },
  en: {
    skip: "Skip to content",
    projects: "Projects",
    journey: "Background",
    contact: "Contact",
    menu: "Open menu",
    close: "Close",
    themeDark: "Switch to dark mode",
    themeLight: "Switch to light mode",
    language: "Passer en français",
    heroLabel: "Engineering student · CY Tech · Cergy",
    heroTitleA: "Khayem",
    heroTitleB: "Ben Ghorbel.",
    heroLead: "AI, data & software development.",
    heroDescription:
      "Documents to analyse, signs to recognise, data to explore: I build applications that connect these ideas to practical use.",
    availability:
      "4–6 month internship from March 2027 · 12-month professional training contract from September 2027",
    explore: "Explore my projects",
    cv: "My résumé",
    availabilityLabel: "Upcoming opportunities",
    pipelineLabel: "BEHIND THE PROJECT",
    pipelineTitle: "From documents to an informed decision.",
    pipelineNote: "Tender analysis agent · One Tech internship",
    pipelineSteps: [
      ["Documents", "Gather the sources"],
      ["Extraction", "Structure the information"],
      ["Analysis", "Connect criteria to sources"],
      ["Decision", "Prepare a decision brief"],
    ],
    pipelineFooter: "A traceable process, with human review.",
    pipelineLink: "Explore the project",
    selectedLabel: "01 / PROJECTS",
    selectedTitle: "What I build.",
    selectedDescription:
      "Projects to learn, experiment and solve practical problems.",
    featured: "Selected",
    all: "All projects",
    ai: "AI & Data",
    web: "Web & applications",
    tools: "Tools",
    search: "Search projects",
    searchPlaceholder: "A project, a technology…",
    results: (n) => `${n} project${n !== 1 ? "s" : ""}`,
    noResults: "No projects match your search.",
    clear: "Clear search",
    details: "The project",
    code: "View code",
    demo: "Live demo",
    interactive: "Try it",
    illustrative: "Illustrative demo",
    status: {
      live: "Live demo",
      interactive: "Interactive demo",
      "case-study": "Project overview",
      prototype: "Prototype",
    },
    categories: {
      ai: "Artificial intelligence",
      data: "Data & visualisation",
      web: "Web & applications",
      tools: "Software & tools",
    },
    role: "My role",
    context: "The context",
    work: "What I built",
    outcomes: "What the project brings",
    stack: "Technologies",
    source: "Source code",
    projectLinks: "Explore this project",
    previewLabel: "Project preview",
    modalClose: "Close project overview",
    detailsTitle: "INSIDE THE PROJECT",
    journeyLabel: "03 / BACKGROUND",
    journeyTitle: "Learning by building.",
    journeyDescription:
      "From scientific preparation to CY Tech, with two internships to put my knowledge into practice.",
    experience: "Experience",
    education: "Education",
    skills: "Where I work",
    skillGroups: [
      ["AI & data", "Python, OpenCV, scikit-learn, SQL"],
      ["Applications", "React, Java, Flask, web interfaces"],
      ["Tools & methods", "Git, Docker, automation, documentation"],
    ],
    contactLabel: "05 / CONTACT",
    contactTitle: "Let’s build something together.",
    contactDescription:
      "An internship, a work-study position or a project to discuss? I’d be happy to hear from you.",
    contactMail: "Get in touch",
    footer: "Made with care. Built with curiosity.",
    backTop: "Back to top",
    githubLabel: "My GitHub profile",
    linkedinLabel: "My LinkedIn profile",
    external: "Opens in a new tab",
    copyright: "Khayem Ben Ghorbel’s portfolio",
  },
};

const localText = (value, lang) =>
  typeof value === "string" ? value : value?.[lang] ?? value?.fr ?? "";
const localList = (value, lang) =>
  Array.isArray(value) ? value : value?.[lang] ?? value?.fr ?? [];
const asset = (path) =>
  !path
    ? ""
    : /^(https?:|mailto:|#)/.test(path)
    ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const cvUrl = `${
  import.meta.env.BASE_URL
}CV_Khayem_General_Informatique.pdf?v=864123f4`;
const readSetting = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const proofMedia = {
  "asl-recognition": {
    src: "demo-previews/asl.png",
    caption: { fr: "Interface de l’application Flask de reconnaissance ASL.", en: "Interface of the Flask ASL recognition application." },
  },
  "facial-attendance": {
    src: "demo-previews/facial.png",
    caption: { fr: "Interface de l’application Flask de pointage facial.", en: "Interface of the Flask facial attendance application." },
  },
  "car-rental": {
    src: "demo-previews/rental.png",
    caption: { fr: "Interface de l’application Spring Boot de location.", en: "Interface of the Spring Boot rental application." },
  },
  "onetech-tender-agent": {
    src: "project-media/tender-walkthrough.png",
    caption: {
      fr: "Capture du parcours pédagogique public : données fictives et extraction préétablie, sans exécution du pipeline IA.",
      en: "Screenshot of the public educational walkthrough: fictional data and precomputed extraction, without running the AI pipeline.",
    },
  },
  "data-dashboard": {
    src: "project-media/dashboard-browser.png",
    caption: {
      fr: "Capture de la démonstration interactive : dépenses, catégories et fournisseurs issus du jeu de données simulées du projet.",
      en: "Screenshot of the interactive demo: spending, categories and suppliers from the project’s simulated dataset.",
    },
  },
};

const skillEvidence = [
  {
    id: "onetech-tender-agent",
    icon: "document",
    title: { fr: "IA & documents", en: "AI & documents" },
    tech: "Python · OCR · MCP · n8n",
    text: {
      fr: "Collecter des sources, extraire l’information et préparer une analyse traçable.",
      en: "Collecting sources, extracting information and preparing a traceable analysis.",
    },
  },
  {
    id: "asl-recognition",
    icon: "code",
    title: { fr: "Vision par ordinateur", en: "Computer vision" },
    tech: "OpenCV · MediaPipe · scikit-learn",
    text: {
      fr: "Passer d’une image aux repères de la main, puis à une prédiction accessible depuis le navigateur.",
      en: "Turning an image into hand landmarks and a prediction accessible in the browser.",
    },
  },
  {
    id: "smart-home",
    icon: "code",
    title: { fr: "Applications & API", en: "Applications & APIs" },
    tech: "Java · Spring Boot · React · SQL",
    text: {
      fr: "Relier une interface, une API et une base de données autour d’un parcours utilisateur.",
      en: "Connecting an interface, API and database around a user journey.",
    },
  },
  {
    id: "data-dashboard",
    icon: "document",
    title: { fr: "Données & visualisation", en: "Data & visualisation" },
    tech: "Pandas · NumPy · Flask · Chart.js",
    text: {
      fr: "Préparer les données et construire des indicateurs que l’on peut explorer et vérifier.",
      en: "Preparing data and building indicators that can be explored and checked.",
    },
  },
];

function PersonalIntro({ lang }) {
  return (
    <section className="personal-intro section-shell" id="intro">
      <p className="personal-index eyebrow">
        {lang === "fr" ? "LE FIL CONDUCTEUR" : "THE COMMON THREAD"}
      </p>
      <div className="personal-copy">
        <h2 className="profile-title">
          {lang === "fr"
            ? "Comprendre le problème. Construire la solution."
            : "Understand the problem. Build the solution."}
        </h2>
        <p>{localText(profile.about, lang)}</p>
      </div>
      <div className="personal-facts">
        <p>
          <Icon name="pin" size={17} />
          <span>Cergy, France</span>
        </p>
        <p>
          <Icon name="document" size={17} />
          <span>
            {lang === "fr"
              ? "CY Tech · 2e année · niveau M1"
              : "CY Tech · 2nd year · M1 level"}
          </span>
        </p>
        <a href="#about">
          {lang === "fr" ? "Voir mon parcours" : "Explore my background"}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}

function SkillsEvidence({ lang, onOpen }) {
  return (
    <section className="skills-section section-shell" id="skills">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {lang === "fr"
              ? "02 / COMPÉTENCES EN PRATIQUE"
              : "02 / SKILLS IN PRACTICE"}
          </p>
          <h2>
            {lang === "fr"
              ? "Des outils, et ce que j’en fais."
              : "Tools, and what I do with them."}
          </h2>
        </div>
        <p>
          {lang === "fr"
            ? "Chaque domaine se retrouve dans un projet concret. Cliquez pour voir comment."
            : "Each area connects to a concrete project. Explore how it works."}
        </p>
      </div>
      <div className="skill-evidence-grid">
        {skillEvidence.map((skill, index) => (
          <article className="skill-evidence-card" key={skill.id}>
            <span className="profile-kicker">
              0{index + 1}
              <Icon name={skill.icon} />
            </span>
            <h3>{localText(skill.title, lang)}</h3>
            <p>{localText(skill.text, lang)}</p>
            <p className="skill-tech">{skill.tech}</p>
            <button className="text-button" onClick={() => onOpen(skill.id)}>
              {lang === "fr"
                ? "Voir le projet associé"
                : "See the related project"}
              <Icon name="arrow" size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Achievements({ lang, onOpen }) {
  return (
    <section className="achievements-section section-shell" id="achievements">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {lang === "fr"
              ? "04 / CONCOURS & LANGUES"
              : "04 / COMPETITIONS & LANGUAGES"}
          </p>
          <h2>
            {lang === "fr"
              ? "Apprendre aussi en équipe."
              : "Learning as a team, too."}
          </h2>
        </div>
        <p>
          {lang === "fr"
            ? "Des défis pour pratiquer, confronter les idées et progresser ensemble."
            : "Challenges to practise, compare ideas and make progress together."}
        </p>
      </div>
      <div className="achievement-grid">
        {(profile.achievements || []).map((achievement, index) => (
          <article className="achievement-card" key={achievement.id}>
            <p className="achievement-type">
              <span>
                {index === 0
                  ? lang === "fr"
                    ? "DISTINCTION"
                    : "AWARD"
                  : lang === "fr"
                  ? "PARTICIPATION"
                  : "PARTICIPATION"}
              </span>
              <span>{achievement.year}</span>
            </p>
            <h3>{localText(achievement.title, lang)}</h3>
            <p>{localText(achievement.description, lang)}</p>
            {achievement.projectId && (
              <button
                className="text-button"
                onClick={() => onOpen(achievement.projectId)}
              >
                {lang === "fr" ? "Découvrir le projet" : "Explore the project"}
                <Icon name="arrow" size={16} />
              </button>
            )}
          </article>
        ))}
      </div>
      <div
        className="languages-list"
        aria-label={lang === "fr" ? "Langues" : "Languages"}
      >
        {(profile.languages || []).map((language) => (
          <div className="language-item" key={language.id}>
            <strong>{localText(language.name, lang)}</strong>
            <span>{localText(language.level, lang)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExternalLink({ href, children, className = "", label, ...props }) {
  const internal = href.startsWith("#");
  return (
    <a
      href={asset(href)}
      className={className}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      aria-label={label}
      {...props}
    >
      {children}
    </a>
  );
}

function Pipeline({ t, onOpen }) {
  return (
    <div className="pipeline-card">
      <div className="pipeline-top">
        <span className="pipeline-symbol" aria-hidden="true">
          kb<span>/</span>
        </span>
        <span>{t.pipelineLabel}</span>
        <span className="tiny-orbit" aria-hidden="true" />
      </div>
      <div className="pipeline-heading">
        <p>{t.pipelineNote}</p>
        <h2>{t.pipelineTitle}</h2>
      </div>
      <ol className="pipeline-steps">
        {t.pipelineSteps.map(([title, description], index) => (
          <li key={title}>
            <span className="pipeline-number">0{index + 1}</span>
            <div>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
            <span className="pipeline-node" aria-hidden="true">
              {index === 3 ? <Icon name="check" size={15} /> : <span />}
            </span>
          </li>
        ))}
      </ol>
      <div className="pipeline-bottom">
        <p>
          <span aria-hidden="true" />
          {t.pipelineFooter}
        </p>
        <button className="text-button" onClick={onOpen}>
          {t.pipelineLink}
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project, lang, t, onOpen }) {
  return (
    <article className="project-card">
      <button
        className="project-media"
        onClick={() => onOpen(project.id)}
        aria-label={`${t.details} : ${localText(project.title, lang)}`}
      >
        <img
          src={asset(proofMedia[project.id]?.src || project.art)}
          alt=""
          loading="lazy"
          width="960"
          height="600"
        />
        <span className={`project-status status-${project.status}`}>
          <span />
          {t.status[project.status] || t.status["case-study"]}
        </span>
        <span className="media-open" aria-hidden="true">
          <Icon name="external" size={18} />
        </span>
      </button>
      <div className="project-body">
        <div className="project-meta">
          <span>{t.categories[project.category]}</span>
          <span>{project.year}</span>
        </div>
        <h3>
          <button onClick={() => onOpen(project.id)}>
            {localText(project.title, lang)}
          </button>
        </h3>
        <p className="project-summary">{localText(project.summary, lang)}</p>
        <ul className="project-tech" aria-label={t.stack}>
          {project.tech.slice(0, 3).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {project.tech.length > 3 && (
            <li
              className="tech-more"
              aria-label={`+${project.tech.length - 3}`}
            >
              +{project.tech.length - 3}
            </li>
          )}
        </ul>
        <div className="project-actions">
          <button className="card-details" onClick={() => onOpen(project.id)}>
            {t.details}
            <Icon name="arrow" size={17} />
          </button>
          <div className="project-outlinks">
            {project.codeUrl && (
              <ExternalLink
                href={project.codeUrl}
                className="icon-link"
                label={`${t.code} : ${localText(project.title, lang)}`}
                title={t.code}
              >
                <Icon name="github" size={18} />
              </ExternalLink>
            )}
            {project.demo && (
              <ExternalLink href={project.demo.url} className="card-demo">
                {project.demo.kind === "illustrative"
                  ? t.illustrative
                  : project.demo.kind === "interactive"
                  ? t.interactive
                  : t.demo}
                <Icon name="external" size={13} />
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, lang, t, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
        if (dialog.open) dialog.close();
        previous?.focus?.({ preventScroll: true });
      };
    }
  }, [project]);
  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-project-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-content">
          <div className="dialog-top">
            <span className="eyebrow">{t.detailsTitle}</span>
            <button
              className="icon-button dialog-close"
              autoFocus
              aria-label={t.modalClose}
              onClick={onClose}
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="dialog-heading">
            <div>
              <p className="project-meta">
                <span>{t.categories[project.category]}</span>
                <span>{project.year}</span>
              </p>
              <h2 id="dialog-project-title">
                {localText(project.title, lang)}
              </h2>
              <p className="dialog-summary">
                {localText(project.summary, lang)}
              </p>
            </div>
            <span className={`project-status status-${project.status}`}>
              <span />
              {t.status[project.status]}
            </span>
          </div>
          <figure className="dialog-figure">
            <img
              className="dialog-art"
              src={asset(proofMedia[project.id]?.src || project.art)}
              alt={
                proofMedia[project.id]
                  ? localText(proofMedia[project.id].caption, lang)
                  : `${t.previewLabel} : ${localText(project.title, lang)}`
              }
              width="960"
              height="600"
            />
            <figcaption className="story-caption">
              {proofMedia[project.id]
                ? localText(proofMedia[project.id].caption, lang)
                : lang === "fr"
                ? "Schéma illustratif du projet."
                : "Illustrative project diagram."}
            </figcaption>
          </figure>
          <div className="dialog-overview">
            <div>
              <h3>{t.context}</h3>
              <p>{localText(project.context, lang)}</p>
            </div>
            <div>
              <h3>{t.role}</h3>
              <p>{localText(project.role, lang)}</p>
            </div>
          </div>
          <div className="dialog-columns">
            <div>
              <h3>{localText(project.workLabel, lang) || t.work}</h3>
              <ul>
                {localList(project.work, lang).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t.outcomes}</h3>
              <ul>
                {localList(project.outcomes, lang).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {project.note && (
            <p className="project-note">
              <Icon name="document" size={19} />
              {localText(project.note, lang)}
            </p>
          )}
          <div className="dialog-footer">
            <div>
              <h3>{t.stack}</h3>
              <ul className="project-tech">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="dialog-links" aria-label={t.projectLinks}>
              {project.codeUrl && (
                <ExternalLink
                  href={project.codeUrl}
                  className="button button-secondary"
                >
                  <Icon name="github" size={17} />
                  {localText(project.codeLabel, lang) || t.source}
                </ExternalLink>
              )}
              {project.demo && (
                <ExternalLink
                  href={project.demo.url}
                  className="button button-primary"
                >
                  {localText(project.demo.label, lang) || t.demo}
                  <Icon name="external" size={16} />
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function App() {
  const [lang, setLang] = useState(() =>
    readSetting("portfolio-language", "fr")
  );
  const [theme, setTheme] = useState(() =>
    readSetting(
      "portfolio-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    )
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);
  const t = copy[lang] || copy.fr;
  const activeProject =
    projects.find((project) => project.id === openId) || null;
  const featuredProject =
    projects.find((project) =>
      /onetech|one-tech|tender|stage/.test(project.id)
    ) ||
    projects.find((project) => project.featured) ||
    projects[0];
  useLayoutEffect(() => {
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
    document.title = `Khayem Ben Ghorbel — ${
      lang === "fr" ? "IA, données & logiciels" : "AI, data & software"
    }`;
    try {
      localStorage.setItem("portfolio-language", lang);
    } catch {}
  }, [lang]);
  useEffect(() => {
    const syncHash = () => {
      const match = window.location.hash.match(/^#project\/(.+)$/);
      setOpenId(match ? decodeURIComponent(match[1]) : null);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const openProject = (id) => {
    window.history.pushState(null, "", `#project/${encodeURIComponent(id)}`);
    setOpenId(id);
  };
  const closeProject = () => {
    window.history.replaceState(null, "", "#projects");
    setOpenId(null);
  };
  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory =
          filter === "all" ||
          (filter === "featured" && project.featured) ||
          (filter === "ai" && ["ai", "data"].includes(project.category)) ||
          filter === project.category;
        const query = search.trim().toLocaleLowerCase(lang);
        const matchesSearch =
          !query ||
          [
            localText(project.title, lang),
            localText(project.summary, lang),
            ...project.tech,
          ]
            .join(" ")
            .toLocaleLowerCase(lang)
            .includes(query);
        return matchesCategory && matchesSearch;
      }),
    [filter, search, lang]
  );
  const setCategory = (value) => {
    setFilter(value);
    setShowAll(false);
  };
  const listedProjects =
    filter === "all" && !search.trim() && !showAll
      ? visibleProjects.slice(0, 6)
      : visibleProjects;
  const navClose = () => setMenuOpen(false);
  const email = profile.email;
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="brand"
            href="#top"
            onClick={navClose}
            aria-label="Khayem — accueil"
          >
            khayem<span aria-hidden="true">.</span>
          </a>
          <nav
            className={`site-nav ${menuOpen ? "is-open" : ""}`}
            id="site-navigation"
            aria-label={
              lang === "fr" ? "Navigation principale" : "Main navigation"
            }
          >
            <a href="#projects" onClick={navClose}>
              {t.projects}
            </a>
            <a href="#skills" onClick={navClose}>
              {lang === "fr" ? "Compétences" : "Skills"}
            </a>
            <a href="#about" onClick={navClose}>
              {t.journey}
            </a>
            <a href="#achievements" onClick={navClose}>
              {lang === "fr" ? "Réalisations" : "Highlights"}
            </a>
            <a href="#contact" onClick={navClose}>
              {t.contact}
              <Icon name="external" size={13} />
            </a>
          </nav>
          <div className="header-controls">
            <button
              className="language-switch"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              aria-label={t.language}
            >
              <span className={lang === "fr" ? "is-current" : ""}>FR</span>
              <span aria-hidden="true" className="language-divider">
                /
              </span>
              <span className={lang === "en" ? "is-current" : ""}>EN</span>
            </button>
            <span className="control-divider" aria-hidden="true" />
            <button
              className="icon-button theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? t.themeDark : t.themeLight}
            >
              <Icon name={theme === "light" ? "moon" : "sun"} size={19} />
            </button>
            <button
              className="icon-button menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              aria-label={menuOpen ? t.close : t.menu}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero section-shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="label-line" />
              {t.heroLabel}
            </p>
            <h1>
              {t.heroTitleA}
              <br />
              <span>{t.heroTitleB}</span>
            </h1>
            <p className="hero-lead">{t.heroLead}</p>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                {t.explore}
                <Icon name="arrow" size={18} />
              </a>
              <a
                className="button button-secondary"
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.cv}
                <Icon name="download" size={17} />
              </a>
            </div>
            <p className="availability">
              <span className="availability-dot" aria-hidden="true" />
              <span>
                <strong>{t.availabilityLabel}</strong>
                {localText(profile.availability, lang) || t.availability}
              </span>
            </p>
          </div>
          <div className="hero-visual">
            <Pipeline
              t={t}
              onOpen={() => featuredProject && openProject(featuredProject.id)}
            />
            <span className="hero-visual-caption">
              {lang === "fr"
                ? "EXPLORER · CONSTRUIRE · AMÉLIORER"
                : "EXPLORE · BUILD · IMPROVE"}
              <span aria-hidden="true">↘</span>
            </span>
          </div>
        </section>
        <div
          className="proof-strip section-shell"
          aria-label={lang === "fr" ? "Quelques repères" : "At a glance"}
        >
          <article>
            <strong>02</strong>
            <span>
              {lang === "fr" ? "stages en entreprise" : "industry internships"}
            </span>
            <p>One Tech · Kernel</p>
          </article>
          <article>
            <strong>{lang === "fr" ? "2e prix" : "2nd prize"}</strong>
            <span>
              {lang === "fr"
                ? "hackathon IA · IEEE CS"
                : "AI hackathon · IEEE CS"}
            </span>
            <p>
              {lang === "fr"
                ? "Vision & reconnaissance de signes"
                : "Vision & sign recognition"}
            </p>
          </article>
          <article>
            <strong>2028</strong>
            <span>
              {lang === "fr"
                ? "diplôme d’ingénieur visé"
                : "expected engineering degree"}
            </span>
            <p>CY Tech · Informatique</p>
          </article>
        </div>
        <PersonalIntro lang={lang} />
        <section className="projects-section section-shell" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.selectedLabel}</p>
              <h2>{t.selectedTitle}</h2>
            </div>
            <p>{t.selectedDescription}</p>
          </div>
          <div className="project-toolbar">
            <div
              className="project-filters"
              role="group"
              aria-label={
                lang === "fr" ? "Filtrer les projets" : "Filter projects"
              }
            >
              {["featured", "all", "ai", "web", "tools"].map((category) => (
                <button
                  key={category}
                  className={filter === category ? "is-active" : ""}
                  aria-pressed={filter === category}
                  onClick={() => setCategory(category)}
                >
                  {t[category]}
                  {category === "all" && <span>{projects.length}</span>}
                </button>
              ))}
            </div>
            <div className="project-search">
              <Icon name="search" size={17} />
              <input
                type="search"
                aria-label={t.search}
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  if (event.target.value && filter === "featured")
                    setFilter("all");
                }}
              />
            </div>
          </div>
          <p className="project-count" aria-live="polite">
            {listedProjects.length < visibleProjects.length
              ? lang === "fr"
                ? `${listedProjects.length} projets affichés sur ${visibleProjects.length}`
                : `${listedProjects.length} of ${visibleProjects.length} projects shown`
              : t.results(visibleProjects.length)}
            <span aria-hidden="true" />
          </p>
          <div className="projects-grid">
            {listedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                lang={lang}
                t={t}
                onOpen={openProject}
              />
            ))}
          </div>
          {listedProjects.length < visibleProjects.length && (
            <div className="projects-more">
              <button
                className="button button-secondary"
                onClick={() => setShowAll(true)}
              >
                {lang === "fr"
                  ? `Voir les ${visibleProjects.length} projets`
                  : `View all ${visibleProjects.length} projects`}
                <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
          {!visibleProjects.length && (
            <div className="empty-results">
              <Icon name="search" size={28} />
              <p>{t.noResults}</p>
              <button
                className="text-button"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
              >
                {t.clear}
                <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
        </section>
        <SkillsEvidence lang={lang} onOpen={openProject} />
        <section className="about-section" id="about">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.journeyLabel}</p>
                <h2>{t.journeyTitle}</h2>
              </div>
              <p>{t.journeyDescription}</p>
            </div>
            <div className="background-grid">
              <div className="background-column" id="experience">
                <h3 className="column-label">{t.experience}</h3>
                {profile.experience.map((experience, index) => (
                  <article
                    className="timeline-item"
                    key={`${experience.company}-${index}`}
                  >
                    <div className="timeline-marker" aria-hidden="true" />
                    <div>
                      <p className="timeline-dates">{experience.dates}</p>
                      <h4>{localText(experience.title, lang)}</h4>
                      <p className="timeline-place">
                        {experience.company}
                        {experience.location && (
                          <span> · {experience.location}</span>
                        )}
                      </p>
                      <ul>
                        {localList(experience.points, lang).map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
              <div className="background-column education-column">
                <h3 className="column-label">{t.education}</h3>
                {profile.education.map((education, index) => (
                  <article
                    className="education-item"
                    key={`${education.school}-${index}`}
                  >
                    <p className="timeline-dates">{education.dates}</p>
                    <h4>{education.school}</h4>
                    <p>{localText(education.degree, lang)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Achievements lang={lang} onOpen={openProject} />
        <section className="contact-section section-shell" id="contact">
          <div>
            <p className="eyebrow">{t.contactLabel}</p>
            <h2>{t.contactTitle}</h2>
            <p className="contact-description">{t.contactDescription}</p>
            <a className="contact-email" href={`mailto:${email}`}>
              {email}
              <Icon name="arrow" size={28} />
            </a>
          </div>
          <div className="contact-links">
            <ExternalLink
              href={profile.linkedin}
              className="contact-social"
              label={t.linkedinLabel}
            >
              <Icon name="linkedin" size={19} />
              <span>LinkedIn</span>
              <Icon name="external" size={15} />
            </ExternalLink>
            <ExternalLink
              href={profile.github}
              className="contact-social"
              label={t.githubLabel}
            >
              <Icon name="github" size={19} />
              <span>GitHub</span>
              <Icon name="external" size={15} />
            </ExternalLink>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social"
            >
              <Icon name="document" size={19} />
              <span>{t.cv}</span>
              <Icon name="download" size={15} />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a href="#top" className="brand" aria-label={t.backTop}>
          kb<span>.</span>
        </a>
        <p>{t.footer}</p>
        <a href="#top" className="back-top">
          {t.backTop}
          <span aria-hidden="true">↑</span>
        </a>
      </footer>
      <ProjectDialog
        project={activeProject}
        lang={lang}
        t={t}
        onClose={closeProject}
      />
    </>
  );
}
