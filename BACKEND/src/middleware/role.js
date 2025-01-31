// src/middleware/role.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Acceso denegado. Requiere privilegios de administrador.' });
    }
  };
  
  module.exports = { isAdmin };
  