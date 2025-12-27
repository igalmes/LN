const { DataTypes } = require('sequelize');
const sequelize = require('../db2');

const Empleado = sequelize.define('Empleado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  cuit: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName: 'Empleado',
  timestamps: false
});

module.exports = Empleado;
