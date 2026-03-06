//backend/src/controller/marcas.controller.js
import BaseController from "./base.Controller.js";
export default class MarcasController extends BaseController {
    constructor(marcasRepo) {
        super(marcasRepo)
    }

    //Metodo para obtener el resumen de marcas
    async resumenMarcas(req, res) {
        try {
            const resumen = await this.controller.resumenMarcas();
            res.status(200).json(resumen);
        }catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}