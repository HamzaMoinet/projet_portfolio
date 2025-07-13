const express = require('express');
const router = express.Router();
const { getCommandesAdmin } = require('../../controllers/admin/commandeAdminController');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', isAdmin, getCommandesAdmin);

module.exports = router;
