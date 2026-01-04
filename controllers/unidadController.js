const { Unidad } = require('../models');

// =======================
// LISTAR UNIDADES
// =======================
exports.listar = async (req, res) => {
  try {
    const unidades = await Unidad.findAll();
    res.render('unidadList', { unidades });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar unidades');
  }
};

// =======================
// FORM EDITAR
// =======================
exports.formEditar = async (req, res) => {
  try {
    const unidad = await Unidad.findByPk(req.params.id);
    if (!unidad) return res.sendStatus(404);

    res.render('unidadEditar', { unidad });
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
    const { numero, patente, marca, modelo } = req.body;

    await Unidad.update(
      { numero, patente, marca, modelo },
      { where: { id: req.params.id } }
    );

    res.redirect('/unidades');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar unidad');
  }
};
