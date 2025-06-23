import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Admin_page from './AdminPage';
import Acceuil_admin from './pages/Admin/Acceuil_admin';
import Ingrédient from './pages/Admin/Ingrédient';
import Plats from './pages/Admin/Plats';
import Accueil from './pages/Accueil';
import Menu from './pages/Menu';
import Commande from './pages/User/Commande';
import Connexion from './pages/Connexion';
import './App.css';
import Acceuil_user from './pages/User/Accueil_user';
import Inscription from './pages/Inscription';

function AppContent() {
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/Admin');

  return (
    <>
      {/* Affiche le menu principal seulement si on n'est pas sur une page admin */}
      {!isAdminRoute && (
        <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <Link to="/">Accueil</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/commande">Commande</Link>
          <Link to="/connexion">Connexion</Link>
          <Link to="/Inscription">Inscription</Link>
        </nav>
      )}
      {/* Affiche le menu admin seulement si admin ET sur une page admin */}
      {isAdminRoute && role === 'admin' && <Admin_page />}
      <Routes>
        <Route path="/Admin" element={<Acceuil_admin />} />
        <Route path="/Admin/Ingredient" element={<Ingrédient />} />
        <Route path="/Admin/Plats" element={<Plats />} />
        <Route path="/User" element={<Acceuil_user />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/Inscription" element={<Inscription />} />
        {/* Redirection pour les routes non définies */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

