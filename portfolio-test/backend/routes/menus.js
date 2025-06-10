const express = require('express');
const router = express.Router();

// À compléter : contrôleurs menu
router.get('/', (req, res) => res.send('Liste des menus'));

module.exports = router;
