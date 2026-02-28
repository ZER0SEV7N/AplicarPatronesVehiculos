//backend/src/controller/tipoVehiculos.controller.js
export default class TipoVehiculosController {
    constructor(tipoVehiculosRepos) {
        this.tipoVehiculosRepos = tipoVehiculosRepos;
    }
    //Obtener todos los tipos de vehiculos
    async obtenerTipoVehiculos(req, res){
        try {
            const tipoVehiculos = await this.tipoVehiculosRepos.getAll();
            res.status(200).json(tipoVehiculos);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    //Obtener un tipo de vehiculo por id
    async obtenerTipoVehiculoPorId(req, res){
        try {
            const tipoVehiculo = await this.tipoVehiculosRepos.getById(req.params.id);
            if (!tipoVehiculo) return res.status(404).json({ error: 'Tipo de vehiculo no encontrado' });
            res.status(200).json(tipoVehiculo);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}