import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para el rol de administrador
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Estado para mostrar un spinner o mensaje de carga
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);  // Inicia la carga

    try {
      // Determinamos la ruta dependiendo si es admin o no
      const url = isAdmin
        ? 'http://localhost:3000/api/users/register/admin' // Ruta para admins
        : 'http://localhost:3000/api/users/register/user';  // Ruta para usuarios normales

      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      setMessage(response.data.message);

      // Redirigir según el rol
      if (isAdmin) {
        navigate('/dashboard'); // Redirige al dashboard de admin
      } else {
        navigate('/'); // Redirige a la página principal
      }
    } catch (error) {
      console.error('Error registrando usuario:', error.response?.data || error.message);
      setMessage('Error al registrar el usuario. Intente nuevamente.');
    } finally {
      setLoading(false);  // Termina la carga
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        </div>        <button type="submit" disabled={loading}>Registrar</button>
      </form>

      {loading && <p>Cargando...</p>} {/* Muestra mensaje de carga */}
      {message && <p className="message">{message}</p>} {/* Muestra el mensaje de error o éxito */}
    </div>
  );
};

export default Register;
