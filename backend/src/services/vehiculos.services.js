//backend/src/services/vehiculos.services.js
//Clase para manejar la logica de negocio de los vehiculos. Previo al controlador
import VehiculosRepos from "../repositories/vehiculos.repository.js";

export default class VehiculosServices {
    constructor(vehiculosRepos, tipoVehiculosRepos, marcasRepos) {
        this.vehiculosRepos = vehiculosRepos;
        this.tipoVehiculosRepos = tipoVehiculosRepos;
        this.marcasRepos = marcasRepos;
    }

    //Validaciones previas a la creación o actualización de un vehiculo
    async validarMarca(idmarca) {
        if (!idmarca) throw new Error('La marca es obligatoria');
        const marca = await this.marcasRepos.getById(idmarca);
        if (!marca) throw new Error('La marca no existe');
    }

    async validarTipoVehiculo(idtv) {
        if (!idtv) throw new Error('El tipo de vehiculo es obligatorio');
        const tipoVehiculo = await this.tipoVehiculosRepos.getById(idtv);
        if (!tipoVehiculo) throw new Error('El tipo de vehiculo no existe');
    }

    async validarVehiculo(idvehiculo) {
        if (!idvehiculo) throw new Error('El id del vehiculo es obligatorio');
        const vehiculo = await this.vehiculosRepos.getById(idvehiculo);
        if (!vehiculo) throw new Error('El vehiculo no existe');
    }


    //Crear un nuevo vehiculo
    async crearVehiculo(data) {
        //Validaciones previas
        await this.validarMarca(data.idmarca);
        await this.validarTipoVehiculo(data.idtv);
        //Crear el nuevo vehiculo
        return this.vehiculosRepos.create(data);
    }

    //Actualizar un vehiculo
    async actualizarVehiculo(id, data) {
        //Validar que el vehiculo existe
        await this.validarVehiculo(id);
        //Validaciones previas
        await this.validarMarca(data.idmarca);
        //Actualizar el vehiculo
        return this.vehiculosRepos.update(id, data);
    }

    //Filtrar vehiculos por diferentes criterios
    async filtrarVehiculos(criterios) {
        return this.vehiculosRepos.filter(criterios);
    }

    //Eliminar un vehiculo
    async eliminarVehiculo(id) {
        await this.validarVehiculo(id);
        return this.vehiculosRepos.delete(id);
    }
}
