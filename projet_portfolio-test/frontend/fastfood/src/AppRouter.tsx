import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import UserHome from "@/pages/user/UserHome";
import AdminHome from "@/pages/admin/AdminHome";
import Login from "@/pages/auth/Login";
import IngredientsPage from "@/pages/admin/ingredients";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/ingredients" element={<IngredientsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
