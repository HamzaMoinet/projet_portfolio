const Commande = require('../../models/Commande');
const Plat = require('../../models/Plat');

// Créer une commande
exports.createCommande = async (req, res) => {
  try {
    const { userId, plats } = req.body;
    // Calcul du total simple (sans réduction menu)
    let total = 0;
    const platsDetails = await Promise.all(plats.map(async (p) => {
      const plat = await Plat.findById(p.platId);
      if (!plat) throw new Error('Plat non trouvé');
      total += plat.price;
      return {
        platId: p.platId,
        nom: plat.name,
        prix: plat.price,
        type: plat.type,
        customIngredients: p.customIngredients || []
      };
    }));
    const commande = new Commande({ userId, plats: platsDetails, total });
    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les commandes
exports.getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate('userId', 'firstName lastName email').sort({ date: -1 });
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier une commande (ex : modifier les ingrédients d’un plat)
exports.updateCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const { plats } = req.body;
    // Calcul du total simple (sans réduction menu)
    let total = 0;
    const platsDetails = await Promise.all(plats.map(async (p) => {
      const plat = await Plat.findById(p.platId);
      if (!plat) throw new Error('Plat non trouvé');
      total += plat.price;
      return {
        platId: p.platId,
        nom: plat.name,
        prix: plat.price,
        type: plat.type,
        customIngredients: p.customIngredients || []
      };
    }));
    const commande = await Commande.findByIdAndUpdate(id, { plats: platsDetails, total }, { new: true });
    if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });
    res.json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findByIdAndDelete(id);
    if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });
    res.json({ message: 'Commande supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
