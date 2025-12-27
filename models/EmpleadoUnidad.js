const { DataTypes } = require('sequelize');
const sequelize = require('../db2');
const Empleado = require('./Empleado');
const Unidad = require('./Unidad');

const EmpleadoUnidad = sequelize.define('EmpleadoUnidad', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE }
}, {
    tableName: 'EmpleadoUnidad',
    timestamps: false
});

// Relaciones
Empleado.belongsToMany(Unidad, { through: EmpleadoUnidad, foreignKey: 'empleado_id' });
Unidad.belongsToMany(Empleado, { through: EmpleadoUnidad, foreignKey: 'unidad_id' });

module.exports = EmpleadoUnidad;
