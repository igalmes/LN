const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

// 🔹 IMPORTO CLASES
const Empleado = require('./Empleado');
const Unidad = require('./Unidad');
const EmpleadoUnidad = require('./EmpleadoUnidad');

// 🔹 INICIALIZO MODELOS
Empleado.init({
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  dni: DataTypes.STRING,
  cuit: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Empleado',
  tableName: 'Empleado',
  timestamps: false
});

Unidad.init({
  patente: DataTypes.STRING,
  modelo: DataTypes.STRING,
  marca: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Unidad',
  tableName: 'Unidad',
  timestamps: false
});

EmpleadoUnidad.init({
  empleado_id: DataTypes.INTEGER,
  unidad_id: DataTypes.INTEGER,
  fecha_inicio: DataTypes.DATEONLY,
  fecha_fin: DataTypes.DATEONLY
}, {
  sequelize,
  modelName: 'EmpleadoUnidad',
  tableName: 'EmpleadoUnidad',
  timestamps: false
});

// 🔹 RELACIONES
Empleado.belongsToMany(Unidad, {
  through: EmpleadoUnidad,
  foreignKey: 'empleado_id'
});

Unidad.belongsToMany(Empleado, {
  through: EmpleadoUnidad,
  foreignKey: 'unidad_id'
});

// 🔹 EXPORTO
module.exports = {
  sequelize,
  Empleado,
  Unidad,
  EmpleadoUnidad
};
