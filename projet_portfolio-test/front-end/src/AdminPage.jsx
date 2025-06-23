import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Admin_page() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
      <Link to="/Admin">Accueil</Link>
      <Link to="/Admin/Ingredient"> Ingrédient </Link>
      <Link to="/Admin/Plats"> Plat </Link>
    </nav>
  );
}
export default Admin_page;
