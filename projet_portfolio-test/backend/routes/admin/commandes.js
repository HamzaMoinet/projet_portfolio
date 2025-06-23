const express = require('express');
const router = express.Router();
const { getAllCommandes } = require('../../controllers/user/commandeController');

/**
 * @swagger
 * /api/admin/commandes:
 *   get:
 *     summary: Récupère toutes les commandes des utilisateurs
 *     tags:
 *       - Commandes Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commande'
 *       401:
 *         description: Non autorisé
 */
// Voir toutes les commandes (admin)
router.get('/', getAllCommandes);

module.exports = router;
