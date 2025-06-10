const Plat = require('../models/Plat');
const Ingredient = require('../models/Ingredient');

// Créer un plat
exports.createPlat = async (req, res) => {
  try {
    const { name, price, ingredients } = req.body;
    // Si ingredients contient des noms, on les convertit en IDs
    const ingredientDocs = await Ingredient.find({ name: { $in: ingredients } });
    if (ingredientDocs.length !== ingredients.length) {
      return res.status(400).json({ error: "Un ou plusieurs ingrédients n'existent pas." });
    }
    const ingredientIds = ingredientDocs.map(ing => ing._id);
    const plat = new Plat({ name, price, ingredients: ingredientIds });
    await plat.save();
    res.status(201).json(plat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir tous les plats
exports.getPlats = async (req, res) => {
  try {
    const plats = await Plat.find().populate('ingredients');
    res.json(plats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
