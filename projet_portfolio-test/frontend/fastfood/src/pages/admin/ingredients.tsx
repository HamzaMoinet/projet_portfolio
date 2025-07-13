import React, { useState, useEffect } from "react";
import Header from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";
import axios from "axios";
import "@/admin.css";

interface Ingredient {
  _id: string;
  name: string;
  allergen: boolean;
}

const IngredientsPage = () => {
  const [name, setName] = useState("");
  const [allergen, setAllergen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [getError, setGetError] = useState("");
  const [loading, setLoading] = useState(true);

  // Récupérer la liste au chargement et après ajout
  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/api/admin/ingredients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIngredients(res.data);
      setGetError("");
    } catch (err) {
      setGetError("Erreur lors du chargement des ingrédients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post(
        "http://localhost:3001/api/admin/ingredients",
        { name, allergen },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Ingrédient créé avec succès !");
      setName("");
      setAllergen(false);
      fetchIngredients();
      setTimeout(() => setMessage(""), 2500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de la création de l'ingrédient.");
    }
  };

  const handleDelete = async (id: string) => {
    setGetError("");
    try {
      await axios.delete(`http://localhost:3001/api/admin/ingredients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchIngredients();
    } catch (err) {
      setGetError("Erreur lors de la suppression de l'ingrédient.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', paddingTop: "72px" }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', maxWidth: 900, minHeight: '50vh', gap: "2rem", margin: '32px auto' }}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h2 className="text-xl font-bold text-red-600">Créer un ingrédient</h2>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: 8 }}>Nom de l'ingrédient</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div>
                <span style={{ display: 'block', marginBottom: 8 }}>Allergène</span>
                <label style={{ marginRight: 16 }}>
                  <input
                    type="radio"
                    name="allergen"
                    checked={allergen === true}
                    onChange={() => setAllergen(true)}
                  /> Oui
                </label>
                <label>
                  <input
                    type="radio"
                    name="allergen"
                    checked={allergen === false}
                    onChange={() => setAllergen(false)}
                  /> Non
                </label>
              </div>
              {message && <div style={{ color: 'green', marginBottom: 8 }}>{message}</div>}
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              <button type="submit" style={{ width: '100%', background: '#3081D1', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                Créer l'ingrédient
              </button>
            </form>
          </div>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h2 className="text-xl font-bold text-red-600">Liste des ingrédients</h2>
            {getError && <div style={{ color: 'red' }}>{getError}</div>}
            <ul style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(1, 13, 24, 0.08)', minWidth: 320, maxWidth: 400, overflowY: 'auto', maxHeight: 240, listStyle: 'none', margin: 0 }}>
              {loading ? (
                <li>Chargement...</li>
              ) : ingredients.length === 0 ? (
                <li>Aucun ingrédient.</li>
              ) : ingredients.map(ing => (
                <li key={ing._id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{ing.name} {ing.allergen && <span style={{ color: '#b91c1c', fontSize: 13, marginLeft: 8 }}>(Allergène)</span>}</span>
                  <button
                    onClick={() => handleDelete(ing._id)}
                    style={{ background: '#fff', color: '#E74C3C', border: 'none', borderRadius: '50%', width: 28, height: 28, fontSize: 20, fontWeight: 700, cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Supprimer"
                  >
                    ×
                  </button>
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

export default IngredientsPage;
