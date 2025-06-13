const Ingredient = require('../../models/Ingredient');

// Créer un ingrédient
exports.createIngredient = async (req, res) => {
  try {
    const { name, allergen } = req.body;
    const ingredient = new Ingredient({ name, allergen });
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir tous les ingrédients
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un ingrédient
exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByIdAndDelete(id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrédient non trouvé.' });
    }
    res.json({ message: 'Ingrédient supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
