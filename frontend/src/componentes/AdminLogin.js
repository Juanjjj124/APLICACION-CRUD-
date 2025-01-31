import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Para mostrar el mensaje de error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login/admin', {
        email,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigir al dashboard de admin
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión como admin:', error);
      setMessage('Credenciales incorrectas. Intenta de nuevo.'); // Mostrar error al usuario
    }
  };
  const handleAdminLogin = () => {
    navigate('/login'); // Redirige a la página de login de administrador
  };

  return (
    <div>
      <h2>Login de Administrador</h2>
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
      
      {/* Mostrar el mensaje de error si hay */}
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <div>
        <button onClick={handleAdminLogin}>Ingresar como Usuario</button>
      </div>
    </div>
    
  );
};

export default AdminLogin;
