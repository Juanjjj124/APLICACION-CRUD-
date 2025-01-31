const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Función para conectar a la base de datos MongoDB
const conectarBD = async () => {
    try {
        // Verificar que la URL de la base de datos esté configurada
        if (!process.env.MONGO_URL) {
            throw new Error('La URL de la base de datos no está configurada en las variables de entorno');
        }

        // Conectar a la base de datos MongoDB usando la URL de las variables de entorno
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,  // Aunque ya no es necesario, puede ayudar con versiones anteriores
        });

        console.log('Base de datos conectada correctamente');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);  // Salir del proceso con código de error 1 si la conexión falla
    }
}

module.exports = conectarBD;
