import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
	const [firstName, setFirst] = useState('');
	const [lastName, setLast] = useState('');
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
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'user' })
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erreur lors de l'inscription");
        return;
      }
      setSuccess(true);
      setTimeout(() => navigate('/connexion'), 1500);
    } catch {
      setError('Erreur réseau');
    }
  };

	return (
		<div style={{ maxWidth: 400, margin: '2rem auto' }}>
			<h2>Inscription</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Prénom&nbsp;:</label>
					<input name="firstName" value={firstName} onChange={e => setFirst(e.target.value)} required />
				</div>
				<div>
					<label>Nom&nbsp;:</label>
					<input name="lastName" value={lastName} onChange={e => setLast(e.target.value)} required />
				</div>
				<div>
					<label>Email&nbsp;:</label>
					<input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					<label>Mot de passe&nbsp;:</label>
					<input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<button type="submit">S'inscrire</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>Inscription réussie ! Redirection...</p>}
		</div>
	);
}

