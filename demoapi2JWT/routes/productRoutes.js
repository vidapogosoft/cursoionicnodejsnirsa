const express = require('express');
const router = express.Router();
const products = require('../controllers/productosController.js');

const authenticateToken = require('../authenticateToken.js'); // Importa el middleware

// Obtener todos los productos
router.get('/v0', authenticateToken, products.findAllv0);

router.get('/', products.findAll);

router.get('/dto', authenticateToken , products.findAllv2);

//sequalize con query raw
router.get('/raw', products.findAllv3);
router.get('/raw/func/:idproducto', products.funcrawquery);
router.get('/raw/proc/:idproducto', products.procrawquery);

//consulta con filtro
router.get('/:idproducto', products.findOne);
router.get('/raw/:idproducto', products.findOnev2);
router.get('/raw2/:idproducto/:idcategoria', products.findOnev3);

// post => registro de datos
router.post('/', products.create);

// put => actualizacion de datos
router.put('/:idproducto', products.update);

// delete => eliminacion de datos
router.delete('/:idproducto', products.delete);

module.exports = router;