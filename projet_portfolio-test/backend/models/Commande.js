const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plat', required: true }],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'en attente' }
});

module.exports = mongoose.model('Commande', commandeSchema);
