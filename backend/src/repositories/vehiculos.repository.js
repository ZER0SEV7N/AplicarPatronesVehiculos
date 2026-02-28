//backend/src/repositories/vehiculos.repository.js
import BaseRepos from "./base.repository.js";

export default class VehiculosRepos extends BaseRepos {
    constructor(vehiculosModel, TVRepos, MarcasRepos) {
        super(vehiculosModel);
        this.tvRepos = TVRepos;
        this.marcasRepos = MarcasRepos;
    }

    //Metodo para Crear un nuevo vehiculo
    async create(data) {
        //Llamar al procedimiento almacenado para insertar el nuevo vehiculo
        const query = `CALL SP_Insertar_Vehiculo(?,?,?,?,?,?)`

        //Crear el nuevo vehiculo
        return this.model.sequelize.query(query, {
            replacements: [data.idtv, data.modelo, data.color, data.matricula, data.anio_fabricacion, data.idmarca]
        });
    }

    //Metodo para actualizar un vehiculo
    async update(id, data) {
        //Llamar al procedimiento almacenado para actualizar el vehiculo
        const query = `CALL SP_Actualizar_Vehiculo(?,?,?,?,?,?)`
        return this.model.sequelize.query(query, {
            replacements: [id, data.modelo, data.color, data.matricula, data.anio_fabricacion, data.idmarca]
        });
    }

    //Metodo para filtrar vehiculos por diferentes criterios
    async filter(criterios) {
        const query = `CALL SP_Filtrar_Vehiculos(?,?,?,?,?)`
        return this.model.sequelize.query(query, {
            replacements: [
                criterios.modelo ?? null,
                criterios.color ?? null,
                criterios.matricula ?? null,
                criterios.tv ?? null,
                criterios.idmarca ?? null
            ]
        });
    }

    //Metodo para eliminar un vehiculo
    async delete(id) {
        //Validar que el vehiculo existe
        const vehiculo = await this.getById(id);
        if (!vehiculo) throw new Error('El vehiculo no existe');
        return this.model.destroy({ where: { idvehiculo: id } });
    }
}