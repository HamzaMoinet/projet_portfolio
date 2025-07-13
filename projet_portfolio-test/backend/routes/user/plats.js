const express = require('express');
const router = express.Router();
const { getPlats } = require('../../controllers/user/platController');

// Route pour récupérer tous les plats (accessible à tous les utilisateurs)
router.get('/', getPlats);

module.exports = router;
