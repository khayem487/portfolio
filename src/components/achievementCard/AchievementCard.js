import React from "react";
import "./AchievementCard.scss";
import {uiText} from "../../portfolio";

export default function AchievementCard({cardInfo, isDark, language = "en"}) {
  function openUrlInNewTab(url, name) {
    if (!url) {
      console.log(`URL for ${name} not found`);
      return;
    }
    const win = window.open(url, "_blank");
    win.focus();
  }

  const t = uiText[language] || uiText.en;
  const title = language === "fr" ? cardInfo.titleFr || cardInfo.title : cardInfo.title;
  const description =
    language === "fr" ? cardInfo.subtitleFr || cardInfo.subtitle : cardInfo.subtitle;

  return (
    <div className={isDark ? "dark-mode certificate-card" : "certificate-card"}>
      <div className="certificate-image-div">
        <img
          src={cardInfo.image}
          alt={cardInfo.imageAlt || "Card Thumbnail"}
          className="card-image"
        ></img>
      </div>
      <div className="certificate-detail-div">
        <h5 className={isDark ? "dark-mode card-title" : "card-title"}>{title}</h5>
        <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>{description}</p>
      </div>
      <div className="certificate-card-footer">
        {cardInfo.footerLink?.map((v, i) => {
          const label = language === "fr" ? v.nameFr || t.actions.project : v.name || t.actions.project;
          return (
            <span
              key={i}
              className={isDark ? "dark-mode certificate-tag" : "certificate-tag"}
              onClick={() => openUrlInNewTab(v.url, label)}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
