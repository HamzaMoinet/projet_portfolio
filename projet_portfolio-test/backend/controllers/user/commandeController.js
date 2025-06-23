const Commande = require('../../models/Commande');
const Plat = require('../../models/Plat');
const User = require('../../models/User');

// Passer une commande
exports.createCommande = async (req, res) => {
  try {
    // Ajout de logs pour debug
    console.log('req.user:', req.user);
    const userId = req.user ? (req.user._id || req.user.id) : req.body.user;
    console.log('userId utilisé pour la commande:', userId);
    const { items } = req.body; // items: [{ plat: platId, type: 'plat'|'twister'|'boisson' }]
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Aucun article dans la commande.' });
    }

    // Récupérer les plats
    const platsDocs = await Plat.find({ _id: { $in: items.map(i => i.plat) } });
    if (platsDocs.length !== items.length) {
      return res.status(400).json({ error: 'Un ou plusieurs plats sont invalides.' });
    }

    // Calcul du total et détection menu
    let total = 0;
    let hasPlat = false, hasTwister = false, hasBoisson = false;
    const commandeItems = items.map(item => {
      const platDoc = platsDocs.find(p => p._id.equals(item.plat));
      if (!platDoc) return null;
      if (item.type === 'plat') hasPlat = true;
      if (item.type === 'twister') hasTwister = true;
      if (item.type === 'boisson') hasBoisson = true;
      let price = platDoc.price;
      // Si boisson dans menu, prix spécial
      if (item.type === 'boisson' && hasPlat && hasTwister) price = 1;
      total += price;
      return {
        plat: platDoc._id,
        type: item.type,
        name: platDoc.name,
        price
      };
    });
    if (commandeItems.includes(null)) {
      return res.status(400).json({ error: 'Erreur lors de la récupération des plats.' });
    }
    // Détection menu
    const isMenu = hasPlat && hasTwister && hasBoisson;
    // Si menu, corriger le prix de la boisson à 1€
    if (isMenu) {
      commandeItems.forEach(item => {
        if (item.type === 'boisson') {
          total -= (item.price - 1);
          item.price = 1;
        }
      });
    }
    const commande = new Commande({
      user: userId,
      items: commandeItems,
      isMenu,
      total
    });
    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Voir toutes les commandes (admin)
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate('user').populate('items.plat');
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
