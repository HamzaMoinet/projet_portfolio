// Créer une commande (user)
const Plat = require("../../models/Plat");

exports.createCommande = async (req, res) => {
  try {
    const { plats } = req.body;
    if (!plats || !Array.isArray(plats) || plats.length === 0) {
      return res.status(400).json({ message: "Aucun plat sélectionné." });
    }
    // Récupérer les plats et calculer le total
    const platsDocs = await Plat.find({ _id: { $in: plats } });
    if (platsDocs.length !== plats.length) {
      return res.status(400).json({ message: "Un ou plusieurs plats sont invalides." });
    }
    const total = platsDocs.reduce((acc, plat) => acc + plat.price, 0);
    const commande = new Commande({
      user: req.user.id,
      plats,
      total,
    });
    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création de la commande", error: err.message });
  }
};

const Commande = require("../../models/Commande");

// Récupérer toutes les commandes (pour l'admin)
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("user", "firstName lastName")
      .populate({
        path: "plats",
        select: "name price",
      })
      .sort({ createdAt: -1 });
    res.status(200).json(commandes);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: err.message });
  }
};
