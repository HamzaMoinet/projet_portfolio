import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      // Stockage du token si présent
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.role === "admin") {
        navigate("/admin");
      } else if (response.data.role === "user") {
        navigate("/user");
      } else {
        setError("Rôle inconnu ou accès refusé.");
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F5F7FA 0%, #B8C6DB 100%)' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(48,129,209,0.08)', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Connexion</h2>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 8 }}>Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 8 }}>Mot de passe</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', background: '#3081D1', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Connexion;
