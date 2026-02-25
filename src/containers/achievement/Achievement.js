import React, {useContext} from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import {achievementSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";

export default function Achievement() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);

  if (!achievementSection.display) {
    return null;
  }

  const title =
    language === "fr"
      ? achievementSection.titleFr || achievementSection.title
      : achievementSection.title;
  const subtitle =
    language === "fr"
      ? achievementSection.subtitleFr || achievementSection.subtitle
      : achievementSection.subtitle;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="achievements">
        <div className="achievement-main-div">
          <div className="achievement-header">
            <h1
              className={
                isDark
                  ? "dark-mode heading achievement-heading"
                  : "heading achievement-heading"
              }
            >
              {title}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle achievement-subtitle"
                  : "subTitle achievement-subtitle"
              }
            >
              {subtitle}
            </p>
          </div>
          <div className="achievement-cards-div">
            {achievementSection.achievementsCards.map((card, i) => {
              return (
                <AchievementCard
                  key={i}
                  isDark={isDark}
                  language={language}
                  cardInfo={card}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
