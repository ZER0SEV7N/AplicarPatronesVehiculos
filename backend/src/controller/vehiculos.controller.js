//backend/src/controller/vehiculos.controller.js
export default class VehiculosController {
    constructor(vehiculosServices) {
        this.vehiculosServices = vehiculosServices;
    }

    //Crear vehiculo
    async crearVehiculo(req, res){
        try {
            const vehiculo = await this.vehiculosServices.crearVehiculo(req.body);
            res.status(201).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Actualizar vehiculo
    async actualizarVehiculo(req, res){
        try {
            const vehiculo = await this.vehiculosServices.actualizarVehiculo(req.params.id, req.body);
            res.status(200).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //filtrar vehiculos
    async filtrarVehiculos(req, res){
        try {
            const vehiculos = await this.vehiculosServices.filtrarVehiculos(req.query);
            res.status(200).json(vehiculos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Eliminar vehiculo
    async eliminarVehiculo(req, res){
        try {
            await this.vehiculosServices.eliminarVehiculo(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Obtener un vehiculo por id
    async obtenerVehiculoPorId(req, res){
        try {
            const vehiculo = await this.vehiculosServices.obtenerVehiculoPorId(req.params.id);
            res.status(200).json(vehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Obtener todos los vehiculos   
    async obtenerTodosVehiculos(req, res){
        try {
            const vehiculos = await this.vehiculosServices.obtenerTodosVehiculos();
            res.status(200).json(vehiculos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}