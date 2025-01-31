const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Admin = require('../models/admin');

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validación de campos requeridos
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ message: 'Hubo un problema al registrar el usuario', error: error.message });
  }
};

// Registro de administrador
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // Validación de campos requeridos
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo administrador
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Administrador registrado con éxito' });
  } catch (error) {
    console.error('Error registrando administrador:', error);
    res.status(500).json({ message: 'Hubo un problema al registrar el administrador', error: error.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
};

// Obtener todos los administradores
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find(); // Obtener todos los administradores
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
    res.status(500).json({ message: 'Error al obtener los administradores.' });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // Validación de campos requeridos
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
};

// Actualizar administrador
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Validación de campos requeridos
  if (!name || !email) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Administrador no encontrado.' });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error al actualizar el administrador:', error);
    res.status(500).json({ message: 'Error al actualizar el administrador.' });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};

// Eliminar administrador
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Administrador no encontrado.' });
    }
    res.status(200).json({ message: 'Administrador eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar el administrador:', error);
    res.status(500).json({ message: 'Error al eliminar el administrador.' });
  }
};

module.exports = {
  registerUser,
  registerAdmin,
  getUsers,
  getAdmins,
  updateUser,
  updateAdmin,
  deleteUser,
  deleteAdmin,
};
