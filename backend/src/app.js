//backend/src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ApiRutas from './routes/routes.js';
import dbInstance from './database/database.js';

//Inicializar el servidor
const app = express();
//Definir el puerto 
const port = process.env.PORT || 3000;

//Permitir solicitudes desde cualquier origen
app.use(cors({origin: '*'}));
//Permitir el uso de JSON en las solicitudes HTTP
app.use(express.json());
//Registrar las solicitudes HTTP en la consola
app.use(morgan('dev'));

const router = ApiRutas();
app.use('/api', router);
//http/localhost:3000/api/vehiculos

//Iniciar la conexion a la base de datos y luego iniciar el servidor
dbInstance.conectar()
.then(() => {
    app.listen(port, () => {
        console.log(`Servidor abierto en el puerto ${port}`);
    });
})
.catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1); //Salir del proceso con un código de error
});

//Manejar el cierre del servidor y la conexión a la base de datos
process.on('SIGINT', async () => {
    console.log('Cerrando el servidor y la conexión a la base de datos...');
    await dbInstance.cerrar();
    process.exit(0); //Salir del proceso con un código de éxito
});