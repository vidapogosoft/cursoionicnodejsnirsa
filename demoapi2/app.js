require('dotenv').config(); // Cargar variables de entorno al inicio
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
console.log('DB Config:', config); // Esto te mostrará qué valores está usando Sequelize

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./models'); // Importa la configuración de la base de datos y los modelos

// Opciones de CORS
var corsOptions = {
  origin: '*' // Permite todas las solicitudes. En producción, limita a tus dominios.
  //origin: 'https://midominio.com'
};
app.use(cors(corsOptions));

// Analizar solicitudes de tipo content-type - application/json
app.use(bodyParser.json());

// Analizar solicitudes de tipo content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Autenticar la conexión a la base de datos existente
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
    process.exit(); // Salir si no hay conexión a la DB
  });


// Ruta simple de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API RESTful de productos con Node.js, Express y Sequelize-Auto.' });
});

// Rutas de productos
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);


// Rutas de categorias
/*
const categoryRoutes = require('./routes/categoriasRoutes');
app.use('/api/category', categoryRoutes);
*/


// Establecer puerto, escuchar solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});

//npx sequelize-auto -h localhost -d dbexample -u postgres -x Ctek2314 -p 5432 --dialect postgres -o ./models