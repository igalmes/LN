const { DataTypes } = require('sequelize');
const sequelize = require('../db2');

const Repuesto = sequelize.define('Repuesto', {
  codigo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: DataTypes.STRING,
  stock_actual: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  precio_compra: DataTypes.DECIMAL(10,2),
  precio_venta: DataTypes.DECIMAL(10,2),
  ubicacion: DataTypes.STRING,
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'repuestos',
  timestamps: false
});

module.exports = Repuesto;
