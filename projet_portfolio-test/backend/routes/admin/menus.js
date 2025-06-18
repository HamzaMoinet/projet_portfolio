const express = require('express');
const router = express.Router();
const { getMenus, createMenu, deleteMenu, putMenu } = require('../../controllers/admin/menuController');
/**
 * @swagger
 * /api/admin/menus:
 *   get:
 *     summary: Récupère la liste des menus
 *     tags:
 *       - Admin Menus
 *     responses:
 *       200:
 *         description: Liste des menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Crée un nouveau menu
 *     tags:
 *       - Admin Menus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - plats
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               plats:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingrédient créé
 *       400:
 *         description: Requête invalide
 */
/**
 * @swagger
 * /api/admin/menus/{id}:
 *   delete:
 *     summary: Supprime un menus
 *     tags:
 *      - Admin Menus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menus supprimé
 *       404:
 *         description: Menus non trouvé
 */
/**
 * @swagger
 * /api/admin/menus/{id}:
 *   put:
 *     summary: Met à jour un Menus
 *     tags:
 *       - Admin Menus
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               plats:
 *                 types: string
 *     responses:
 *       200:
 *         description: Menus mis à jour
 *       404:
 *         description: Menus non trouvé
 */
// À compléter : contrôleurs menu
router.get('/', getMenus);
router.post('/', createMenu);
router.put('/:id', putMenu);
router.delete('/:id', deleteMenu);

module.exports = router;
