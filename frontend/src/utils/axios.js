// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base de tu backend
  timeout: 1000,  // Tiempo máximo de espera de la solicitud
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido que se envía
  },
});

export default axiosInstance;
