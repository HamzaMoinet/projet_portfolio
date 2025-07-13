import React from "react";

const Footer = () => (
  <footer
    style={{
      background: "#ffc400",
      color: "#fff",
      textAlign: "center",
      padding: "24px 0",
      margin: 0,
      fontWeight: 600,
      fontSize: "1rem",
      border: "none",
      boxShadow: "none",
    }}
  >
    © {new Date().getFullYear()} FastFood. Tous droits réservés.
  </footer>
);

export default Footer;
