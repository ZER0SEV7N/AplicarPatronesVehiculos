//backend/src/models/marcas.models.js
//Clase para el modelo de marca

import { DataTypes } from "sequelize";
import dbInstance from "../database/database";

const sequelize = dbInstance.ObtenerInstancia; //Obtener la instancia de la base de datos
const marcasModel = sequelize.define('marcas', {
    //Columnas de la tabla
    //idmarca PK
    idmarca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //nombre STRING
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    //Configuracion del modelo
    tableName: 'marcas', 
    timestamps: false
});

//Definir la relacion entre marcas y vehiculos
marcasModel.HasMany(sequelize.models.Vehiculos, { foreignKey: 'idmarca', as: 'vehiculos' });

export default marcasModel;