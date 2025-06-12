const mongoose = require('mongoose');

const platSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('Plat', platSchema);
