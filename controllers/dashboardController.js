const { Empleado, Unidad } = require('../models');

const dashboard = async (req, res) => {
  try {
    // Totales
    const totalEmpleados = await Empleado.count();
    const totalUnidades = await Unidad.count();

    // Empleados con unidades
    const empleados = await Empleado.findAll({
      include: {
        model: Unidad,
        through: { attributes: [] }
      }
    });

    const empleadosConUnidad = empleados.filter(e => e.Unidads.length > 0).length;
    const empleadosSinUnidad = totalEmpleados - empleadosConUnidad;

    res.render('dashboard', {
      totalEmpleados,
      totalUnidades,
      empleadosConUnidad,
      empleadosSinUnidad,
      empleados
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en dashboard');
  }
};

module.exports = {
  dashboard
};
