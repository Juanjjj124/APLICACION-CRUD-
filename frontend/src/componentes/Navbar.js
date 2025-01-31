import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener esta librería instalada
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el inicio de sesión
  const [isAdmin, setIsAdmin] = useState(false); // Estado para el rol de administrador

  useEffect(() => {
    // Función que verifica el estado del token
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        setIsLoggedIn(true);
        try {
          // Decodificar el token para obtener el rol del usuario
          const decodedToken = jwtDecode(token);
          setIsAdmin(decodedToken?.role === 'admin');
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    // Verifica el estado del token cuando el componente se monte
    checkAuthStatus();

    // Añadir un listener al localStorage para escuchar cambios y actualizar el estado
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpieza del listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {/* Enlace de inicio (siempre visible) */}
        <Link to="/" className="dashboard-link">Inicio</Link>
        {/* Enlace de registro (solo visible cuando no se ha iniciado sesión) */}
        {!isLoggedIn && <li><Link to="/register"  className="dashboard-link">Registrar</Link></li>}

        {/* Enlace de login (solo visible cuando no se ha iniciado sesión) */}
        {!isLoggedIn && <li><Link to="/login"  className="dashboard-link">Login</Link></li>}

        {/* Opciones del admin (solo visibles para el admin) */}
        {isAdmin && (
          <>
             
            <Link to="/add-product" className="dashboard-link">Agregar Producto</Link>
            <Link to="/edit-product" className="dashboard-link">Editar Producto</Link>

            <Link to="/manage-users" className="dashboard-link">Gestionar Usuarios</Link>
            <Link to="/manage-admin"className="dashboard-link">Gestionar Administradores</Link>
          </>
        )}

        {/* Logout (solo visible cuando el usuario está logueado) */}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
