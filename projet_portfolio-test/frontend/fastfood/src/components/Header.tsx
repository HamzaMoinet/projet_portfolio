import React from "react";

const Header = () => (
  <header className="bg-yellow-400 shadow-md py-4 px-8 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-red-600">🍔 FastFood</span>
    </div>
    <nav className="flex gap-4">
      <a href="/" className="hover:text-red-600 font-semibold">Accueil</a>
      <a href="/user" className="hover:text-red-600 font-semibold">Menu</a>
      <a href="/login" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 font-semibold">Connexion</a>
    </nav>
  </header>
);

export default Header;
