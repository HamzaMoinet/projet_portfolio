const express = require('express');
const router = express.Router();
const { createPlat, getPlats, deletePlat, putPlat } = require('../controllers/platController');

router.post('/', createPlat); // Créer un plat
router.get('/', getPlats); // Lister tous les plats
router.delete('/:id', deletePlat); // Supprimer un plat
router.put('/:id', putPlat);


module.exports = router;
