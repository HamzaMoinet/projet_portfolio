import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import Body from "../components/Body";
import Footer from "../components/Footer";
import AdminHeader from "./AdminHeader";

const AdminIngredients = () => {
  // Création d'ingrédient
  const [name, setName] = useState("");
  const [allergen, setAllergen] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Liste des ingrédients
  const [ingredients, setIngredients] = useState([]);
  const [getError, setGetError] = useState("");

  // Récupérer la liste au chargement et après ajout
  const fetchIngredients = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/admin/ingredients");
      setIngredients(res.data);
      setGetError("");
    } catch (err) {
      setGetError("Erreur lors du chargement des ingrédients.");
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:3001/api/admin/ingredients", {
        name,
        allergen
      });
      setMessage("Ingrédient créé avec succès !");
      setName("");
      setAllergen("");
      fetchIngredients(); // Rafraîchir la liste après ajout
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la création de l'ingrédient.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminHeader />
      <Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '95%', minHeight: '50vh' }}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h1>Créer un ingrédient</h1>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400 }}>
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: 8 }}>Nom de l'ingrédient</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="allergen" style={{ display: 'block', marginBottom: 8 }}>Allergène (optionnel)</label>
                <input id="allergen" type="text" value={allergen} onChange={e => setAllergen(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              {message && <div style={{ color: 'green', marginBottom: 16 }}>{message}</div>}
              {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
              <button type="submit" style={{ width: '100%', background: '#3081D1', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                Créer l'ingrédient
              </button>
            </form>
          </div>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h1>Liste des ingrédients</h1>
            {getError && <div style={{ color: 'red' }}>{getError}</div>}
            <ul style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400, overflowY: 'scroll', maxHeight: 200, listStyle: 'none' }}>
              {ingredients.map(ing => (
                <li key={ing._id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{ing.name} {ing.allergen && `(Allergène : ${ing.allergen})`}</span>
                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(`http://localhost:3001/api/admin/ingredients/${ing._id}`);
                        fetchIngredients();
                      } catch (err) {
                        setGetError("Erreur lors de la suppression de l'ingrédient.");
                      }
                    }}
                    style={{ background: '#E74C3C', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', marginLeft: 12 }}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default AdminIngredients;
