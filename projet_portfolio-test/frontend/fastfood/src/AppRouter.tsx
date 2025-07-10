import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserHome from "./pages/user/UserHome";
import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"; // <-- Ajout ici
import IngredientsPage from "./pages/admin/ingredients";
import PlatsPage from "./pages/admin/plats";
import AdminCommandes from "./pages/admin/commandes";
import Plats from "./pages/home/plats";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menus" element={<Plats />} /> {/* Route vers la page plats */}

      {/* Pages utilisateur */}
      <Route path="/user" element={<UserHome />} />

      {/* Pages admin */}
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/ingredients" element={<IngredientsPage />} />
      <Route path="/admin/plats" element={<PlatsPage />} />
      <Route path="/admin/commandes" element={<AdminCommandes />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
