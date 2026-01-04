const { DataTypes } = require('sequelize');
const sequelize = require('../db2');

const CambioRepuesto = sequelize.define('CambioRepuesto', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  km_unidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  es_service: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'cambios_repuestos',
  timestamps: true
});

module.exports = CambioRepuesto;
