const express = require('express');
const router = express.Router();
const { createCommande } = require('../../controllers/user/commandeController');

/**
 * @swagger
 * /api/user/commandes:
 *   post:
 *     summary: Passer une commande
 *     tags:
 *       - Commandes Utilisateur
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 description: Liste des articles commandés
 *                 items:
 *                   type: object
 *                   required:
 *                     - plat
 *                     - type
 *                   properties:
 *                     plat:
 *                       type: string
 *                       description: ID du plat/twister/boisson
 *                     type:
 *                       type: string
 *                       enum: [plat, twister, boisson]
 *                       description: Type de l'article
 *     responses:
 *       201:
 *         description: Commande créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       400:
 *         description: Erreur dans la commande
 */
// Passer une commande
router.post('/', createCommande);

module.exports = router;
