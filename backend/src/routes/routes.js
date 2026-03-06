//backend/src/routes/routes.js
import express from 'express';
import {marcasModel, TVModels, vehiculosModel} from '../models/index.models.js';
import MarcasRepos from '../repositories/marcas.repository.js';
import TVRepos from '../repositories/tipoVehiculos.repository.js';
import VehiculosRepos from '../repositories/vehiculos.repository.js';
import VehiculosServices from '../services/vehiculos.service.js';
import DashboardService from '../services/dashboard.service.js';
import VehiculosController from '../controller/vehiculos.controller.js';
import MarcasController from '../controller/marcas.controller.js';
import TipoVehiculosController from '../controller/tipoVehiculos.controller.js';
import DashboardController from '../controller/dashboard.controller.js';

export default function ApiRutas() {
    const router = express.Router();

    //Definir las instancias de los controladores
    const marcasRepo = new MarcasRepos(marcasModel);
    const tvRepo = new TVRepos(TVModels);
    const vehiculosRepo = new VehiculosRepos(vehiculosModel, tvRepo, marcasRepo);

    const vehiculosServices = new VehiculosServices(vehiculosRepo, tvRepo, marcasRepo);
    const dashboardService = new DashboardService(vehiculosRepo, tvRepo, marcasRepo);

    const vehiculosController = new VehiculosController(vehiculosServices, vehiculosRepo);
    const marcasController = new MarcasController(marcasRepo);
    const TVController = new TipoVehiculosController(tvRepo);
    const dashboardController = new DashboardController(dashboardService);

    //Rutas para el dashboard
    router.get('/dashboard/resumen', (req, res) => dashboardController.getDashboardResumen(req, res));

    //Rutas de resumen
    router.get('/resumen/vehiculos', (req, res) => vehiculosController.resumenVehiculos(req, res));
    router.get('/resumen/marcas', (req, res) => marcasController.resumenMarcas(req, res));
    router.get('/resumen/tipos-vehiculos', (req, res) => TVController.resumenTiposVehiculos(req, res));

    //Rutas para vehiculos
    router.post('/vehiculos', (req, res) => vehiculosController.crearVehiculo(req, res));
    router.get('/vehiculos/', (req, res) => vehiculosController.filtrarVehiculos(req, res));
    router.patch('/vehiculos/:id', (req, res) => vehiculosController.actualizarVehiculo(req, res));
    router.delete('/vehiculos/:id', (req, res) => vehiculosController.eliminarVehiculo(req, res));
    router.get('/vehiculos/:id', (req, res) => vehiculosController.getById(req, res));
    router.patch('/vehiculos/:id/estado', (req, res) => vehiculosController.cambiarEstado(req, res));

    //Rutas para marcas
    router.get('/marcas', (req, res) => marcasController.getAll(req, res));
    router.get('/marcas/:id', (req, res) => marcasController.getById(req, res));    

    //Rutas para tipos de vehiculos
    router.get('/tipos-vehiculos', (req, res) => TVController.getAll(req, res));
    router.get('/tipos-vehiculos/:id', (req, res) => TVController.getById(req, res));

    return router;
}