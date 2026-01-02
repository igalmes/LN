const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.get('/', empleadoController.listar);
router.get('/export/pdf', empleadoController.exportarPDF);
// Formulario nuevo empleado
router.get('/nuevo', empleadoController.nuevo);

// Guardar nuevo empleado
router.post('/', empleadoController.store);

router.get('/:id', empleadoController.verEmpleado);
router.get('/:id/edit', empleadoController.edit);
router.put('/:id', empleadoController.update);
router.delete('/:id', empleadoController.destroy);
router.get('/export/pdf/download', empleadoController.descargarPDF);
router.get('/:id/asignar-unidad', empleadoController.mostrarAsignarUnidad);
router.post('/:id/asignar-unidad', empleadoController.asignarUnidad);
// Mostrar formulario de asignación de unidad
router.get('/:id/asignar-unidad', empleadoController.mostrarAsignarUnidad);

// Guardar asignación de unidad
router.post('/:id/asignar-unidad', empleadoController.asignarUnidad);


module.exports = router;
