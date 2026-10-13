import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects, uiText} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";

export default function StartupProject() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const t = uiText[language] || uiText.en;

  if (!bigProjects.display) {
    return null;
  }

  const title =
    language === "fr"
      ? bigProjects.titleFr || bigProjects.title
      : bigProjects.title;
  const subtitle =
    language === "fr"
      ? bigProjects.subtitleFr || bigProjects.subtitle
      : bigProjects.subtitle;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{title}</h1>
          <p
            className={
              isDark
                ? "dark-mode project-subtitle"
                : "subTitle project-subtitle"
            }
          >
            {subtitle}
          </p>

          <div className="projects-container">
            {bigProjects.projects.map((project, i) => {
              const projectName =
                language === "fr"
                  ? project.projectNameFr || project.projectName
                  : project.projectName;
              const projectDesc =
                language === "fr"
                  ? project.projectDescFr || project.projectDesc
                  : project.projectDesc;
              const impactPoints =
                language === "fr"
                  ? project.impactPointsFr || project.impactPoints
                  : project.impactPoints;
              const previewAlt =
                language === "fr"
                  ? project.preview?.altFr || project.preview?.alt
                  : project.preview?.alt;
              const previewCaption =
                language === "fr"
                  ? project.preview?.captionFr || project.preview?.caption
                  : project.preview?.caption;

              return (
                <div
                  key={i}
                  className={
                    isDark
                      ? "dark-mode project-card project-card-dark"
                      : "project-card project-card-light"
                  }
                >
                  {project.preview ? (
                    <details className="project-preview">
                      <summary
                        aria-label={
                          language === "fr"
                            ? `Voir l’aperçu de ${projectName}`
                            : `See preview of ${projectName}`
                        }
                      >
                        <img
                          src={project.preview.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="project-preview-thumbnail"
                        />
                        <span className="project-preview-summary">
                          {language === "fr" ? "Voir l’aperçu" : "See preview"}
                          <span className="project-preview-type">
                            {language === "fr"
                              ? "Capture de la démo"
                              : "Demo screenshot"}
                          </span>
                        </span>
                      </summary>
                      <figure className="project-preview-figure">
                        <img
                          src={project.preview.image}
                          alt={previewAlt}
                          loading="lazy"
                          className="project-preview-image"
                        />
                        <figcaption>{previewCaption}</figcaption>
                      </figure>
                      <a
                        className="project-preview-fullsize"
                        href={project.preview.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {language === "fr"
                          ? "Ouvrir la capture en grand"
                          : "Open full-size screenshot"}
                      </a>
                    </details>
                  ) : project.image ? (
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={projectName}
                        className="card-image"
                      ></img>
                    </div>
                  ) : null}

                  <div className="project-detail">
                    <h5
                      className={isDark ? "dark-mode card-title" : "card-title"}
                    >
                      {projectName}
                    </h5>

                    <p
                      className={
                        isDark ? "dark-mode card-subtitle" : "card-subtitle"
                      }
                    >
                      {projectDesc}
                    </p>

                    {!!impactPoints?.length && (
                      <ul className="project-impact-list">
                        {impactPoints.map((point, idx) => (
                          <li key={idx} className="project-impact-item">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.footerLink ? (
                      <div className="project-card-footer">
                        {project.footerLink.map((link, linkIdx) => {
                          const label =
                            language === "fr"
                              ? link.nameFr || t.actions.viewCode
                              : link.name || t.actions.viewCode;
                          return (
                            <span className="project-link-group" key={linkIdx}>
                              <a
                                className={
                                  isDark
                                    ? "dark-mode project-tag"
                                    : "project-tag"
                                }
                                href={link.url}
                                target={
                                  link.url.startsWith("#")
                                    ? undefined
                                    : "_blank"
                                }
                                rel={
                                  link.url.startsWith("#")
                                    ? undefined
                                    : "noopener noreferrer"
                                }
                              >
                                {label}
                              </a>
                              {link.isLiveDemo && (
                                <small className="project-startup-note">
                                  {language === "fr"
                                    ? "Le serveur peut prendre environ une minute à démarrer."
                                    : "The server may take about a minute to start."}
                                </small>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
