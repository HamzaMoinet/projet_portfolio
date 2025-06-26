import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => (
  <header style={{ position: 'absolute', background: 'linear-gradient(90deg, #1BA3E7 0%, #3081D1 100%)', color: '#fff', padding: '32px 0', textAlign: 'center', fontWeight: 700, fontSize: 32, letterSpacing: 2, borderRadius: '0 0 32px 32px', boxShadow: '0 4px 16px rgba(48,129,209,0.10)', position: 'relative' }}>
    <span style={{ position: 'absolute', left: 20, top: 16 }}>Header Admin </span>
    <Link to="/admin/commandes" style={{ position: 'absolute', right: 32, top: 16, background: '#E19F2D', color: '#fff', padding: '10px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 18 }}>
      Commandes
    </Link>
    <Link to="/admin/ingredients" style={{ position: 'absolute', right: 260, top: 16, background: '#E19F2D', color: '#fff', padding: '10px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 18 }}>
      Ingrédients
    </Link>
    <Link to="/admin/plats" style={{ position: 'absolute', right: 490, top: 16, background: '#E19F2D', color: '#fff', padding: '10px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 18 }}>
      Plats
    </Link>
  </header>
);

export default AdminHeader;
