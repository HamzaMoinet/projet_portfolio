import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";


interface PlatCommande {
  platId: string;
  nom: string;
  prix: number;
  type?: string;
  customIngredients: string[];
}


interface Commande {
  _id: string;
  user: { firstName: string; lastName: string };
  plats: PlatCommande[];
  createdAt: string;
  status: string;
}

const CommandesAdmin = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/api/commandes")
      .then(res => {
        setCommandes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des commandes.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px" }}>
        <div style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Commandes utilisateurs</h2>
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : commandes.length === 0 ? (
            <div>Aucune commande trouvée.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <thead>
                <tr style={{ background: "#ff6600", color: "#fff" }}>
                  <th style={{ padding: 12, borderRadius: "12px 0 0 0" }}>Utilisateur</th>
                  <th style={{ padding: 12 }}>Plats</th>
                  <th style={{ padding: 12 }}>Total</th>
                  <th style={{ padding: 12, borderRadius: "0 12px 0 0" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map(cmd => (
                  <tr key={cmd._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 12 }}>
                      {cmd.userId && typeof cmd.userId === "object" && cmd.userId.email
                        ? cmd.userId.email
                        : typeof cmd.userId === "string" ? cmd.userId : "Utilisateur inconnu"}
                    </td>
                    <td style={{ padding: 12 }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {cmd.plats.map((plat, idx) => (
                          <li key={idx}>
                            <strong>{plat.nom}</strong> ({plat.prix.toFixed(2)} €)
                            {plat.customIngredients.length > 0 && (
                              <span style={{ color: "#888", fontSize: 13 }}> - Ingrédients: {plat.customIngredients.join(", ")}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ padding: 12, fontWeight: 700 }}>{cmd.total.toFixed(2)} €</td>
                    <td style={{ padding: 12 }}>{new Date(cmd.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CommandesAdmin;
