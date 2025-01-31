import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageAdmin.css'; // Archivo CSS para estilos

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({ name: '', email: '', password: '', role: 'admin' }); // rol predeterminado

  useEffect(() => {
    // Obtener los administradores al cargar el componente
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error al obtener los administradores:', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3000/api/users/admins/${currentAdmin._id}`, currentAdmin);
        setMessage('Administrador actualizado con éxito.');
        setAdmins(admins.map((admin) => (admin._id === currentAdmin._id ? currentAdmin : admin)));
        setIsEditing(false);
      } catch (error) {
        console.error('Error al actualizar el administrador:', error);
        setMessage('Error al actualizar el administrador.');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/users/register/admin', currentAdmin);
        setMessage('Administrador agregado con éxito.');
        setAdmins([...admins, response.data]); // Asegúrate de que response.data sea un objeto
      } catch (error) {
        console.error('Error al agregar administrador:', error);
        setMessage('Error al agregar el administrador.');
      }
    }
    setCurrentAdmin({ name: '', email: '', password: '', role: 'admin' });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/admins/${id}`);
      setMessage('Administrador eliminado con éxito.');
      setAdmins(admins.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error('Error al eliminar administrador:', error);
      setMessage('Error al eliminar el administrador.');
    }
  };

  const handleEdit = (admin) => {
    setCurrentAdmin(admin);
    setIsEditing(true);
  };

  return (
    <div className="manage-users">
      <h2>Gestionar Administradores</h2>
      {message && <p>{message}</p>}

      {/* Formulario para agregar/editar administrador */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={currentAdmin.name}
          onChange={(e) => setCurrentAdmin({ ...currentAdmin, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={currentAdmin.email}
          onChange={(e) => setCurrentAdmin({ ...currentAdmin, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={currentAdmin.password}
          onChange={(e) => setCurrentAdmin({ ...currentAdmin, password: e.target.value })}
          required={!isEditing}
        />
        {/* Campo de selección para el rol (por defecto 'admin') */}
        <select
          value={currentAdmin.role}
          onChange={(e) => setCurrentAdmin({ ...currentAdmin, role: e.target.value })}
        >
          <option value="admin">Administrador</option>
         
        </select>

        <button type="submit">{isEditing ? 'Actualizar Administrador' : 'Agregar Administrador'}</button>
      </form>

      {/* Tabla de administradores */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
           
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {admins.map((admin, index) => (
    <tr key={admin._id}>  {/* Usa _id o una combinación única */}
      <td>{admin.name}</td>
      <td>{admin.email}</td>
     
      <td>
        <button onClick={() => handleEdit(admin)}>Editar</button>
        <button onClick={() => handleDelete(admin._id)}>Eliminar</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default ManageAdmin;
