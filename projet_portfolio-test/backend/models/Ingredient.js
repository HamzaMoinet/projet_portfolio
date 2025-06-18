const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  allergen: { type: Boolean, default: false }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
