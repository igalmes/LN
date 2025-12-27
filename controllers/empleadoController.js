const { Empleado, Unidad } = require('../models');

// LISTAR
const listar = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.render('empleados', { empleados });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener empleados');
  }
};

// VER DETALLE
const verEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id, {
      include: Unidad
    });

    if (!empleado) {
      return res.status(404).send('Empleado no encontrado');
    }

    res.render('empleadoDetalle', { empleado });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener empleado');
  }
};

// FORM EDITAR
const edit = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);

    if (!empleado) {
      return res.status(404).send('Empleado no encontrado');
    }

    res.render('empleadoEdit', { empleado });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar edición');
  }
};

// UPDATE (GUARDA EN DB)
const update = async (req, res) => {
  try {
    const { nombre, apellido, dni, cuit } = req.body;

    await Empleado.update(
      { nombre, apellido, dni, cuit },
      { where: { id: req.params.id } }
    );

    res.redirect('/empleado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar empleado');
  }
};

// 👇 EXPORTS (ESTO ES CLAVE)
module.exports = {
  listar,
  verEmpleado,
  edit,
  update
};

