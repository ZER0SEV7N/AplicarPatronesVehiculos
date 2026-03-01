//backend/src/routes/routes.js
import express from 'express';
import {marcasModel, TVModels, vehiculosModel} from '../models/index.models.js';
import MarcasRepos from '../repositories/marcas.repository.js';
import TVRepos from '../repositories/tipoVehiculos.repository.js';
import VehiculosRepos from '../repositories/vehiculos.repository.js';
import VehiculosServices from '../services/vehiculos.services.js';
import VehiculosController from '../controller/vehiculos.controller.js';
import MarcasController from '../controller/marcas.controller.js';
import TipoVehiculosController from '../controller/tipoVehiculos.controller.js';

export default function ApiRutas() {
    const router = express.Router();

    //Definir las instancias de los controladores
    const marcasRepo = new MarcasRepos(marcasModel);
    const tvRepo = new TVRepos(TVModels);
    const vehiculosRepo = new VehiculosRepos(vehiculosModel, tvRepo, marcasRepo);

    const vehiculosServices = new VehiculosServices(vehiculosRepo, tvRepo, marcasRepo);

    const vehiculosController = new VehiculosController(vehiculosServices);
    const marcasController = new MarcasController(marcasRepo);
    const TVController = new TipoVehiculosController(tvRepo);

    //Rutas para vehiculos
    router.post('/vehiculos', (req, res) => vehiculosController.crearVehiculo(req, res));
    router.patch('/vehiculos/:id', (req, res) => vehiculosController.actualizarVehiculo(req, res));
    router.get('/vehiculos/', (req, res) => vehiculosController.filtrarVehiculos(req, res));
    router.delete('/vehiculos/:id', (req, res) => vehiculosController.eliminarVehiculo(req, res));
    router.get('/vehiculos/:id', (req, res) => vehiculosController.obtenerVehiculoPorId(req, res));

    //Rutas para marcas
    router.get('/marcas', (req, res) => marcasController.obtenerMarcas(req, res));
    router.get('/marcas/:id', (req, res) => marcasController.obtenerMarcaPorId(req, res));

    //Rutas para tipos de vehiculos
    router.get('/tipos-vehiculos', (req, res) => TVController.obtenerTipoVehiculos(req, res));
    router.get('/tipos-vehiculos/:id', (req, res) => TVController.obtenerTipoVehiculoPorId(req, res));

    return router;
}