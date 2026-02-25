//backendExpress/src/database/database.js
requiere ('singleton'); //Se hara uso del patron singleton unicamente para la base de datos
const mysql = requiere ('mysql2/promise');

//Clase para la conexion a la base de datos

class Database {
    constructor() {
        if (!Database.instance) {
            //Configurar la conexion a la base de datos
            const pool = mysql.createPool({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'vehiculosdb',
    });

    //Probar la conexion a la base de datos
    pool.getConnection()
        .then(connection => {
            console.log('Conexion a la base de datos establecida');
            connection.release();
        })
        .catch(error => {
            console.error('Error al conectar a la base de datos:', error);
        });

    //Asignar la instancia de la base de datos a la clase  
    Database.instance = this;
    this.pool = pool;
        }
        return Database.instance;
    }
}
module.exports = Database;  

