const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db2');

class Unidad extends Model {}

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

module.exports = Unidad;

