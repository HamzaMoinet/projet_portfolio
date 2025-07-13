import React from "react";

const Hero = () => (
  <section
    className="py-16 px-4 flex flex-col items-center text-center gap-6"
    style={{
      paddingTop: "80px",
      background: "linear-gradient(50deg, #030303 1%, #FEA237 20%, #E05002 80%, #030303 100%)",
    }}
  >
    <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 drop-shadow-lg" >Bienvenue chez FastFood !</h1>
    <p className="text-lg md:text-xl text-gray-800 max-w-xl">Savourez nos burgers, menus et desserts gourmands, servis en un temps record. Commandez en ligne ou sur place, c’est toujours un régal !</p>
    <a href="/user/menus" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg">Voir le menu</a>
  </section>
);

export default Hero;
