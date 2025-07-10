import React, { useState, useEffect } from "react";
import Header from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";
import axios from "axios";
import "./plats.css";

interface Ingredient {
  _id: string;
  name: string;
  allergen: boolean;
}

interface Plat {
  _id: string;
  name: string;
  price: number;
  ingredients: Ingredient[];
}


const PlatsPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [plats, setPlats] = useState<Plat[]>([]);
  // Pour la modification
  const [editIngredients, setEditIngredients] = useState<string[]>([]);
  // Charger la liste des ingrédients pour le choix
  const fetchIngredients = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/admin/ingredients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIngredients(res.data);
    } catch (err) {
      // rien
    }
  };
  const [getError, setGetError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | undefined>(undefined);
  // supprimé : editAllergen

  const fetchPlats = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/api/admin/plats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPlats(res.data);
      setGetError("");
    } catch (err) {
      setGetError("Erreur lors du chargement des plats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlats();
    fetchIngredients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post(
        "http://localhost:3001/api/admin/plats",
        { name, price, ingredients: selectedIngredients },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Plat créé avec succès !");
      setName("");
      setPrice(undefined);
      setSelectedIngredients([]);
      fetchPlats();
      setTimeout(() => setMessage(""), 2500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de la création du plat.");
    }
  };

  const handleDelete = async (id: string) => {
    setGetError("");
    try {
      await axios.delete(`http://localhost:3001/api/admin/plats/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchPlats();
    } catch (err) {
      setGetError("Erreur lors de la suppression du plat.");
    }
  };

  const handleEdit = (plat: Plat) => {
    setEditId(plat._id);
    setEditName(plat.name);
    setEditPrice(plat.price);
    setEditIngredients(plat.ingredients.map(ing => ing._id));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    try {
      await axios.put(
        `http://localhost:3001/api/admin/plats/${editId}`,
        { name: editName, price: editPrice, ingredients: editIngredients },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setEditId(null);
      fetchPlats();
    } catch (err) {
      setGetError("Erreur lors de la modification du plat.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', maxWidth: 900, minHeight: '50vh', gap: "2rem", margin: '32px auto' }}>
          {/* Bloc POST */}
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h2 className="text-xl font-bold text-red-600">Créer un plat</h2>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: 8 }}>Nom du plat</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div>
                <label htmlFor="price" style={{ display: 'block', marginBottom: 8 }}>Prix (€)</label>
                <input id="price" type="number" step="0.01" value={price === undefined ? '' : price} onChange={e => setPrice(e.target.value === '' ? undefined : Number(e.target.value))} required min={0} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Ingrédients</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 120, overflowY: 'auto' }}>
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
              {message && <div style={{ color: 'green', marginBottom: 8 }}>{message}</div>}
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              <button type="submit" style={{ width: '100%', background: '#3081D1', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                Créer le plat
              </button>
            </form>
          </div>
          {/* Bloc GET/PUT/DEL */}
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h2 className="text-xl font-bold text-red-600">Liste des plats</h2>
            {getError && <div style={{ color: 'red' }}>{getError}</div>}
            <ul style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400, overflowY: 'auto', maxHeight: 240, listStyle: 'none', margin: 0 }}>
              {loading ? (
                <li>Chargement...</li>
              ) : plats.length === 0 ? (
                <li>Aucun plat.</li>
              ) : plats.map(plat => (
                <li key={plat._id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {editId === plat._id ? (
                    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <input type="text" value={editName} onChange={e => setEditName(e.target.value)} required style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                      <input type="number" step="0.01" value={editPrice === undefined ? '' : editPrice} onChange={e => setEditPrice(e.target.value === '' ? undefined : Number(e.target.value))} required min={0} style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
                      <div>
                        <label style={{ display: 'block', marginBottom: 8 }}>Ingrédients</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {ingredients.map(ing => (
                            <label key={ing._id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <input
                                type="checkbox"
                                value={ing._id}
                                checked={editIngredients.includes(ing._id)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setEditIngredients([...editIngredients, ing._id]);
                                  } else {
                                    setEditIngredients(editIngredients.filter(id => id !== ing._id));
                                  }
                                }}
                              />
                              {ing.name}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit" style={{ background: '#3081D1', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Valider</button>
                        <button type="button" onClick={() => setEditId(null)} style={{ background: '#fff', color: '#E74C3C', border: '1px solid #E74C3C', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Annuler</button>
                      </div>
                    </form>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        <strong>{plat.name}</strong> - {plat.price} €<br />
                        {plat.ingredients && plat.ingredients.length > 0 && (
                          <span style={{ color: '#b91c1c', fontSize: 13, marginLeft: 8 }}>
                            [Ingrédients: {plat.ingredients.map(ing => ing.name).join(", ")}]
                          </span>
                        )}
                      </span>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleEdit(plat)} style={{ background: '#fff', color: '#3081D1', border: '1px solid #3081D1', borderRadius: '50%', width: 28, height: 28, fontSize: 16, fontWeight: 700, cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Modifier">✎</button>
                        <button onClick={() => handleDelete(plat._id)} style={{ background: '#fff', color: '#E74C3C', border: 'none', borderRadius: '50%', width: 28, height: 28, fontSize: 20, fontWeight: 700, cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Supprimer">×</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlatsPage;
