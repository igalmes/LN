const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db2');

class Empleado extends Model {}

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

module.exports = Empleado;
