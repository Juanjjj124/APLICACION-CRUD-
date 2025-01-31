import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para saber si es login de admin
  const navigate = useNavigate();

  // Función para manejar el login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isAdmin ? 'http://localhost:3000/api/login/admin' : 'http://localhost:3000/api/login';

    try {
      // Realizar la solicitud al backend
      const response = await axios.post(url, { email, password });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);
      setMessage('');
      
      // Redirigir dependiendo de si es admin o no
      if (isAdmin) {
        navigate('/admin-dashboard'); // Redirige al panel de administrador
      } else {
        navigate('/'); // Redirige a la página de inicio
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      setMessage('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  // Función para manejar el cambio a login de admin
  const handleAdminLogin = () => {
    navigate('/admin-login'); // Redirige a la página de login de administrador
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {message && <p>{message}</p>}

      {/* Opción para ingresar como administrador */}
      <div>
        <button onClick={handleAdminLogin}>Ingresar como Administrador</button>
      </div>
    </div>
  );
};

export default Login;
