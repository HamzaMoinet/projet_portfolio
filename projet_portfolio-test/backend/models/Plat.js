const mongoose = require('mongoose');

const platSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: ['burger', 'frites', 'boisson', 'autre'] },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('Plat', platSchema);
