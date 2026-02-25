import React from "react";
import "./Button.scss";

export default function Button({text, className, href, newTab}) {
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;

  return (
    <div className={className}>
      <a className="main-button" href={href} target={target} rel={rel}>
        {text}
      </a>
    </div>
  );
}
