import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3001/api/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      // Décoder le token pour obtenir le rôle
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur serveur");
    }
  };

  return (
    <>
      <Header />
      <main className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Connexion</h2>
          {error && <div className="auth-error">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <Input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Mot de passe" required value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" className="auth-btn">Se connecter</Button>
          </form>
          <p className="auth-link">
            Pas encore de compte ? <a href="/register">Créer un compte</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
