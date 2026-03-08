//backend/src/repositories/marcas.repository.js
import BaseRepos from "./base.repository.js";
export default class MarcasRepos extends BaseRepos {
    constructor(marcasModel) {
        super(marcasModel);
    }

    //Metodo que llama al procedimiento almacenado para el resumen de marcas
    async resumenMarcas() {
        const results = await this.model.sequelize.query("CALL SP_Resumen_Marcas()");
        return results;
    }
}
