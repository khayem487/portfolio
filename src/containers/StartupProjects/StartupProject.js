import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects, uiText} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";

export default function StartupProject() {
  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    const win = window.open(url, "_blank");
    win.focus();
  }

  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const t = uiText[language] || uiText.en;

  if (!bigProjects.display) {
    return null;
  }

  const title = language === "fr" ? bigProjects.titleFr || bigProjects.title : bigProjects.title;
  const subtitle =
    language === "fr" ? bigProjects.subtitleFr || bigProjects.subtitle : bigProjects.subtitle;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{title}</h1>
          <p className={isDark ? "dark-mode project-subtitle" : "subTitle project-subtitle"}>
            {subtitle}
          </p>

          <div className="projects-container">
            {bigProjects.projects.map((project, i) => {
              const projectName =
                language === "fr" ? project.projectNameFr || project.projectName : project.projectName;
              const projectDesc =
                language === "fr" ? project.projectDescFr || project.projectDesc : project.projectDesc;
              const impactPoints =
                language === "fr"
                  ? project.impactPointsFr || project.impactPoints
                  : project.impactPoints;

              return (
                <div
                  key={i}
                  className={
                    isDark
                      ? "dark-mode project-card project-card-dark"
                      : "project-card project-card-light"
                  }
                >
                  {project.image ? (
                    <div className="project-image">
                      <img src={project.image} alt={projectName} className="card-image"></img>
                    </div>
                  ) : null}

                  <div className="project-detail">
                    <h5 className={isDark ? "dark-mode card-title" : "card-title"}>{projectName}</h5>

                    <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>
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
                            <span
                              key={linkIdx}
                              className={isDark ? "dark-mode project-tag" : "project-tag"}
                              onClick={() => openUrlInNewTab(link.url)}
                            >
                              {label}
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
