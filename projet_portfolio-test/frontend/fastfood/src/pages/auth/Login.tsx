import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <main className="flex flex-col items-center justify-center min-h-svh bg-yellow-50 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Connexion</h2>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Mot de passe" required value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit">Se connecter</Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
