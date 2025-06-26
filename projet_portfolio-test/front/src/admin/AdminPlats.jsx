import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import Body from "../components/Body";
import Footer from "../components/Footer";
import AdminHeader from "./AdminHeader";

const AdminPlats = () => {
  // États pour le formulaire
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // États pour la liste
  const [plats, setPlats] = useState([]);
  const [getError, setGetError] = useState("");

  // États pour les ingrédients
  const [ingredients, setIngredients] = useState([]); // Liste des ingrédients du back
  const [selectedIngredients, setSelectedIngredients] = useState([]); // IDs sélectionnés

  // Récupérer la liste des plats
  const fetchPlats = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/admin/plats");
      setPlats(res.data);
      setGetError("");
    } catch (err) {
      setGetError("Erreur lors du chargement des plats.");
    }
  };

  // Récupérer la liste des ingrédients au chargement
  useEffect(() => {
    fetchPlats();
    const fetchIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/admin/ingredients");
        setIngredients(res.data);
      } catch (err) {
        // Optionnel : gestion d'erreur
      }
    };
    fetchIngredients();
  }, []);

  // Créer ou modifier un plat
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      // On convertit les IDs sélectionnés en noms d'ingrédients pour le backend
      const selectedIngredientNames = ingredients
        .filter(ing => selectedIngredients.includes(ing._id))
        .map(ing => ing.name);
      if (editId) {
        await axios.put(`http://localhost:3001/api/admin/plats/${editId}`, {
          name: nom,
          price: parseFloat(prix),
          ingredients: selectedIngredientNames
        });
        setMessage("Plat modifié avec succès !");
      } else {
        await axios.post("http://localhost:3001/api/admin/plats", {
          name: nom,
          price: parseFloat(prix),
          ingredients: selectedIngredientNames
        });
        setMessage("Plat créé avec succès !");
      }
      setNom("");
      setSelectedIngredients([]);
      setPrix("");
      setEditId(null);
      fetchPlats();
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'enregistrement du plat.");
    }
  };

  // Préparer la modification
  const handleEdit = (plat) => {
    setEditId(plat._id);
    setNom(plat.nom);
    setSelectedIngredients(plat.ingredients?.map(ing => ing._id || ing) || []);
    setPrix(plat.prix);
  };

  // Supprimer un plat
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/plats/${id}`);
      fetchPlats();
    } catch (err) {
      setGetError("Erreur lors de la suppression du plat.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminHeader />
      <Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '95%', minHeight: '50vh' }}>
          {/* Formulaire création/modification */}
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h1>{editId ? "Modifier un plat" : "Créer un plat"}</h1>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400 }}>
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="nom" style={{ display: 'block', marginBottom: 8 }}>Nom du plat</label>
                <input id="nom" type="text" value={nom} onChange={e => setNom(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8 }}>Ingrédients</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ingredients.map(ing => (
                    <label key={ing._id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        type="checkbox"
                        value={ing._id}
                        checked={selectedIngredients.includes(ing._id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedIngredients([...selectedIngredients, ing._id]);
                          } else {
                            setSelectedIngredients(selectedIngredients.filter(id => id !== ing._id));
                          }
                        }}
                      />
                      {ing.name}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="prix" style={{ display: 'block', marginBottom: 8 }}>Prix (€)</label>
                <input id="prix" type="number" step="0.01" value={prix} onChange={e => setPrix(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              {message && <div style={{ color: 'green', marginBottom: 16 }}>{message}</div>}
              {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
              <button type="submit" style={{ width: '100%', background: '#3081D1', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                {editId ? "Modifier le plat" : "Créer le plat"}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setNom(""); setSelectedIngredients([]); setPrix(""); }} style={{ width: '100%', background: '#aaa', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 }}>
                  Annuler
                </button>
              )}
            </form>
          </div>
          {/* Liste des plats */}
          <div style={{ width: '100%', maxWidth: 500 }}>
            <h1>Liste des plats</h1>
            {getError && <div style={{ color: 'red' }}>{getError}</div>}
            <ul style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 500, overflowY: 'scroll', maxHeight: 300, listStyle: 'none' }}>
              {plats.map(plat => (
                <li key={plat._id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>
                    <strong>{plat.name}</strong> - {plat.description} ({plat.price} €)
                    <br />
                    <span style={{ fontSize: '0.95em', color: '#555' }}>
                      Ingrédients : {plat.ingredients && plat.ingredients.length > 0
                        ? plat.ingredients.map(ing => ing.name || ing).join(', ')
                        : 'Aucun'}
                    </span>
                  </span>
                  <span>
                    <button onClick={() => handleEdit(plat)} style={{ background: '#F1C40F', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', marginRight: 8 }}>Modifier</button>
                    <button onClick={() => handleDelete(plat._id)} style={{ background: '#E74C3C', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>Supprimer</button>
                  </span>
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

export default AdminPlats;
