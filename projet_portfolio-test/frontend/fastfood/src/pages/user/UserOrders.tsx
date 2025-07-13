import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/HeaderUser";
import Footer from "@/components/Footer";
import "./UserOrder.css";

interface Ingredient {
  _id: string;
  name: string;
  allergen?: boolean; // Ajout du champ allergène
}

interface Plat {
  _id: string;
  name: string;
  price: number;
  type: string;
  ingredients: Ingredient[];
  image?: string; // Optionnel si tu veux ajouter une image plus tard
}

const UserCommandeTest = () => {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [cart, setCart] = useState<Array<Plat & { customIngredients?: string[] }>>([]);
  const [error, setError] = useState("");
  const [customizing, setCustomizing] = useState<null | Plat>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  useEffect(() => {
    // Récupérer tous les plats créés par l'admin
    axios.get("http://localhost:3001/api/user/plats")
      .then(res => setPlats(res.data))
      .catch(() => setError("Erreur lors du chargement des plats."));
  }, []);

  const handleAddToCart = (plat: Plat) => {
    // Seuls les burgers sont personnalisables
    if (plat.type.toLowerCase() === "burger") {
      setCustomizing(plat);
      setSelectedIngredients(plat.ingredients.map((ing) => ing.name));
    } else {
      // Ajout direct au panier pour les autres types
      setCart([...cart, { ...plat, customIngredients: plat.ingredients.map((ing) => ing.name) }]);
    }
  };

  const handleValidateCustom = () => {
    if (!customizing) return;
    setCart([...cart, { ...customizing, customIngredients: [...selectedIngredients] }]);
    setCustomizing(null);
    setSelectedIngredients([]);
  };

  const handleCancelCustom = () => {
    setCustomizing(null);
    setSelectedIngredients([]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, plat) => sum + plat.price, 0);


  // Regrouper les plats par type
  const platsParType: { [type: string]: Plat[] } = {};
  plats.forEach((plat) => {
    if (!platsParType[plat.type]) platsParType[plat.type] = [];
    platsParType[plat.type].push(plat);
  });

  // Soumission de la commande au backend
  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;
    try {
      // ID utilisateur de test (à remplacer par l'id réel si tu as l'authentification)
      const userId = "64a1234567890abcdef12345";
      const commande = {
        userId,
        plats: cart.map(plat => ({
          platId: plat._id,
          customIngredients: plat.customIngredients || [],
        })),
        total,
      };
      await axios.post("http://localhost:3001/api/commandes", commande);
      setCart([]); // Vider le panier après commande
      alert("Commande envoyée !");
    } catch (err) {
      alert("Erreur lors de l'envoi de la commande.");
    }
  };


  return (
    <>
      <Header />
      <div className="user-commande-container">
        {/* Liste des plats triés par type */}
        <div className="user-commande-list">
          <h2>Menus</h2>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          {Object.entries(platsParType).map(([type, platsType]) => (
            <section key={type} className="user-commande-section">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <div className="user-commande-cards">
                {platsType.map(plat => (
                  <div key={plat._id} className="user-commande-card">
                    <img src={plat.image || "https://via.placeholder.com/180x100?text=Plat"} alt={plat.name} />
                    <h3>{plat.name}</h3>
                    <div className="price">{plat.price.toFixed(2)} €</div>
                    <div className="ingredients">
                      {plat.ingredients.length > 0 ? (
                        <>Ingrédients: {plat.ingredients.map(ing => ing.name).join(", ")}</>
                      ) : (
                        <>Aucun ingrédient</>
                      )}
                    </div>
                    <button onClick={() => handleAddToCart(plat)} className="add-btn">
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        {/* Panier à droite */}
        <div className="user-commande-cart">
          <h3>Votre commande</h3>
          {cart.length === 0 ? (
            <div className="empty">Aucun plat sélectionné.</div>
          ) : (
            <>
              <ul>
                {cart.map((plat, idx) => (
                  <li key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        <strong>{plat.name}</strong> <span style={{ color: '#ff6600' }}>{plat.price.toFixed(2)} €</span>
                      </span>
                      <button onClick={() => handleRemoveFromCart(idx)} className="cart-remove-btn">×</button>
                    </div>
                    <div className="removed">
                      {/* Affiche les ingrédients retirés et allergènes */}
                      {plat.customIngredients && plat.ingredients && (
                        (() => {
                          const removed = plat.ingredients.filter(ing => !plat.customIngredients?.includes(ing.name));
                          if (removed.length === 0) return null;
                          return (
                            <span>
                              Sans : {removed.map(ing => (
                                <span key={ing._id}>
                                  {ing.name}
                                  {ing.allergen && (
                                    <span className="allergen">(Allergène)</span>
                                  )}
                                  {", "}
                                </span>
                              ))}
                            </span>
                          );
                        })()
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <button className="validate-btn" style={{ width: "100%", marginTop: 16, color: '#fff' }} onClick={handleSubmitOrder}>Commander</button>
            </>
          )}
          <hr style={{ margin: '16px 0' }} />
          <div className="total">Total: {total.toFixed(2)} €</div>
        </div>
      </div>
      {/* Modale de personnalisation des ingrédients */}
      {customizing && (
        <div className="user-commande-modal-bg">
          <div className="user-commande-modal">
            <h2>Personnaliser : {customizing.name}</h2>
            <div className="ingredient-list">
              {customizing.ingredients.map((ingredient) => {
                const ing = ingredient.name;
                return (
                  <label key={ing}>
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ing)}
                      onChange={() => {
                        setSelectedIngredients((prev) =>
                          prev.includes(ing)
                            ? prev.filter((i) => i !== ing)
                            : [...prev, ing]
                        );
                      }}
                    />
                    <span>
                      {ing}
                      {ingredient.allergen && (
                        <span className="allergen">(Allergène)</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="modal-actions">
              <button onClick={handleCancelCustom} className="cancel-btn">Annuler</button>
              <button onClick={handleValidateCustom} className="validate-btn" disabled={selectedIngredients.length === 0}>Ajouter au panier</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserCommandeTest;
