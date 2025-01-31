import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:3000/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products:', error));
  }, [token]);

  return (
    <div>
      <h2>Listado de Productos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            {role === 'admin' && <th>Acciones</th>}  {/* Solo admin puede ver acciones */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              {role === 'admin' && (
                <td>
                  <Link to={`/edit-product/${product._id}`} className="btn btn-warning">Editar</Link>
                  <button onClick={() => deleteProduct(product._id)} className="btn btn-danger">Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const deleteProduct = (id) => {
  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:5000/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => alert('Producto eliminado'))
  .catch(error => console.error('Error deleting product:', error));
};

export default ProductList;
