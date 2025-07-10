import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./plats.css";


const platsData = [
  {
    category: "Burgers",
    items: [
      {
        name: "Cheese",
        description: "Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "8.00€",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Double Cheese",
        description: "2 Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "10.00€",
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Avocado",
        description: "Steak braisé 150g, Salade, Oignon grillé, Cornichon, Avocat, Sauce fumé maison",
        price: "10.00€",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Chèvre miel",
        description: "Steak braisé 150g, Oignon grillé, Chèvre, Miel, Cheddar, Sauce fumé maison",
        price: "10.00€",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Chicken",
        description: "Poulet panné, Salade, Oignon grillé, Cheddar, Sauce chicken maison",
        price: "9.00€",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Frenchy",
        description: "Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Bacon, Oeuf, Sauce fumé maison",
        price: "10.00€",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    category: "Riz Crousty",
    items: [
      {
        name: "Crousty Chili",
        description: "Exemple d'intitulé produit",
        price: "9.00€",
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Crousty Chicken",
        description: "Exemple d'intitulé produit",
        price: "9.00€",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Crousty Boursin",
        description: "Exemple d'intitulé produit",
        price: "8.00€",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
      }
    ]
  }
];

const Menus: React.FC = () => (
  <>
    <Header />
    <main className="plats-figma-mockup">
      <h1 className="plats-title">Menus</h1>
      {platsData.map((cat) => (
        <section key={cat.category} className="plats-section">
          <h2 className="plats-category">{cat.category}</h2>
          <div className="plats-grid">
            {cat.items.map((item) => (
              <div className="plats-card" key={item.name}>
                <img src={item.image} alt={item.name} className="plats-img" />
                <div className="plats-card-content">
                  <div className="plats-card-title">{item.name}</div>
                  <div className="plats-card-desc">{item.description}</div>
                  <div className="plats-card-price">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
    <Footer />
  </>
);

export default Menus;
