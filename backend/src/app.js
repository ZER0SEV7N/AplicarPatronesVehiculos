//backend/src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ApiRutas from './routes/routes.js';

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

app.listen(port, () => {
    console.log(`Servidor abierto en el puerto ${port}`);
});