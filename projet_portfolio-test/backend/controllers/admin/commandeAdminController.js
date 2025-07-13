const Commande = require('../../models/Commande');
const User = require('../../models/User');

// Récupérer toutes les commandes pour l'admin
exports.getCommandesAdmin = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate({
        path: 'userId',
        select: 'firstName lastName email',
        model: 'User'
      })
      .sort({ date: -1 });

    // Formatage pour inclure l'utilisateur dans la réponse
    const commandesFormat = commandes.map(cmd => ({
      _id: cmd._id,
      user: cmd.userId ? {
        _id: cmd.userId._id,
        firstName: cmd.userId.firstName,
        lastName: cmd.userId.lastName,
        email: cmd.userId.email
      } : null,
      plats: cmd.plats,
      total: cmd.total,
      date: cmd.date
    }));
    res.json(commandesFormat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
