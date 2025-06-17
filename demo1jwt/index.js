require('dotenv').config();
const express = require('express');

//lo nuevo de jwt
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// --- Simulando una "base de datos" en memoria ---
let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
  { id: 2, titulo: '1984', autor: 'George Orwell' },
  { id: 3, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry' }
];
let nextId = libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1;
// --------------------------------------------------


//JWT
const users = [];

app.post('/register' , (req, res) => {

  const {username, password} = req.body;

  users.push({username, password});

  res.status(200).send('user registrado');

});


app.post('/login' , (req, res) => {

  const {username, password} = req.body;

  //verificacion de identity
  // users es es el [] simula uan base de datos
  const usercons = users.find(u=> u.username == username && u.password == password );

  if(!usercons)
  {
    return res.status(400).send("usuario no registrado");
  }

  //genero token
  const accessToken = jwt.sign(

    { username: usercons.username, role: "operador"  }, //payload
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
  );

  res.status(200).send(accessToken);

});


// Rutas para el recurso 'libros'

// GET /api/libros - Obtener todos los libros
app.get('/api/libros', (req, res) => {
  res.json(libros); // Envía el array de libros como JSON
});

// GET /api/libros/:id - Obtener un libro por su ID
app.get('/api/libros/:id', (req, res) => {
  const id = parseInt(req.params.id); // Los parámetros de URL son strings, conviértelos a int
  const libro = libros.find(l => l.id === id);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' }); // 404 Not Found
  }
});

// POST /api/libros - Crear un nuevo libro
app.post('/api/libros', (req, res) => {
  const nuevoLibro = req.body; // El cuerpo de la solicitud (JSON)
  
  // Validaciones básicas (puedes añadir más)
  if (!nuevoLibro.titulo || !nuevoLibro.autor) {
    return res.status(400).json({ mensaje: 'Faltan datos: título y autor son obligatorios' }); // 400 Bad Request
  }

  nuevoLibro.id = nextId++;
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro); // 201 Created
});

// PUT /api/libros/:id - Actualizar completamente un libro
app.put('/api/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const datosActualizados = req.body;

  let libroIndex = libros.findIndex(l => l.id === id);

  if (libroIndex !== -1) {
    // Aseguramos que el ID no se cambie si viene en el body
    datosActualizados.id = id; 
    libros[libroIndex] = datosActualizados;
    res.json(libros[libroIndex]);
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' });
  }
});

// DELETE /api/libros/:id - Eliminar un libro
app.delete('/api/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const initialLength = libros.length;
  libros = libros.filter(l => l.id !== id);

  if (libros.length < initialLength) {
    res.status(204).send(); // 204 No Content (éxito, pero sin devolver cuerpo)
  } else {
    res.status(404).json({ mensaje: 'Libro no encontrado' });
  }
});

// Ruta de inicio simple (opcional, para testear que el servidor corre)
app.get('/', (req, res) => {
    res.send('¡API REST de Libros con Node.js y Express.js!');
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de API REST escuchando en http://localhost:${port}`);
});