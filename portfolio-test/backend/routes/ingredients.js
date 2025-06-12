const express = require('express');
const router = express.Router();
const { createIngredient, getIngredients, deleteIngredient } = require('../controllers/ingredientController');

router.post('/', createIngredient); // Créer un ingrédient
router.get('/', getIngredients);    // Lister tous les ingrédients
router.delete('/:id', deleteIngredient); // Supprimer un ingrédient

module.exports = router;
