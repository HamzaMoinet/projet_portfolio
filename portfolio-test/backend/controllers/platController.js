const Plat = require('../models/Plat');

// Créer un plat
exports.createPlat = async (req, res) => {
  try {
    const { name, price, ingredients } = req.body;
    const plat = new Plat({ name, price, ingredients });
    await plat.save();
    res.status(201).json(plat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir tous les plats
exports.getPlats = async (req, res) => {
  try {
    const plats = await Plat.find();
    res.json(plats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
