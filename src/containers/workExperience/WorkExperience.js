import React, {useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences, uiText} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const t = uiText[language] || uiText.en;
  const localize = (card, key) =>
    language === "fr" ? card[`${key}Fr`] || card[key] : card[key];
  if (workExperiences.display) {
    return (
      <div id="experience">
        <Fade bottom duration={1000} distance="20px">
          <div className="experience-container" id="workExperience">
            <div>
              <h1 className="experience-heading">{t.section.experience}</h1>
              <div className="experience-cards-div">
                {workExperiences.experience.map((card, i) => {
                  return (
                    <article key={i} className={`internship-card${isDark ? " dark-mode" : ""}`}>
                      <h2>{card.company}</h2>
                      <h3>{localize(card, "role")}</h3>
                      <p className="internship-date">{localize(card, "date")}</p>
                      <p>{localize(card, "desc")}</p>
                      <ul>
                        {(localize(card, "descBullets") || []).map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  return null;
}
