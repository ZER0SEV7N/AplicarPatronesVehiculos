//backend/src/controller/tipoVehiculos.controller.js
import BaseController from "./base.Controller.js";
export default class TipoVehiculosController extends BaseController{
    constructor(TVRepos) {
        super(TVRepos)
    }

    //Metodo para obtener el resumen de tipos de vehiculos
    async resumenTiposVehiculos(req, res) {
        try {
            const resumen = await this.controller.resumenTiposVehiculos();
            res.status(200).json(resumen);
        }catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}