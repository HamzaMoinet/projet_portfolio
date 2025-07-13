const express = require('express');
const router = express.Router();
const commandeController = require('../../controllers/user/commandeController');

// Créer une commande
router.post('/', commandeController.createCommande);

// Récupérer toutes les commandes
router.get('/', commandeController.getCommandes);

// Modifier une commande
router.put('/:id', commandeController.updateCommande);

// Supprimer une commande
router.delete('/:id', commandeController.deleteCommande);

module.exports = router;
