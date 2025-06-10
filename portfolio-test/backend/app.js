const express = require('express');
const mongoose = require('./db/db');

const app = express();
app.use(express.json());

// Importer les routes
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menus');
const ingredientRoutes = require('./routes/ingredients');

app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/ingredients', ingredientRoutes);

module.exports = app;
