const express = require('express');
const router = express.Router();
const controller = require('../controllers/cambioRepuestoController');

// LISTADO
router.get('/', controller.listar);

// NUEVO
router.get('/nuevo', controller.formNuevo);
router.post('/', controller.crear);

// EDITAR
router.get('/editar/:id', controller.formEditar);
router.put('/editar/:id', controller.actualizar);

// ELIMINAR
router.delete('/eliminar/:id', controller.eliminar);

module.exports = router;
