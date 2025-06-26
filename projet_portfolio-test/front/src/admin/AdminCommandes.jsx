import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Body from "../components/Body";
import Footer from "../components/Footer";
import AdminHeader from "./AdminHeader";

const AdminCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/admin/commandes")
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminHeader />
      <Body>
        <h1>Commandes des utilisateurs</h1>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <table style={{ width: '100%', maxWidth: 800, margin: '0 auto', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(48,129,209,0.08)' }}>
            <thead>
              <tr style={{ background: '#F5F7FA' }}>
                <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>ID</th>
                <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Utilisateur</th>
                <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Date</th>
                <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Détail</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((cmd) => (
                <tr key={cmd._id || cmd.id}>
                  <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{cmd._id || cmd.id}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>
                    {cmd.user?.firstName} {cmd.user?.lastName} {/* ou cmd.user?.email selon ce que tu veux afficher */}
                  </td>
                  <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{cmd.date}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{cmd.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Body>
      <Footer />
    </div>
  );
};

export default AdminCommandes;
