import React, {useContext} from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {illustration, skillsSection} from "../../portfolio";
import {Fade} from "react-reveal";
import codingPerson from "../../assets/lottie/codingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);

  if (!skillsSection.display) {
    return null;
  }

  const title = language === "fr" ? skillsSection.titleFr || skillsSection.title : skillsSection.title;
  const subTitle =
    language === "fr" ? skillsSection.subTitleFr || skillsSection.subTitle : skillsSection.subTitle;
  const bullets = language === "fr" ? skillsSection.skillsFr || skillsSection.skills : skillsSection.skills;

  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1000}>
          <div className="skills-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={codingPerson} />
            ) : (
              <img
                alt="Man Working"
                src={require("../../assets/images/developerActivity.svg")}
              ></img>
            )}
          </div>
        </Fade>
        <Fade right duration={1000}>
          <div className="skills-text-div">
            <h1 className={isDark ? "dark-mode skills-heading" : "skills-heading"}>{title}</h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle skills-text-subtitle"
                  : "subTitle skills-text-subtitle"
              }
            >
              {subTitle}
            </p>
            <SoftwareSkill />
            <div>
              {bullets.map((skills, i) => {
                return (
                  <p
                    key={i}
                    className={isDark ? "dark-mode subTitle skills-text" : "subTitle skills-text"}
                  >
                    {skills}
                  </p>
                );
              })}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
