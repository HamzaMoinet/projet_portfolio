const jwt = require('jsonwebtoken');
const { SECRET } = require('./auth');
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * tags:
 *   - name: Admin
 *     description: Accès réservé à l’administrateur
 */
// Middleware pour vérifier si l'utilisateur est admin
module.exports = function isAdmin(req, res, next) {
  // On suppose que le middleware auth a déjà mis req.user
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Accès réservé à l’administrateur.' });
};
