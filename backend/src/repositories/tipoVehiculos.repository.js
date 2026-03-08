//backend/src/repositories/tipoVehiculos.repository.js
import BaseRepos from "./base.repository.js";
export default class TVRepos extends BaseRepos {
    constructor(TVModels) {
        super(TVModels);
    }
    //Metodo que llama al procedimiento almacenado para el resumen de tipos de vehiculos
    async resumenTiposVehiculos() {
        const results = await this.model.sequelize.query("CALL SP_Resumen_Tipos()");
        return results;
    }
}