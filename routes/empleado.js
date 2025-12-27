const express = require('express');
const router = express.Router();

const empleadoController = require('../controllers/empleadoController');

router.get('/', empleadoController.listar);
router.get('/:id', empleadoController.verEmpleado);
router.get('/:id/edit', empleadoController.edit);
router.post('/:id/edit', empleadoController.update);

module.exports = router;


