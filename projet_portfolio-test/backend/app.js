const express = require('express');
const mongoose = require('./db/db');
const isAdmin = require('./middleware/isAdmin');
const auth = require('./middleware/auth');
const cors = require('cors'); // Ajout de CORS
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
app.use(cors()); // Activation de CORS
app.use(express.json());

// Importer les routes

const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/admin/menus');
const ingredientRoutes = require('./routes/admin/ingredients');
const platRoutes = require('./routes/admin/plats');
const loginRoutes = require('./routes/login');
const commandesRoutes = require('./routes/user/commandes');
const userPlatsRoutes = require('./routes/user/plats');


app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/user/plats', userPlatsRoutes); // Route publique pour lire les plats côté user
// Protéger les routes admin avec auth + isAdmin
app.use('/api/admin/menus', auth, isAdmin, menuRoutes);
app.use('/api/admin/ingredients', auth, isAdmin, ingredientRoutes);
app.use('/api/admin/plats', auth, isAdmin, platRoutes);
app.use('/api/commandes', commandesRoutes); // Route commandes user
app.use('/api/admin/commandes', require('./routes/admin/commandes')); // Route commandes admin
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
