const express = require('express');
const router = express.Router();
const { login, loginAdmin} = require('../controllers/authController');
const { registerUser, registerAdmin, getUsers, getAdmins, updateUser, updateAdmin, deleteUser, deleteAdmin } = require('../controllers/userController');

// Rutas de registro
router.post('/register/user', registerUser); // Registro para usuarios
 // Registro para administradores

// Ruta de login
router.post('/login', login);
router.post('/login/admin', loginAdmin);


// Gestión de usuarios
router.get('/', getUsers); // Obtener todos los usuarios
router.put('/:id', updateUser); // Actualizar un usuario por ID
router.delete('/:id', deleteUser); // Eliminar un usuario por ID


// Rutas de usuario


// Rutas de administrador
router.post('/register/admin', registerAdmin);
router.get('/admins', getAdmins); // Obtener todos los administradores
router.put('/admins/:id', updateAdmin); // Actualizar administrador
router.delete('/admins/:id', deleteAdmin); // Eliminar administrador

module.exports = router;

module.exports = router;
