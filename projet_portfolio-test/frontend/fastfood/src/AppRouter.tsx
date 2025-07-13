import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserHome from "./pages/user/UserHome";
import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"; // <-- Ajout ici
import IngredientsPage from "./pages/admin/ingredients";
import PlatsPage from "./pages/admin/plats";
import Menus_home from "./pages/home/plats";
import Menususer from "./pages/user/plats";
import UserOrders from "./pages/user/UserOrders";
import CommandesAdmin from "./pages/admin/CommandesAdmin"; // <-- Importation du nouveau composant
const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menus" element={<Menus_home />} />

      {/* Pages utilisateur */}
      <Route path="/user" element={<UserHome />} />
      <Route path="/user/menus" element={<Menususer />} />
      <Route path="/user/commandes" element={<UserOrders />} />

      {/* Pages admin */}
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/ingredients" element={<IngredientsPage />} />
      <Route path="/admin/plats" element={<PlatsPage />} />
      <Route path="/admin/commandes" element={<CommandesAdmin />} /> {/* <-- Changement ici */}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
