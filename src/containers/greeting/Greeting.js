import React, {useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration, greeting, socialMediaLinks, uiText} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const {language, setLanguage} = useContext(LanguageContext);
  const t = uiText[language] || uiText.en;

  const title = language === "fr" && greeting.titleFr ? greeting.titleFr : greeting.title;
  const subtitle = language === "fr" ? greeting.subTitleFr || greeting.subTitleEn : greeting.subTitleEn;
  const quickFacts =
    language === "fr"
      ? greeting.recruiterQuickFacts?.fr || []
      : greeting.recruiterQuickFacts?.en || [];

  if (!greeting.displayGreeting) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <div className="lang-switch" role="group" aria-label="Language switch">
                <button
                  type="button"
                  className={`lang-switch-btn ${language === "en" ? "active" : ""}`}
                  onClick={() => setLanguage("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`lang-switch-btn ${language === "fr" ? "active" : ""}`}
                  onClick={() => setLanguage("fr")}
                >
                  FR
                </button>
              </div>

              <h1 className={isDark ? "dark-mode greeting-text" : "greeting-text"}>
                {title} <span className="wave-emoji">{emoji("👋")}</span>
              </h1>

              <p className={isDark ? "dark-mode greeting-text-p" : "greeting-text-p subTitle"}>
                {subtitle}
              </p>

              {!!quickFacts.length && (
                <div className={isDark ? "dark-mode recruiter-card" : "recruiter-card"}>
                  <p className="recruiter-card-title">{t.recruiterQuickFactsTitle}</p>
                  <ul className="recruiter-facts-list">
                    {quickFacts.map((item, idx) => (
                      <li key={idx} className="recruiter-fact-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div id="resume" className="empty-div"></div>
              <SocialMedia />

              <div className="button-greeting-div">
                <Button text={t.actions.contactMe} href="#contact" />
                {socialMediaLinks.linkedin && (
                  <Button text={t.actions.linkedIn} href={socialMediaLinks.linkedin} newTab={true} />
                )}
                {greeting.resumeLink && (
                  <Button text={t.actions.downloadResume} href={greeting.resumeLink} newTab={true} />
                )}
              </div>
            </div>
          </div>

          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
