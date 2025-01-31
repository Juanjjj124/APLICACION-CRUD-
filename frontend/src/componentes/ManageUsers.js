import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageUsers.css'; // Archivo CSS para estilos

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    // Obtener los usuarios al cargar el componente
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3000/api/users/${String (currentUser._id)}`, currentUser);
        setMessage('Usuario actualizado con éxito.');
        setUsers(users.map((user) => (user._id === currentUser._id ? currentUser : user)));
        setIsEditing(false);
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        setMessage('Error al actualizar el usuario.');
      }
    } else {
      try {
        const endpoint =
          currentUser.role === 'admin'
            ? 'http://localhost:3000/api/users/register/admin'
            : 'http://localhost:3000/api/users/register/user';
        const response = await axios.post(endpoint, currentUser);
        setMessage('Usuario agregado con éxito.');
        setUsers([...users, response.data]);
      } catch (error) {
        console.error('Error al agregar usuario:', error);
        setMessage('Error al agregar el usuario.');
      }
    }
    setCurrentUser({ name: '', email: '', password: '' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setMessage('Usuario eliminado con éxito.');
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setMessage('Error al eliminar el usuario.');
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  return (
    <div className="manage-users">
      <h2>Gestionar Usuarios</h2>
      {message && <p>{message}</p>}

      {/* Formulario para agregar/editar usuario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={currentUser.name}
          onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={currentUser.email}
          onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={currentUser.password}
          onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
          required={!isEditing}
        />
       
        <button type="submit">{isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
      </form>

      {/* Tabla de usuarios */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
           
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
    
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
