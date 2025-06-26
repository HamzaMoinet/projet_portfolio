import React from "react";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PublicHeader = () => (
  <header style={{ background: 'linear-gradient(90deg, #E19F2D 0%, #E7D91C 100%)', color: '#fff', padding: '32px 0', textAlign: 'center', fontWeight: 700, fontSize: 32, letterSpacing: 2, borderRadius: '0 0 32px 32px', boxShadow: '0 4px 16px rgba(225,159,45,0.10)' }}>
    <span>Bienvenue sur Mon Application</span>
    <Link to="/connexion" style={{ position: 'absolute', right: 32, top: 32, background: '#3081D1', color: '#fff', padding: '10px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 18 }}>
      Connexion
    </Link>
  </header>
);

const Home = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <PublicHeader />
    <Body>
      <h1>Bienvenue !</h1>
      <p>Connectez-vous pour accéder à votre espace.</p>
    </Body>
    <Footer />
  </div>
);

export default Home;
