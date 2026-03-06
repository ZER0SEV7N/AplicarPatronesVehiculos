import BaseController from "./base.Controller.js";

//backend/src/controller/vehiculos.controller.js
export default class VehiculosController extends BaseController{
    constructor(vehiculosService, vehiculosRepo) {
        super(vehiculosRepo);
        this.vehiculosService = vehiculosService;
    }

    //Crear vehiculo
    crearVehiculo = async (req, res) => {
        try {
            const vehiculo = await this.vehiculosService.crearVehiculo(req.body);
            res.status(201).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Actualizar vehiculo
    actualizarVehiculo = async (req, res) => {
        try {
            const vehiculo = await this.vehiculosService.actualizarVehiculo(req.params.id, req.body);
            res.status(200).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //filtrar vehiculos
    filtrarVehiculos = async (req, res) => {
        try {
            const vehiculos = await this.vehiculosService.filtrarVehiculos(req.query);
            res.status(200).json(vehiculos[0] || []); 
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Eliminar vehiculo
    eliminarVehiculo = async (req, res) => {
        try {
            await this.vehiculosService.eliminarVehiculo(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Cambiar estado de un vehiculo
    cambiarEstado = async (req, res) => {
        try{
            const { id }  = req.params;
            const { nuevoEstado } = req.body;
            const vehiculo = await this.vehiculosService.cambiarEstado(id, nuevoEstado);
            res.status(200).json({
                message: 'Estado del vehiculo actualizado correctamente',
                data: vehiculo
            });
        }catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Metodo para obtener el resumen de vehiculos para el dashboard
    resumenVehiculos = async (req, res) => {
        try {
            const resumen = await this.vehiculosService.getResumenCompleto();
            res.status(200).json(resumen);
        }catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}