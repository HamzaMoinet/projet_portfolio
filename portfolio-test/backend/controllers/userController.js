const User = require('../models/User');

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, role } = req.body;
    if (role === 'admin') {
      const adminExists = await User.findOne({ role: 'admin' });
      if (adminExists) {
        return res.status(400).json({ error: 'Un administrateur existe déjà.' });
      }
    }
    const user = new User({ firstName, lastName, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur
exports.putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, password, role } = req.body;
    const user = await User.findByIdAndUpdate(id, { firstName, lastName, password, role }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  }
  catch (err) {
  res.status(400).json({ error: err.message });
  }
};
