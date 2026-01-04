const { CambioRepuesto, Unidad, Repuesto, Empleado } = require('../models');


// =======================
// LISTAR
// =======================
exports.listar = async (req, res) => {
  try {
    const cambios = await CambioRepuesto.findAll({
      include: [
        { model: Unidad },
        { model: Repuesto },
        { model: Empleado }
      ],
      order: [['fecha', 'DESC']]
    });

    res.render('cambioRepuestoList', { cambios });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar cambios de repuestos');
  }
};

// =======================
// FORM NUEVO
// =======================
exports.formNuevo = async (req, res) => {
  try {
    const unidades = await Unidad.findAll();
    const repuestos = await Repuesto.findAll();
    const empleados = await Empleado.findAll();

    res.render('cambioRepuestoNuevo', {
      unidades,
      repuestos,
      empleados
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar formulario');
  }
};

// =======================
// CREAR
// =======================
exports.crear = async (req, res) => {
  try {
    let {
      fecha,
      km_unidad,
      es_service,
      observaciones,
      unidad_id,
      empleado_id,
      repuesto_id
    } = req.body;

    /**
     * 🔴 FIX IMPORTANTE
     * Si el select viene mal y manda "7,7"
     * nos quedamos con el primero
     */
    if (Array.isArray(repuesto_id)) {
      repuesto_id = repuesto_id[0];
    }
    if (typeof repuesto_id === 'string' && repuesto_id.includes(',')) {
      repuesto_id = repuesto_id.split(',')[0];
    }

    await CambioRepuesto.create({
      fecha,
      km_unidad,
      es_service: !!es_service,
      observaciones,
      unidad_id,
      empleado_id: empleado_id || null,
      repuesto_id
    });

    res.redirect('/cambios-repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear cambio de repuesto');
  }
};

// =======================
// FORM EDITAR
// =======================
exports.formEditar = async (req, res) => {
  try {
    const cambio = await CambioRepuesto.findByPk(req.params.id);

    if (!cambio) {
      return res.status(404).send('Cambio no encontrado');
    }

    const unidades = await Unidad.findAll();
    const repuestos = await Repuesto.findAll();
    const empleados = await Empleado.findAll();

    res.render('cambioRepuestoEditar', {
      cambio,
      unidades,
      repuestos,
      empleados
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar edición');
  }
};

// =======================
// ACTUALIZAR
// =======================
exports.actualizar = async (req, res) => {
  try {
    let {
      fecha,
      km_unidad,
      es_service,
      observaciones,
      unidad_id,
      empleado_id,
      repuesto_id
    } = req.body;

    // mismo fix que en crear
    if (Array.isArray(repuesto_id)) {
      repuesto_id = repuesto_id[0];
    }
    if (typeof repuesto_id === 'string' && repuesto_id.includes(',')) {
      repuesto_id = repuesto_id.split(',')[0];
    }

    await CambioRepuesto.update(
      {
        fecha,
        km_unidad,
        es_service: !!es_service,
        observaciones,
        unidad_id,
        empleado_id: empleado_id || null,
        repuesto_id
      },
      {
        where: { id: req.params.id }
      }
    );

    res.redirect('/cambios-repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar cambio');
  }
};

// =======================
// ELIMINAR
// =======================
exports.eliminar = async (req, res) => {
  try {
    await CambioRepuesto.destroy({
      where: { id: req.params.id }
    });

    res.redirect('/cambios-repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar cambio');
  }
};
