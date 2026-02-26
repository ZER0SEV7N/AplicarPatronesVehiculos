//backend/src/models/tipoVehiculos.models.js
//Clase para el modelo de tipo de vehiculo
import { DataTypes } from "sequelize";
import dbInstance from "../database/database";

const sequelize = dbInstance.ObtenerInstancia; //Obtener la instancia de la base de datos

const TVModels = sequelize.define('TipoVehiculos', {
    //Columnas de la tabla
    //idtipovehiculo PK
    idtipovehiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    //nombre STRING
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    //Configuracion del modelo
    tableName: 'tipovehiculos', 
    timestamps: false
});
TVModels.HasMany(sequelize.models.Vehiculos, { foreignKey: 'idtipovehiculo', as: 'vehiculos' });

export default TVModels;

