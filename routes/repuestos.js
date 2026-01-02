const express = require('express');
const router = express.Router();
const { listarRepuestos, crearForm, crear, editarForm, editar, eliminar, agregarMovimiento } = require('../controllers/repuestoController');

// Listar repuestos
router.get('/', listarRepuestos);

// Crear repuesto
router.get('/nuevo', crearForm);
router.post('/nuevo', crear);

// Editar repuesto
router.get('/editar/:id', editarForm);
router.post('/editar/:id', editar);

// Eliminar repuesto
router.post('/eliminar/:id', eliminar);

// Movimiento de stock
router.post('/movimiento/:id', agregarMovimiento);

module.exports = router;
