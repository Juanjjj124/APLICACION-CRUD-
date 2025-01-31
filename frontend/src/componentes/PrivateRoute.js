// src/componentes/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/Auth';  // Usando el método para verificar autenticación

const PrivateRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Redirect to="/login" />}
    />
  );
};

export default PrivateRoute;
