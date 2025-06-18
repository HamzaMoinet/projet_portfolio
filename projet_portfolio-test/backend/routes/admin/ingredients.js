const express = require('express');
const router = express.Router();
const { createIngredient, getIngredients, deleteIngredient } = require('../../controllers/admin/ingredientController');
/**
 * @swagger
 * /api/admin/ingredients:
 *   get:
 *     summary: Récupère la liste des ingrédients
 *     tags:
 *       - Admin Ingrédients
 *     responses:
 *       200:
 *         description: Liste des ingrédients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Crée un nouvel ingrédient
 *     tags:
 *       - Admin Ingrédients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - allergen
 *             properties:
 *               name:
 *                 type: string
 *               allergen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingrédient créé
 *       400:
 *         description: Requête invalide
 */
/**
 * @swagger
 * /api/admin/ingredients/{id}:
 *   delete:
 *     summary: Supprime un ingrédient
 *     tags:
 *       - Admin Ingrédients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingrédient supprimé
 *       404:
 *         description: Ingrédient non trouvé
 */

router.post('/', createIngredient); // Créer un ingrédient
router.get('/', getIngredients);    // Lister tous les ingrédients
router.delete('/:id', deleteIngredient); // Supprimer un ingrédient

module.exports = router;
