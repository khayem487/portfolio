import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import {uiText} from "../../portfolio";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const t = uiText[language] || uiText.en;
  const year = new Date().getFullYear();

  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          © {year} Khayem Ben Ghorbel · {t.footerBuiltWith}
        </p>
      </div>
    </Fade>
  );
}
