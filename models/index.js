const sequelize = require('../db2');

const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Unidad = require('./Unidad');
const EmpleadoUnidad = require('./EmpleadoUnidad');
const Categoria = require('./Categoria');
const Proveedor = require('./Proveedor');
const Repuesto = require('./Repuesto');
const MovimientoStock = require('./MovimientoStock');
// =======================
// RELACIONES
// =======================

Empleado.belongsToMany(Unidad, {
  through: EmpleadoUnidad,
  foreignKey: 'empleado_id'
});

Unidad.belongsToMany(Empleado, {
  through: EmpleadoUnidad,
  foreignKey: 'unidad_id'
});



Categoria.hasMany(Repuesto, { foreignKey: 'categoria_id' });
Repuesto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

Proveedor.hasMany(Repuesto, { foreignKey: 'proveedor_id' });
Repuesto.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });

Repuesto.hasMany(MovimientoStock, { foreignKey: 'repuesto_id' });
MovimientoStock.belongsTo(Repuesto, { foreignKey: 'repuesto_id' });

module.exports = {
  sequelize,
  Usuario,
  Empleado,
  Unidad,
  EmpleadoUnidad,
  Categoria,
  Proveedor,
  Repuesto,
  MovimientoStock
};
