const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authentifie un utilisateur et retourne un token JWT
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token JWT

 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Identifiants invalides
 */

// Route de login : retourne un JWT si credentials valides
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
