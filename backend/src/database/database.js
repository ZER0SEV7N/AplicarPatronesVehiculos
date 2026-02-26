//backend/src/database/database.js
import {Sequelize} from 'sequelize';

//Clase para la conexion a la base de datos
class Database {
  constructor() {
    //Si ya existe una instancia, la retornamos
    if (Database.instance) return Database.instance;

    //Configurar el pool de conexiones
    this.sequelize = new Sequelize(
      'vehiculos_db', //Nombre de la base de datos
      'root', //Usuario
      '', //Contraseña
      {
        host: 'localhost', //Host
        dialect: 'mysql', //Tipo de base de datos
        port: 3306, //Puerto
        pool: {
          max: 5, //Número máximo de conexiones
          min: 0, //Número mínimo de conexiones
          acquire: 30000, //Tiempo máximo de espera para obtener una conexión
          idle: 10000 //Tiempo máximo de inactividad antes de cerrar una conexión
        }
      }
    );

    //Guardar la instancia única
    Database.instance = this;
  }

  //Metodo para obtener la instancia
  static ObtenerInstancia() {
    if (!Database.instance) new Database();
    return Database.instance;
  }

  //Metodo para iniciar la conexión a la base de datos
  async conectar() {
    try {
      await this.sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error ) {
      console.error('No se pudo conectar a la base de datos:', error);
    }
  }

  //Metodo para cerrar la conexion a la base de datos
  async cerrar() {
    try {
      await this.sequelize.close();
      console.log('Conexion cerrada correctamente');
    } catch (error) {
      console.error('No se pudo cerrar la conexion a la base de datos:', error);
    }
  }
}

const dbInstance = new Database();
export default dbInstance;
