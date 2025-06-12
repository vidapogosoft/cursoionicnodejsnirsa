const express = require('express');
const router = express.Router();
const products = require('../controllers/productosController.js');


// Obtener todos los productos
router.get('/', products.findAll);

//consulta con filtro
router.get('/:idproducto', products.findOne);

// post => registro de datos
router.post('/', products.create);

// put => actualizacion de datos
router.put('/:idproducto', products.update);

// delete => eliminacion de datos
router.delete('/:idproducto', products.delete);

module.exports = router;