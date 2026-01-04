const sequelize = require('../db2');

const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Unidad = require('./Unidad');
const EmpleadoUnidad = require('./EmpleadoUnidad');
const Categoria = require('./Categoria');
const Proveedor = require('./Proveedor');
const Repuesto = require('./Repuesto');
const MovimientoStock = require('./MovimientoStock');
const CambioRepuesto = require('./CambioRepuesto');

// =======================
// RELACIONES
// =======================

// EMPLEADO <-> UNIDAD
Empleado.belongsToMany(Unidad, {
  through: EmpleadoUnidad,
  foreignKey: 'empleado_id'
});

Unidad.belongsToMany(Empleado, {
  through: EmpleadoUnidad,
  foreignKey: 'unidad_id'
});

// CATEGORIA / PROVEEDOR
Categoria.hasMany(Repuesto, { foreignKey: 'categoria_id' });
Repuesto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

Proveedor.hasMany(Repuesto, { foreignKey: 'proveedor_id' });
Repuesto.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });

// STOCK
Repuesto.hasMany(MovimientoStock, { foreignKey: 'repuesto_id' });
MovimientoStock.belongsTo(Repuesto, { foreignKey: 'repuesto_id' });

// =======================
// CAMBIOS DE REPUESTOS
// =======================

Unidad.hasMany(CambioRepuesto, { foreignKey: 'unidad_id' });
CambioRepuesto.belongsTo(Unidad, { foreignKey: 'unidad_id' });

Empleado.hasMany(CambioRepuesto, { foreignKey: 'empleado_id' });
CambioRepuesto.belongsTo(Empleado, { foreignKey: 'empleado_id' });

Repuesto.hasMany(CambioRepuesto, { foreignKey: 'repuesto_id' });
CambioRepuesto.belongsTo(Repuesto, { foreignKey: 'repuesto_id' });

module.exports = {
  sequelize,
  Usuario,
  Empleado,
  Unidad,
  EmpleadoUnidad,
  Categoria,
  Proveedor,
  Repuesto,
  MovimientoStock,
  CambioRepuesto
};
