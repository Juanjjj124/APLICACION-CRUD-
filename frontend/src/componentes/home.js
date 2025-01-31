import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los productos desde la API
    axios.get('http://localhost:3000/api/products/')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("No se pudieron cargar los productos. Por favor, intenta más tarde.");
        setLoading(false);
      });
  }, []);

  const renderProducts = () => {
    if (products.length === 0) {
      return <p className="text-center">No hay productos disponibles.</p>;
    }

    return products.map(product => (
      <div className="col-md-4 mb-4" key={product._id}>
        <div className="card h-100 shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="card-img-top" 
            style={{ objectFit: 'cover', height: '200px' }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text text-muted">{product.description}</p>
            <p className="card-text fw-bold">Precio: ${product.price}</p>
            <p className="card-text">Cantidad: {product.quantity}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Bienvenidos a MAKEUPJM</h1>
      <p className="text-center mb-4">
        Descubre nuestra increíble colección de productos de maquillaje. MAKEUPJM es tu destino ideal para encontrar 
        productos de alta calidad que realzan tu belleza natural. Cada artículo en nuestra tienda ha sido cuidadosamente 
        seleccionado para garantizar que obtengas lo mejor.
      </p>
      <p className="text-center mb-4 text-muted">
        Explora nuestras opciones, desde bases y sombras hasta labiales y brochas. Encuentra todo lo que necesitas 
        para crear looks deslumbrantes para cualquier ocasión.
      </p>
      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      <div className="row">
        {!loading && !error && renderProducts()}
      </div>
    </div>
  );
}

export default Home;
