const { DataTypes } = require('sequelize');
const sequelize = require('../db2');

const Unidad = sequelize.define('Unidad', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patente: { type: DataTypes.STRING, allowNull: false, unique: true },
  modelo: { type: DataTypes.STRING },
  marca: { type: DataTypes.STRING }
}, {
  tableName: 'Unidad',
  timestamps: false
});

module.exports = Unidad;
