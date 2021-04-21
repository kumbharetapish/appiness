import React from "react";
import footerStyle from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={footerStyle.footerWrapper}>
      <div className={footerStyle.heading}>
        <h2>Devloped By </h2>
        <p>Tapish Kumbhare </p>
      </div>

      <div className={footerStyle.LinkWrapper}>
        <a href="https://github.com/kumbharetapish" target="gitHub">
          <i className="fab fa-github-square"></i>
        </a>

        <a href="https://www.linkedin.com/in/kumbharetapish" target="linkedin">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
