import React, { useState, useEffect } from "react";
import UserHeader from "./UserHeader";
import Body from "../components/Body";
import Footer from "../components/Footer";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Nos Smash Burger",
    image: "https://unsplash.com/fr/photos/burger-avec-galette-et-laitue-pu6b4yIlQF4"
  },
  {
    name: "NosBurger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Nos Bowls au riz",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  }
];

const UserPage = () => {
  const navigate = useNavigate();

  // États pour la commande
  const [plats, setPlats] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedPlat, setSelectedPlat] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quantite, setQuantite] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Récupérer plats et ingrédients
  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/user/plats");
        setPlats(res.data);
      } catch (err) {}
    };
    const fetchIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/user/ingredients");
        setIngredients(res.data);
      } catch (err) {}
    };
    fetchPlats();
    fetchIngredients();
  }, []);

  // Gérer la commande
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:3001/api/user/commandes", {
        plat: selectedPlat,
        ingredients: selectedIngredients,
        quantite: parseInt(quantite)
      });
      setMessage("Commande passée avec succès !");
      setSelectedPlat("");
      setSelectedIngredients([]);
      setQuantite(1);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la commande.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <UserHeader />
      <Body>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <div
                key={cat.name}
                onClick={() => navigate('/carte')}
                style={{
                  cursor: 'pointer',
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)',
                  width: 260,
                  minHeight: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 24,
                  transition: 'transform 0.2s',
                  border: '2px solid transparent',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: 12, marginBottom: 18 }}
                />
                <div style={{ fontWeight: 700, fontSize: 22, textAlign: 'center' }}>{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default UserPage;
