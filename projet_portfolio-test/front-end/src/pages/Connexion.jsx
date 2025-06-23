import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erreur de connexion');
        return;
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Ajout du stockage du rôle
      setSuccess(true);
      setTimeout(() => {
        if (data.role === 'admin') {
          navigate('/Admin');
        } else {
          navigate('/User');
        }
      }, 1000);
    } catch {
      setError('Erreur réseau');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email&nbsp;:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe&nbsp;:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Connexion réussie !</p>}
    </div>
  );
}
