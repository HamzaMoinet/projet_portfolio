const express = require('express');
const router = express.Router();
const { createPlat, getPlats, deletePlat, putPlat } = require('../../controllers/admin/platController');
/**
 * @swagger
 * /api/admin/plats:
 *   get:
 *     summary: Récupère la liste des plats
 *     tags:
 *       - Admin Plats
 *     responses:
 *       200:
 *         description: Liste des plats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Crée un nouveau plat
 *     tags:
 *       - Admin Plats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - ingredients
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plat créé
 *       400:
 *         description: Requête invalide
 */
/**
 * @swagger
 * /api/admin/plats/{id}:
 *   delete:
 *     summary: Supprime un plat
 *     tags:
 *       - Admin Plats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plats supprimé
 *       404:
 *         description: Plats non trouvé
 */
/**
 * @swagger
 * /api/admin/plats/{id}:
 *   put:
 *     summary: Met à jour un Plat
 *     tags:
 *       - Admin Plats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 types: string
 *     responses:
 *       200:
 *         description: Plat mis à jour
 *       404:
 *         description: Plat non trouvé
 */

router.post('/', createPlat); // Créer un plat
router.get('/', getPlats); // Lister tous les plats
router.delete('/:id', deletePlat); // Supprimer un plat
router.put('/:id', putPlat); // Mettre à jour un plat


module.exports = router;
