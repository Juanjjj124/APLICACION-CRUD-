🛒 Aplicación CRUD para Gestión de Productos
Esta es una aplicación web que permite gestionar productos en una tienda mediante un sistema CRUD (Crear, Leer, Actualizar, Eliminar). La aplicación cuenta con autenticación y autorización de usuarios mediante JWT y utiliza MongoDB como base de datos.

📌 Características
Autenticación y Autorización: Registro e inicio de sesión con JWT.
Gestión de Productos: Operaciones CRUD para productos (nombre, descripción, precio, categoría y cantidad en inventario).
Interfaz Gráfica: Construida con React, permite la interacción con los productos en un formato de tabla.
Backend Seguro: Implementado con Node.js y Express, protegiendo rutas con autenticación.
🛠️ Tecnologías Utilizadas
Frontend: React.js
Backend: Node.js, Express.js
Base de Datos: MongoDB
Autenticación: JSON Web Tokens (JWT)
Control de Versiones: Git y GitHub
🚀 Instalación y Uso
1️⃣ Clonar el Repositorio
git clone https://github.com/Juanjjj124/APLICACION-CRUD-.git
cd tu-repositorio
2️⃣ Configurar el Backend
Navega al directorio del backend:
cd backend
Instala las dependencias:=
npm install

Crea un archivo .env en la raíz del backend y configura las siguientes variables:
PORT=5000
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=tu_secreto_jwt
Inicia el servidor:
npm run dev
3️⃣ Configurar el Frontend
Navega al directorio del frontend:
cd ../frontend
Instala las dependencias:
npm install
Inicia la aplicación:
npm start
