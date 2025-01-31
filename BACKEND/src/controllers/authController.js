const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');

// Login común para usuario y admin
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar en ambas colecciones
    const user = await User.findOne({ email });
    const admin = !user && (await Admin.findOne({ email }));

    // Si no se encuentra el usuario en ninguna colección
    if (!user && !admin) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    const account = user || admin; // Determina si es usuario o administrador

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Generar token con rol específico
    const token = jwt.sign(
      {
        userId: account._id,
        role: user ? 'user' : 'admin',
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      role: user ? 'user' : 'admin',
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
};

// Login solo para administradores
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar solo en la colección de administradores
    const admin = await Admin.findOne({ email });

    // Si no se encuentra el administrador
    if (!admin) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Generar token para el administrador
    const token = jwt.sign(
      {
        userId: admin._id,
        role: 'admin',
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión de administrador exitoso',
      token,
      role: 'admin',
    });
  } catch (error) {
    console.error('Error en el inicio de sesión del administrador:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión.' });
  }
};

module.exports = { login, loginAdmin };
