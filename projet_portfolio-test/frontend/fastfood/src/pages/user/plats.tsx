import React from "react";
import Header from "@/components/HeaderUser";
import Footer from "@/components/Footer";
import "./plats.css";


const platsData = [
  {
    category: "Nos Burgers",
    items: [
      {
        name: "Cheese",
        description: "Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "8.00€",
        image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"
      },
      {
        name: "Double Cheese",
        description: "2 Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "10.00€",
        image: "https://images.pexels.com/photos/29250659/pexels-photo-29250659.jpeg"
      },
      {
        name: "Avocado",
        description: "Steak braisé 150g, Salade, Oignon grillé, Cornichon, Avocat, Sauce fumé maison",
        price: "10.00€",
        image: "https://sdmntprukwest.oaiusercontent.com/files/00000000-c470-6243-ae88-adb0836dfb31/raw?se=2025-07-13T16%3A35%3A56Z&sp=r&sv=2024-08-04&sr=b&scid=dce597a6-158d-5b8f-b12b-84b8d73a2718&skoid=8e0fb8a9-6beb-4b32-9eda-253f61890767&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-13T07%3A43%3A08Z&ske=2025-07-14T07%3A43%3A08Z&sks=b&skv=2024-08-04&sig=pAhCoWMk9u06xouMiHQo00nASrUZes44SQFo4F%2BHQM4%3D"
      },
      {
        name: "Chicken",
        description: "Poulet panné, Salade, Oignon grillé, Cheddar, Sauce chicken maison",
        price: "9.00€",
        image: "https://sdmntprukwest.oaiusercontent.com/files/00000000-ba3c-6243-9e67-23c0c522f821/raw?se=2025-07-13T16%3A41%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=eaaa4600-314a-5b03-8f03-9caa33ce7481&skoid=8e0fb8a9-6beb-4b32-9eda-253f61890767&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-13T06%3A13%3A06Z&ske=2025-07-14T06%3A13%3A06Z&sks=b&skv=2024-08-04&sig=ejlIH%2BKSt7QRbWmMdhxkqWOUaFfQ1Ocx1mj3GUZGrcE%3D"
      },
    ]
  },
  {
    category: "Nos Smash Burgers",
    items: [
      {
        name: "Smash",
        description: "Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "6.50€",
        image: "https://katto.shop/cdn/shop/articles/Untitled_design_12.png?v=1630511111"
      },
      {
        name: "Double Smash",
        description: "2 Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "7.50€",
        image: "https://hips.hearstapps.com/hmg-prod/images/smash-burger-recipe-2-682e33558d3bb.jpg?crop=0.666586083242677xw:1xh;center,top&resize=1200:*"
      },
      {
        name: "Triple Smash",
        description: "3 Steak braisé 150g, Salade, Oignon grillé, Cornichon, Cheddar, Sauce fumé maison",
        price: "8.50€",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlsQzZ-tSVZzBrT1OOq4Ig_C93ewAtmKGGaQ&s"
      }
    ]
  },
  {
    category: "Nos Twisters",
    items: [
      {
        name: "Twister",
        price: "2.50€",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDPDlCE7dpfLDrRfThR_C6LVFapxxv4pGShg&s"
      },
      {
        name: "Twister Cheddar",
        description: "Cheddar",
        price: "3.50",
        image: "https://www.lacargaison.fr/contenu/uploads/2022/11/frites-cheddar.jpg"
      },
      {
        name: "Twister Cheddar Bacon",
        description: "Cheddar, Bacon",
        price: "4.50€",
        image: "https://mieuxqualamaison.com/wp-content/uploads/2024/03/Frites-cheddar-bacon.png"
      }
    ]
  }
];

const Menususer: React.FC = () => (
  <>
    <Header />
    <body className="plats-fullpage">
      <main style={{ paddingTop: "72px", background: "#e65100", paddingBottom: "20px" }}>
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
    </body>
    <Footer />
  </>
);

export default Menususer;
