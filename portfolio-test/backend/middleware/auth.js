const jwt = require('jsonwebtoken');

const SECRET = 'votre_secret_test'; // doit être identique partout
/**
 *
 * @swagger
 * components:
 *  securitySchemes:
 * BearerAuth:
 * type: http
 * scheme: bearer
 * bearerFormat: JWT
 * security:
 * - BearerAuth: []
 * tags:
 * - name: Authentification
 * description: Middleware pour l'authentification des utilisateurs
 * description: |
 */

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports.SECRET = SECRET;
