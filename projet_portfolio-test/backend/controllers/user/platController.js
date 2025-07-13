// Contrôleur pour récupérer la liste des plats (GET)
const Plat = require('../../models/Plat');

exports.getPlats = async (req, res) => {
  try {
    const plats = await Plat.find().populate('ingredients');
    res.status(200).json(plats);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des plats", error: err.message });
  }
};
