const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', getProducts);          // Obtener todos los productos
router.post('//', addProduct);          // Agregar un producto
router.put('/:id', updateProduct);     // Actualizar un producto
router.delete('/:id', deleteProduct);  // Eliminar un producto

module.exports = router;
