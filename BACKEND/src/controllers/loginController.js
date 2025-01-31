// controllers/loginController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Asegúrate de que bcrypt esté importado
const User = require('../models/user');  // Asegúrate de que el modelo User esté bien definido

const loginUserr = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar la contraseña (usando bcrypt o cualquier otra técnica)
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Verificar el rol del usuario
    if (user.role === 'admin') {
      // Si es admin, enviar una respuesta específica para administradores
      return res.json({ msg: 'Login exitoso como administrador', token });
    } else if (user.role === 'user') {
      // Si es usuario, enviar una respuesta específica para usuarios
      return res.json({ msg: 'Login exitoso como usuario', token });
    } else {
      return res.status(400).json({ msg: 'Rol no reconocido' });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

module.exports = { loginUserr };
