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

// Suprimer un plat
exports.deletePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const plat = await Plat.findByIdAndDelete(id);
    if (!plat) {
      return res.status(404).json({ error: 'Plat non trouvé.' })
    }
    res.json({ message: 'Plat supprimé avec succès.' })
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
};


// Modifier un plat
exports.putPlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, ingredients } = req.body;
    const ingredientDocs = await Ingredient.find({ name: { $in: ingredients } });
    if (ingredientDocs.length !== ingredients.length) {
      return res.status(400).json({ error: "Un ou plusieurs ingrédients n'existent pas." });
    }
    const ingredientIds = ingredientDocs.map(ing => ing._id);
    const plat = await Plat.findByIdAndUpdate(id, { name, price, ingredients: ingredientIds }, { new: true });
    if (!plat) {
      return res.status(404).json({ error: 'Plat non trouvé.' });
    }
    res.json(plat);
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* test crud plat
{
  "name": "Nom du plat",
  "price": 12.99,
  "ingredients": [
    "nom de l'ingrédient 1",
    "nom de l'ingrédient 2",
    ...
  ]
}
*/
