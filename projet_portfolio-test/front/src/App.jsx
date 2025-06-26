import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./admin/AdminPage";
import UserPage from "./user/UserPage";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import AdminCommandes from "./admin/AdminCommandes";
import AdminIngredients from "./admin/AdminIngredients";
import AdminPlats from "./admin/AdminPlats";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/commandes" element={<AdminCommandes />} />
        <Route path="/admin/ingredients" element={<AdminIngredients />} />
        <Route path="/admin/plats" element={<AdminPlats />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
