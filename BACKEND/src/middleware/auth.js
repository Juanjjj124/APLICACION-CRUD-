// src/middleware/auth.js

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extrae el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token.' });
  }

  try {
    // Verifica el token JWT utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Agrega la información del usuario decodificado a la solicitud
    next();  // Continúa con el siguiente middleware o ruta
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = authenticate;
