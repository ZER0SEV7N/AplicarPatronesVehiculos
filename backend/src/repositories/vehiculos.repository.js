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
        const query = `CALL SP_Insertar_Vehiculo(?,?,?,?,?,?,?)`

        //Crear el nuevo vehiculo
        return this.model.sequelize.query(query, {
            replacements: [data.idtv, data.modelo, data.color, data.matricula, data.anio_fabricacion, data.idmarca, data.estado ]
        });
    }

    //Metodo para actualizar un vehiculo
    async update(id, data) {
        //Llamar al procedimiento almacenado para actualizar el vehiculo
        const query = `CALL SP_Actualizar_Vehiculo(?,?,?,?,?,?,?)`
        return this.model.sequelize.query(query, {
            replacements: [id, data.modelo, data.color, data.matricula, data.anio_fabricacion, data.idmarca, data.estado]
        });
    }

    //Metodo para filtrar vehiculos por diferentes criterios
    async filter(criterios) {
        const query = `CALL SP_Filtrar_Vehiculos(?,?,?,?,?)`
        return this.model.sequelize.query(query, {
            replacements: [
                criterios.modelo || null,
                criterios.color || null,
                criterios.matricula || null,
                criterios.idtv || null,
                criterios.idmarca || null
            ]
        });
    }

    //Metodo para eliminar un vehiculo
    async delete(id) {
        return this.model.destroy({ where: { idvehiculo: id } });
    }

    //Metodo para obtener el resumen de vehiculos
    async resumenVehiculos() {
        const [results] = await this.model.sequelize.query(`CALL SP_Resumen_Vehiculos()`);
        return results;
    }

    //Metodo para cambiar el estado de un vehiculo
    async cambiarEstado(id, nuevoEstado) {
        return this.model.sequelize.query(`CALL SP_Cambiar_Estado(?, ?)`, {
            replacements: [id, nuevoEstado]
        });
    }

    //Metodo para obtener el ultimo vehiculo creado
    async ultimoCreado() {
        const [results] = await this.model.sequelize.query(`CALL SP_Ultimo_Creado()`);
        return results[0]; 
    }

    //Metodo para obtener el ultimo vehiculo actualizado 
    async ultimoActualizado() {
        const [results] = await this.model.sequelize.query(`CALL SP_Ultimo_Actualizado()`);
        return results[0]; 
    }

    //Metodo para obtener las estidisticas del dashboard
    async estadisticasDashboard() {
        const [resumen] = await this.model.sequelize.query(`CALL SP_Resumen_Dashboard()`);
        return resumen[0]; 
    }
}