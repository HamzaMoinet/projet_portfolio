const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plat' }]
});

module.exports = mongoose.model('Menu', menuSchema);
