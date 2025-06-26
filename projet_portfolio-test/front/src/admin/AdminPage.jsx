import React from "react";
import AdminHeader from "./AdminHeader";
import Body from "../components/Body";
import Footer from "../components/Footer";

const AdminPage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <AdminHeader />
    <Body>
      <h1>Bienvenue sur l'espace Admin</h1>
      <p>Contenu de la page admin selon le design Figma.</p>
    </Body>
    <Footer />
  </div>
);

export default AdminPage;
