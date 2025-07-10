
const express = require("express");
const router = express.Router();
const commandeController = require("../../controllers/user/commandeController");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");


// Route GET pour l'admin : voir toutes les commandes
router.get("/admin", auth, isAdmin, commandeController.getAllCommandes);

// Route POST pour créer une commande (user connecté)
router.post("/", auth, commandeController.createCommande);

module.exports = router;
