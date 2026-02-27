//backend/src/routes/routes.js
import express from 'express';
import VehiculosController from '../controller/vehiculos.controller.js';
import MarcasController from '../controller/marcas.controller.js';
import TipoVehiculosController from '../controller/tipoVehiculos.controller.js';

export default function createRoutes() {
    const router = express.Router();
    //Rutas para vehiculos
    router.post('/vehiculos', (req, res) => VehiculosController.crearVehiculo(req, res));
    router.param('/vehiculos/:id', (req, res) => VehiculosController.actualizarVehiculo(req, res));
    router.get('/vehiculos', (req, res) => VehiculosController.filtrarVehiculos(req, res));
    router.delete('/vehiculos/:id', (req, res) => VehiculosController.eliminarVehiculo(req, res));
    router.get('/vehiculos/:id', (req, res) => VehiculosController.obtenerVehiculoPorId(req, res));

    //Rutas para marcas
    router.get('/marcas', (req, res) => MarcasController.obtenerMarcas(req, res));
    router.get('/marcas/:id', (req, res) => MarcasController.obtenerMarcaPorId(req, res));

    //Rutas para tipos de vehiculos
    router.get('/tipos-vehiculos', (req, res) => TipoVehiculosController.obtenerTipoVehiculos(req, res));
    router.get('/tipos-vehiculos/:id', (req, res) => TipoVehiculosController.obtenerTipoVehiculoPorId(req, res));
}