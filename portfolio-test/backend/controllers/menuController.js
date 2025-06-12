// Contrôleur Menu (à compléter)
const Menu = require('../models/Menu');
const Plat = require('../models/Plat');
// Obtenir tous les menus
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('plat');
    console.log("Menus récupérés:", menus);
    res.json(menus);
  }catch (err) {
    res.status(500).json({ error: err.messages});
  }
};


// Crée un menu
exports.createMenu = async (req, res) => {
  try {
    const { title, description, plats } = req.body;
    // Si plat contient des noms, on les concertie en IDs
    const platDocs = await Plat.find ({ name: { $in: plats } });
    if (platDocs.length !== plats.length) {
      return res.status(400).json({ error: "Un ou plusieurs plat(s) n'existent pas." });
    }
    const platIDs = platDocs.map(pla => pla._id);

    const menuExists = await Menu.findOne({ plat: { $all: platIDs, $size: platIDs.length } });
    if (menuExists) {
      return res.status(400).json({ error: "Un menu avec les mêmes plats existe déjà." });
    }
    const menu = new Menu({ title, description, plat: platIDs });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.messages });
  }
};

// Modifier menu
exports.putMenu = async (req, res) => {
  try{
    const { id } = req.params;
    const { title, description, plats } = req.body;
    const platDocs = await Plat.find ({ name: { $in: plats } });
    if (platDocs.length !== plats.length) {
      return res.status(500).json({ error: "Un ou plusieurs plat(s) n'existent pas." });
    }
    const platIDs = platDocs.map(pla => pla._id);
    const menu = await Menu.findByIdAndUpdate(id, { title, description, plat: platIDs }, { new: true });
    if (!menu) {
      return res.status(404).json({ error: 'Menu non trouvé.' });
    }
    res.json(menu);
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Supprimer un menu
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByIdAndDelete(id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu non trouvé.' });
    }
    res.json({ message: 'Menu supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
