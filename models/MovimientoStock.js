const { DataTypes } = require('sequelize');
const sequelize = require('../db2');

const MovimientoStock = sequelize.define('MovimientoStock', {
  tipo: {
    type: DataTypes.ENUM('ENTRADA', 'SALIDA', 'AJUSTE'),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  referencia: DataTypes.STRING,
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'movimientos_stock',
  timestamps: false
});

module.exports = MovimientoStock;
