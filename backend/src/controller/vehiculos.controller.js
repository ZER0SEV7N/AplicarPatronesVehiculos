import BaseController from "./base.Controller.js";

//backend/src/controller/vehiculos.controller.js
export default class VehiculosController extends BaseController{
    constructor(vehiculosService, vehiculosRepo) {
        super(vehiculosRepo);
        this.vehiculosService = vehiculosService;
    }

    //Crear vehiculo
    async crearVehiculo(req, res){
        try {
            const vehiculo = await this.vehiculosService.crearVehiculo(req.body);
            res.status(201).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Actualizar vehiculo
    async actualizarVehiculo(req, res){
        try {
            const vehiculo = await this.vehiculosService.actualizarVehiculo(req.params.id, req.body);
            res.status(200).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //filtrar vehiculos
    async filtrarVehiculos(req, res){
        try {
            const vehiculos = await this.vehiculosService.filtrarVehiculos(req.query);
            res.status(200).json(vehiculos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Eliminar vehiculo
    async eliminarVehiculo(req, res){
        try {
            await this.vehiculosService.eliminarVehiculo(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}