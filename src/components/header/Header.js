import React, {useContext, useState} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection,
  bigProjects,
  uiText
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = uiText[language] || uiText.en;

  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewProjects = bigProjects.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href={`${process.env.PUBLIC_URL}/`} className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <button
          type="button"
          className="menu-icon"
          aria-label={language === "fr" ? "Menu de navigation" : "Navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </button>
        <ul
          id="portfolio-navigation"
          className={`${isDark ? "dark-menu menu" : "menu"}${menuOpen ? " menu-open" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          {viewSkills && (
            <li>
              <a href="#skills">{t.nav.skills}</a>
            </li>
          )}
          {viewProjects && (
            <li>
              <a href="#projects">{t.nav.projects}</a>
            </li>
          )}
          {viewExperience && (
            <li>
              <a href="#experience">{t.nav.experience}</a>
            </li>
          )}
          {viewOpenSource && (
            <li>
              <a href="#opensource">Open Source</a>
            </li>
          )}
          {viewAchievement && (
            <li>
              <a href="#achievements">{t.nav.achievements}</a>
            </li>
          )}
          {viewBlog && (
            <li>
              <a href="#blogs">Blogs</a>
            </li>
          )}
          {viewTalks && (
            <li>
              <a href="#talks">Talks</a>
            </li>
          )}
          {viewResume && (
            <li>
              <a href="#resume">Resume</a>
            </li>
          )}
          <li>
            <a href="#contact">{t.nav.contact}</a>
          </li>
          <li>
            <div className="theme-control">
              <ToggleSwitch />
            </div>
          </li>
        </ul>
      </header>
    </Headroom>
  );
}

export default Header;
