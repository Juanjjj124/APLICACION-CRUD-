// controllers/productController.js

const Product = require('../models/Product');

// Función para obtener productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Consulta a la base de datos para obtener todos los productos
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

// Función para agregar un producto
const addProduct = async (req, res) => {
  const { name, description, price, category, quantity, image } = req.body;

  if (!name || !description || !price || !category || !quantity || !image ) {
    return res.status(400).json({ message: 'Faltan datos para agregar el producto.' });
  }

  try {
    const newProduct = new Product({ name, description, price, category, quantity, image });
    await newProduct.save(); // Guarda el producto en la base de datos
    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ message: 'Error al agregar el producto', error });
  }
};

// Función para actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, quantity, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, quantity, image},
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

// Función para eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

// Exportando las funciones
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
};