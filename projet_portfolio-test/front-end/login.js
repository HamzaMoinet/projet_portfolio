// Script de gestion du login

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('login-form');
  const errorDiv = document.getElementById('login-error');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    errorDiv.textContent = '';
    const firstName = form.elements['email'].value;
    const password = form.elements['password'].value;

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, password })
      });
      const data = await response.json();
      if (!response.ok) {
        errorDiv.textContent = data.error || 'Erreur de connexion';
        return;
      }
      // Stocker le token et le rôle dans le localStorage
      localStorage.setItem('token', data.token);
      // Décoder le token pour obtenir le rôle
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem('role', payload.role);
      // Rediriger selon le rôle
      if (payload.role === 'admin') {
        window.location.href = './Admin/Home.html';
      } else {
        window.location.href = './User/Home.html';
      }
      if (payload.role === 'user') {
        window.location.href = './User/Home.html'
      }
    } catch (err) {
      errorDiv.textContent = 'Erreur réseau';
    }
  });
});
