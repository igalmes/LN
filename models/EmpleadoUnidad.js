const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db2');

class EmpleadoUnidad extends Model {}

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

module.exports = EmpleadoUnidad;
