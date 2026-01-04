const express = require('express');
const router = express.Router();
const controller = require('../controllers/unidadController');

router.get('/', controller.listar);
router.get('/editar/:id', controller.formEditar);
router.post('/editar/:id', controller.actualizar);

module.exports = router;
