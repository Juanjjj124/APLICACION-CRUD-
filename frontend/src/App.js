import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/Navbar';
import Home from './componentes/home';
import Login from './componentes/login';
import Register from './componentes/Register';
import ManageUsers from './componentes/ManageUsers';
import AdminLogin from './componentes/AdminLogin';
import ManageAdmin  from './componentes/ManageAdmin';
import AddProduct from './componentes/AddProduct';
import EditProduct from './componentes/EditProduct';
import Footer from './componentes/footer';

function App() {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  // Función para verificar si el usuario es admin
  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-admin" element={<ManageAdmin />} />
          <Route path="/add-product" element={<AddProduct  />} />
          <Route path="/edit-product" element={<EditProduct />} />
          
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;
