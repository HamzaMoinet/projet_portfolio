import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderUser = () => {
  const navigate = useNavigate();
  return (
    <header
      className="bg-[#030303] shadow-md py-4 px-8 flex items-center justify-between"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 100,
      }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/user")}
          className="text-2xl font-bold text-white bg-transparent border-none cursor-pointer p-0 m-0"
          style={{ background: "none" }}
        >
          🍔L'as du brioché
        </button>
      </div>
      <nav className="flex gap-4">
        <a
          href="/user/menus"
          className="bg-white text-[#e65100] px-3 py-2 rounded hover:bg-gray-100 font-semibold"
        >
          Menu
        </a>
        <button
          onClick={() => navigate("/user/commandes")}
          className="bg-white text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold border-none cursor-pointer"
          style={{ background: "#fff", marginLeft: 8 }}
        >
          Passer commande
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="text-[#e65100] px-3 py-1 rounded hover:bg-gray-100 font-semibold border-none cursor-pointer"
          style={{ backgroundColor: "#ffffff" }}
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default HeaderUser;
