// Script de gestion de l'inscription

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('register-form');
  const errorDiv = document.getElementById('register-error');
  const successDiv = document.getElementById('register-success');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    errorDiv.textContent = '';
    successDiv.textContent = '';
    const firstName = form.elements['firstName'].value;
    const lastName = form.elements['lastName'].value;
    const password = form.elements['password'].value;

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, password })
      });
      let data = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        // Si la réponse n'est pas du JSON
        errorDiv.textContent = 'Erreur inattendue du serveur.';
        return;
      }
      if (!response.ok) {
        errorDiv.textContent = data.error || 'Erreur lors de la création du compte';
        return;
      }
      successDiv.textContent = 'Compte créé avec succès ! Redirection vers la page d\'accueil...';
      form.reset();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } catch (err) {
      errorDiv.textContent = 'Erreur réseau lors de la création du compte';
    }
  });
});
