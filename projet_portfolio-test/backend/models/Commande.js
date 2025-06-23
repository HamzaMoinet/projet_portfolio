const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      plat: { type: mongoose.Schema.Types.ObjectId, ref: 'Plat', required: true },
      type: { type: String, enum: ['plat', 'twister', 'boisson'], required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  isMenu: { type: Boolean, default: false },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }

});

commandeSchema.virtual('createdAtLocal').get(function () {
  return new Date(this.createdAt).toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    hour12: false // Format 24h
  });
});

commandeSchema.set('toJSON', { virtuals: true });
commandeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Commande', commandeSchema);
