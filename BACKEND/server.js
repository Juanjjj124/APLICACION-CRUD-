const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');  // Conexión a la base de datos
const productRoutes = require('./src/routes/ProductRoutes'); // Rutas de productos
const userRoutes = require('./src/routes/userRoutes'); // Rutas de usuarios
const authRoutes = require('./src/routes/Auth');  // Rutas de autenticación
const bodyParser = require('body-parser'); // Para parsear el body de las solicitudes
const bcrypt = require('bcryptjs'); // Para verificar contraseñas
const jwt = require('jsonwebtoken'); // Para generar el token
const User = require('./src/models/user'); // Modelo de usuario

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Cambia según la URL de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/products', productRoutes);  // Ruta de productos
app.use('/api/users', userRoutes);      // Ruta de usuarios
app.use('/api/auth', authRoutes);       // Ruta de autenticación

// Ruta para actualizar usuario por ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let updatedData = { name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta para login de usuario normal
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });
  res.json({ token });
});

// Ruta para login de administrador
app.post('/api/login/admin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password) || user.role !== 'admin') {
    return res.status(400).json({ message: 'No eres un administrador o las credenciales son incorrectas' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });
  res.json({ token });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, description, price, category, quantity, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, quantity, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado exitosamente", product: updatedProduct });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});
