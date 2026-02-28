//backend/src/models/index.models.js
//Modelos de la base de datos
//Centralizado
import { DataTypes } from "sequelize";
import dbInstance from "../database/database.js";

const sequelize = dbInstance.ObtenerInstancia(); //Obtener la instancia de la base de datos

const marcasModel = sequelize.define(
  "marcas",
  {
    //Columnas de la tabla
    //idmarca PK
    idmarca: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //nombre STRING
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    //Configuracion del modelo
    tableName: "marcas",
    timestamps: false,
  },
);

const TVModels = sequelize.define(
  "TipoVehiculos",
  {
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
    },
  },
  {
    //Configuracion del modelo
    tableName: "tipos_vehiculos",
    timestamps: false,
  },
);

const vehiculosModel = sequelize.define(
  "Vehiculos",
  {
    //Columnas de la tabla
    //idvehiculo PK
    idvehiculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    //idtipovehiculo FK
    idtipovehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "idtipovehiculo",
    },

    //modelo STRING
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    //color STRING
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    //matricula CHAR
    matricula: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      unique: true,
    },

    //Año de fabricacion YEAR
    anio_fabricacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900, //El primer automóvil fue inventado en 1886
        max: new Date().getFullYear(), //El año actual
      },
    },

    //idmarca FK
    idmarca: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    //Configuracion del modelo
    tableName: "vehiculos",
    timestamps: false,
  },
);

//Definir las relaciones entre tablas
marcasModel.hasMany(sequelize.models.Vehiculos, {
  foreignKey: "idmarca",
  as: "vehiculos",
});
vehiculosModel.belongsTo(sequelize.models.marcas, {
  foreignKey: "idmarca",
  as: "marca",
});
TVModels.hasMany(sequelize.models.Vehiculos, {
  foreignKey: "idtipovehiculo",
  as: "vehiculos",
});
vehiculosModel.belongsTo(sequelize.models.TipoVehiculos, {
  foreignKey: "idtipovehiculo",
  as: "tipoVehiculo",
});

export { marcasModel, TVModels, vehiculosModel, sequelize };
