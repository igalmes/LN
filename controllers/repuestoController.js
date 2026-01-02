const { Repuesto, Categoria, Proveedor, MovimientoStock } = require('../models');

// =======================
// LISTAR REPUESTOS
// =======================
const listarRepuestos = async (req, res) => {
  try {
    const repuestos = await Repuesto.findAll({
      include: [Categoria, Proveedor],
      order: [['nombre', 'ASC']]
    });

    res.render('repuestos/lista', { repuestos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar repuestos');
  }
};

// =======================
// CREAR REPUESTO
// =======================
const crearForm = async (req, res) => {
  const categorias = await Categoria.findAll();
  const proveedores = await Proveedor.findAll();
  res.render('repuestos/nuevo', { categorias, proveedores });
};

const crear = async (req, res) => {
  try {
    const { codigo, nombre, marca, categoria_id, proveedor_id, stock_minimo, precio_compra, precio_venta, ubicacion } = req.body;
    await Repuesto.create({
      codigo,
      nombre,
      marca,
      categoria_id,
      proveedor_id,
      stock_actual: 0,
      stock_minimo,
      precio_compra,
      precio_venta,
      ubicacion
    });
    res.redirect('/repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear repuesto');
  }
};

// =======================
// EDITAR REPUESTO
// =======================
const editarForm = async (req, res) => {
  const repuesto = await Repuesto.findByPk(req.params.id);
  const categorias = await Categoria.findAll();
  const proveedores = await Proveedor.findAll();
  res.render('repuestos/editar', { repuesto, categorias, proveedores });
};

const editar = async (req, res) => {
  try {
    const { nombre, marca, categoria_id, proveedor_id, stock_minimo, precio_compra, precio_venta, ubicacion } = req.body;
    await Repuesto.update({
      nombre, marca, categoria_id, proveedor_id, stock_minimo, precio_compra, precio_venta, ubicacion
    }, { where: { id: req.params.id } });
    res.redirect('/repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al editar repuesto');
  }
};

// =======================
// ELIMINAR REPUESTO
// =======================
const eliminar = async (req, res) => {
  try {
    await Repuesto.destroy({ where: { id: req.params.id } });
    res.redirect('/repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar repuesto');
  }
};

// =======================
// AGREGAR MOVIMIENTO DE STOCK
// =======================
const agregarMovimiento = async (req, res) => {
  try {
    const { tipo, cantidad, referencia } = req.body;
    const repuesto = await Repuesto.findByPk(req.params.id);

    if (!repuesto) return res.status(404).send('Repuesto no encontrado');

    // Crear movimiento
    await MovimientoStock.create({
      repuesto_id: repuesto.id,
      tipo,
      cantidad,
      referencia
    });

    // Actualizar stock_actual
    const movimientos = await MovimientoStock.findAll({ where: { repuesto_id: repuesto.id } });
    const stock = movimientos.reduce((total, mov) => {
      if (mov.tipo === 'ENTRADA') return total + mov.cantidad;
      if (mov.tipo === 'SALIDA') return total - mov.cantidad;
      return total;
    }, 0);

    await repuesto.update({ stock_actual: stock });

    res.redirect('/repuestos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar movimiento');
  }
};

module.exports = {
  listarRepuestos,
  crearForm,
  crear,
  editarForm,
  editar,
  eliminar,
  agregarMovimiento
};
