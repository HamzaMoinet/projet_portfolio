const express = require('express');
const router = express.Router();
const { getMenus, createMenu, deleteMenu, putMenu } = require('../controllers/menuController');

// À compléter : contrôleurs menu
router.get('/', getMenus);
router.post('/', createMenu);
router.put('/:id', putMenu);
router.delete('/:id', deleteMenu);

module.exports = router;
