import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-[#030303] shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/admin")}
          className="text-2xl font-bold text-white bg-transparent border-none cursor-pointer p-0 m-0"
          style={{ background: "none" }}
        >
          🍔L'as du brioché
        </button>
      </div>
      <nav className="flex gap-4">
        <a href="/admin/ingredients" className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold">Ingrédients</a>
        <a href="/admin/plats" className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold">Plats</a>
        <a href="/admin/commandes" className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold">Commandes</a>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold border-none cursor-pointer"
		  style={{ backgroundColor: "#ffffff" }}
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
