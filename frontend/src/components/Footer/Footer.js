import React from "react";
import "./Footer.scss";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <h3>Kulfizz ©{currentYear}</h3>
    </div>
  );
}

export default Footer;
