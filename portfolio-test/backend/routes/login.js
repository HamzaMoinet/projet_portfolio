const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

// Route de login : retourne un JWT si credentials valides
router.post('/', async (req, res) => {
  const { firstName, password } = req.body;
  const user = await User.findOne({ firstName });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
