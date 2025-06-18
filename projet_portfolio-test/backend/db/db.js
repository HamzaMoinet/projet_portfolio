const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fastfood-portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err));

module.exports = mongoose;
