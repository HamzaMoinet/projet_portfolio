const express = require('express');
const mongoose = require('./db/db');
const isAdmin = require('./middleware/isAdmin');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());

// Importer les routes
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/admin/menus');
const ingredientRoutes = require('./routes/admin/ingredients');
const platRoutes = require('./routes/admin/plats');
const loginRoutes = require('./routes/login');

app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
// Protéger les routes admin avec auth + isAdmin
app.use('/api/admin/menus', auth, isAdmin, menuRoutes);
app.use('/api/admin/ingredients', auth, isAdmin, ingredientRoutes);
app.use('/api/admin/plats', auth, isAdmin, platRoutes);


module.exports = app;
