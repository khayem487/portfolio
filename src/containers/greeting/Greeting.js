import React, {useContext, useState} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration, greeting, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const [language, setLanguage] = useState("en");

  const copy = {
    en: {
      title: greeting.title,
      subtitle: greeting.subTitleEn || greeting.subTitle,
      quickFactsTitle: "Recruiter quick facts",
      quickFacts: greeting.recruiterQuickFacts?.en || [],
      contact: "Contact me",
      linkedIn: "Message on LinkedIn",
      resume: "Download resume"
    },
    fr: {
      title: greeting.titleFr || greeting.title,
      subtitle: greeting.subTitleFr || greeting.subTitle,
      quickFactsTitle: "Infos clés recruteur",
      quickFacts: greeting.recruiterQuickFacts?.fr || [],
      contact: "Me contacter",
      linkedIn: "Me contacter sur LinkedIn",
      resume: "Télécharger le CV"
    }
  };

  const activeCopy = copy[language];

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
                {activeCopy.title} <span className="wave-emoji">{emoji("👋")}</span>
              </h1>

              <p className={isDark ? "dark-mode greeting-text-p" : "greeting-text-p subTitle"}>
                {activeCopy.subtitle}
              </p>

              {!!activeCopy.quickFacts.length && (
                <div className={isDark ? "dark-mode recruiter-card" : "recruiter-card"}>
                  <p className="recruiter-card-title">{activeCopy.quickFactsTitle}</p>
                  <ul className="recruiter-facts-list">
                    {activeCopy.quickFacts.map((item, idx) => (
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
                <Button text={activeCopy.contact} href="#contact" />
                {socialMediaLinks.linkedin && (
                  <Button
                    text={activeCopy.linkedIn}
                    href={socialMediaLinks.linkedin}
                    newTab={true}
                  />
                )}
                {greeting.resumeLink && (
                  <Button text={activeCopy.resume} href={greeting.resumeLink} newTab={true} />
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
