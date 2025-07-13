// routes/users.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Usuarios
 * description: Operaciones de usuarios
 */

/**
 * @swagger
 * /users:
 * get:
 * summary: Obtiene todos los usuarios
 * tags: [Usuarios]
 * responses:
 * 200:
 * description: Lista de usuarios
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * description: ID del usuario
 * name:
 * type: string
 * description: Nombre del usuario
 * 500:
 * description: Error del servidor
 */
router.get('/users', (req, res) => {
  // Lógica para obtener usuarios
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

/**
 * @swagger
 * /users/{id}:
 * get:
 * summary: Obtiene un usuario por ID
 * tags: [Usuarios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID del usuario a obtener
 * responses:
 * 200:
 * description: Información del usuario
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * name:
 * type: string
 * 404:
 * description: Usuario no encontrado
 * 500:
 * description: Error del servidor
 */
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  // Lógica para obtener un usuario por ID
  if (userId === 1) {
    res.json({ id: 1, name: 'Alice' });
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

module.exports = router;