import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const isAdmin = location.pathname.startsWith("/admin");
  const isLoggedIn = Boolean(localStorage.getItem("token"));



  return (
    <header className="bg-[#030303] shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white bg-transparent border-none cursor-pointer p-0 m-0"
          style={{ background: "none" }}
        >
          🍔L'as du brioché
        </button>
      </div>
      <nav className="flex gap-4">
        <a href="/menus" className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold">Menu</a>
        <a href="/login" className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold">Connexion</a>
      </nav>
    </header>
  );
};

export default Header;
