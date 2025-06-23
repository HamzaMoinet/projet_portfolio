const express = require('express');
const mongoose = require('./db/db');
const isAdmin = require('./middleware/isAdmin');
const auth = require('./middleware/auth');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173' // Autorise le front Vite
}));
app.use(express.json());

// Importer les routes
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/admin/menus');
const ingredientRoutes = require('./routes/admin/ingredients');
const platRoutes = require('./routes/admin/plats');
const loginRoutes = require('./routes/login');
const userCommandeRoutes = require('./routes/user/commandes');
const adminCommandeRoutes = require('./routes/admin/commandes');

app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
// Protéger les routes admin avec auth + isAdmin
app.use('/api/admin/menus', auth, isAdmin, menuRoutes);
app.use('/api/admin/ingredients', auth, isAdmin, ingredientRoutes);
app.use('/api/admin/plats', auth, isAdmin, platRoutes);
app.use('/api/user/commandes', auth, userCommandeRoutes);
app.use('/api/admin/commandes', auth, isAdmin, adminCommandeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
