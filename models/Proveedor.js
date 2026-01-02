const { DataTypes } = require('sequelize');
const sequelize = require('../db2');

const Proveedor = sequelize.define('Proveedor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: DataTypes.STRING,
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'proveedores',
  timestamps: false
});

module.exports = Proveedor;
