import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ productId, onProductUpdated }) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [currentProductId, setCurrentProductId] = useState(productId); // Nuevo estado para productId

  // Obtener lista de productos al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/`);
        setProducts(response.data);
      } catch (error) {
        setMessage('Error al obtener los productos');
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Obtener producto para edición
  const handleEdit = (productToEdit) => {
    setProduct(productToEdit);
    setCurrentProductId(productToEdit._id); // Usar el estado currentProductId en lugar de setProductId
  };

  // Actualizar el producto
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${String(currentProductId)}`, product);
      setMessage('Producto actualizado exitosamente');
      // Actualizar la lista de productos
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === currentProductId ? response.data.product : p))
      );
      onProductUpdated(response.data.product);
    } catch (error) {
      setMessage('Error al actualizar el producto');
      console.error(error);
    }
  };

  // Eliminar el producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setMessage('Producto eliminado exitosamente');
      // Actualizar la lista de productos
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
    } catch (error) {
      setMessage('Error al eliminar el producto');
      console.error(error);
    }
  };

  if (!products) {
    return <p>Cargando datos de los productos...</p>;
  }

  return (
    <div className="edit-product-form">
      <h2>Editar Producto</h2>
      {message && <p>{message}</p>}

      {product && (
        <form>
          <div>
            <label>Nombre del Producto:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>URL de la Imagen:</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
            />
          </div>

          <div className="buttons mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              onClick={handleUpdate}
            >
              Actualizar Producto
            </button>
          </div>
        </form>
      )}

      <h3>Lista de Productos</h3>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.description}</td>
              <td className="border px-4 py-2">{p.price}</td>
              <td className="border px-4 py-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(p._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProduct;
