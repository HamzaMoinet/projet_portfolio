const mongoose = require('mongoose');

const platCommandeSchema = new mongoose.Schema({
  platId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plat', required: true },
  nom: String,
  prix: Number,
  customIngredients: [String] // ingrédients conservés par l'utilisateur
});

const commandeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plats: [platCommandeSchema],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commande', commandeSchema);
