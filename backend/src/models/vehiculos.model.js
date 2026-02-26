//backend/src/models/vehiculos.model.js
//Clase para el modelo de vehiculo
import { DataTypes } from "sequelize";
import dbInstance from "../database/database";

const sequelize = dbInstance.ObtenerInstancia; //Obtener la instancia de la base de datos

const vehiculosModel = sequelize.define('Vehiculos', {
    
    //Columnas de la tabla
    //idvehiculo PK
    idvehiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    //idtipovehiculo FK
    idtipovehiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idtipovehiculo'
    },

    //modelo STRING
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    //color STRING
    color: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    //matricula CHAR
    matricula: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        unique: true
    },

    //Año de fabricacion YEAR
    anio_fabricacion: {
        type: DataTypes.YEAR,
        allowNull: false
    },

    //idmarca FK
    idmarca: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    //Configuracion del modelo
    tableName: 'vehiculos', 
    timestamps: false
});

//Definir las relaciones entre tablas
vehiculosModel.BelongsTo(sequelize.models.TipoVehiculos, { foreignKey: 'idtipovehiculo', as: 'tipoVehiculo' });
vehiculosModel.BelongsTo(sequelize.models.marcas, { foreignKey: 'idmarca', as: 'marca' });


export default vehiculosModel;