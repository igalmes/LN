const { Empleado, Unidad, EmpleadoUnidad } = require('../models');

/* =====================================================
   LISTAR EMPLEADOS
   ===================================================== */
const listar = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      include: [{
        model: Unidad,
        through: {
          model: EmpleadoUnidad,
          attributes: ['fecha_inicio', 'fecha_fin']
        }
      }],
      order: [
        ['apellido', 'ASC'],
        ['nombre', 'ASC']
      ]
    });

    const totalEmpleados = empleados.length;

    const conUnidad = empleados.filter(
      e => e.Unidads && e.Unidads.length > 0
    ).length;

    const sinUnidad = totalEmpleados - conUnidad;

    res.render('empleados', {
      empleados,
      totalEmpleados,
      conUnidad,
      sinUnidad
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener empleados');
  }
};

/* =====================================================
   VER DETALLE
   ===================================================== */
const verEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id, {
      include: [{
        model: Unidad,
        through: {
          model: EmpleadoUnidad,
          attributes: ['fecha_inicio', 'fecha_fin']
        }
      }]
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

/* =====================================================
   EDITAR
   ===================================================== */
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

/* =====================================================
   UPDATE
   ===================================================== */
const update = async (req, res) => {
  try {
    await Empleado.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect(`/empleado/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar empleado');
  }
};

// =======================
// FORM NUEVO EMPLEADO
// =======================
const nuevo = (req, res) => {
  res.render('empleadoNuevo');
};

// =======================
// GUARDAR NUEVO EMPLEADO
// =======================
const store = async (req, res) => {
  try {
    const { nombre, apellido, dni, cuit } = req.body;

    await Empleado.create({
      nombre,
      apellido,
      dni,
      cuit
    });

    res.redirect('/empleado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear empleado');
  }
};


/* =====================================================
   ELIMINAR
   ===================================================== */
const destroy = async (req, res) => {
  try {
    await Empleado.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/empleado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar empleado');
  }
};

/* =====================================================
   EXPORTAR PDF
   ===================================================== */
const exportarPDF = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.render('empleadosPDF', { empleados });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar PDF');
  }
};

const descargarPDF = async (req, res) => {
  try {
    res.download('empleados.pdf');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al descargar PDF');
  }
};

/* =====================================================
   MOSTRAR FORM ASIGNAR UNIDAD
   ===================================================== */
const mostrarAsignarUnidad = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    const unidades = await Unidad.findAll();

    if (!empleado) {
      return res.status(404).send('Empleado no encontrado');
    }

    res.render('empleadoAsignarUnidad', { empleado, unidades });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar formulario');
  }
};

/* =====================================================
   ASIGNAR / REACTIVAR UNIDAD  ✅ BUG FIX
   ===================================================== */
const asignarUnidad = async (req, res) => {
  try {
    // 🔴 BUG ARREGLADO
    const empleadoId = req.params.id;
    const { unidad_id, fecha_inicio } = req.body;

    // Buscar relación existente
    const existente = await EmpleadoUnidad.findOne({
      where: {
        empleado_id: empleadoId,
        unidad_id
      }
    });

    if (existente) {
      // Reactivar
      await existente.update({
        fecha_inicio,
        fecha_fin: null
      });
    } else {
      // Crear
      await EmpleadoUnidad.create({
        empleado_id: empleadoId,
        unidad_id,
        fecha_inicio
      });
    }

    res.redirect(`/empleado/${empleadoId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al asignar unidad');
  }
};

/* =====================================================
   QUITAR UNIDAD (soft delete)
   ===================================================== */
const quitarUnidad = async (req, res) => {
  try {
    const { empleado_id, unidad_id } = req.params;

    await EmpleadoUnidad.update(
      { fecha_fin: new Date() },
      {
        where: {
          empleado_id,
          unidad_id,
          fecha_fin: null
        }
      }
    );

    res.redirect(`/empleado/${empleado_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al quitar unidad');
  }
};

/* =====================================================
   EXPORTS (NO SE TOCAN)
   ===================================================== */
module.exports = {
  listar,
  verEmpleado,
  edit,
  update,
  destroy,
  exportarPDF,
  descargarPDF,
  asignarUnidad,
  mostrarAsignarUnidad,
  quitarUnidad,
  nuevo,
  store
};
