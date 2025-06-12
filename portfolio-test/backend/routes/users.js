const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, putUser } = require('../controllers/userController');

// À compléter : contrôleurs user
router.post('/', createUser); // Créer un utilisateur
router.get('/', getUsers);    // Obtenir tous les utilisateurs
router.delete('/:id', deleteUser); // Supprimer un utilisateur
router.put('/:id', putUser); // Mettre à jour un utilisateur

module.exports = router;
