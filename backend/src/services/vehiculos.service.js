//backend/src/services/vehiculos.services.js
//Clase para manejar la logica de negocio de los vehiculos. Previo al controlador

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

    async validarMatricula(matricula) {
        if (!matricula) throw new Error('La matricula es obligatoria');
        if (matricula.length > 7) throw new Error('La matricula no puede tener más de 7 caracteres');
    }

    async validarAnioFabricacion(anio_fabricacion) {
        if (!anio_fabricacion) throw new Error('El año de fabricación es obligatorio');
        const anioActual = new Date().getFullYear();
        if (anio_fabricacion < 1900 || anio_fabricacion > anioActual) throw new Error('El año de fabricación debe ser entre 1900 y el año actual');
    }

    async validarEstado(estado) {
        const estadosValidos = ['Disponible', 'En Reparacion', 'Inactivo', 'Vendido'];
        if (!estado) throw new Error('El estado es obligatorio');
        if (!estadosValidos.includes(estado)) throw new Error(`El estado debe ser uno de los siguientes: ${estadosValidos.join(', ')}`);
    }

    //Crear un nuevo vehiculo
    async crearVehiculo(data) {
        //Validaciones previas
        await this.validarTipoVehiculo(data.idtv);
        await this.validarMarca(data.idmarca);
        await this.validarMatricula(data.matricula);
        await this.validarAnioFabricacion(data.anio_fabricacion);
        await this.validarEstado(data.estado);
        //Crear el nuevo vehiculo
        return this.vehiculosRepos.create(data);
    }

    //Actualizar un vehiculo
    async actualizarVehiculo(id, data) {
        //Validar que el vehiculo existe
        await this.validarVehiculo(id);
        //Validaciones previas
        await this.validarMarca(data.idmarca);
        await this.validarAnioFabricacion(data.anio_fabricacion);
        await this.validarEstado(data.estado);

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

    //Cambiar el estado de un vehiculo
    async cambiarEstado(id, nuevoEstado) {
        //Validar que el vehiculo existe
        await this.validarVehiculo(id);
        await this.validarEstado(nuevoEstado);
        return this.vehiculosRepos.cambiarEstado(id, nuevoEstado);
    }

    //Metodo para obtener el resumen de vehiculos para el dashboard
    async getResumenVehiculo() {
        return this.vehiculosRepos.resumenVehiculos();
    }

    //Metodo para obtener el ultimo vehiculo creado
    async getUltimoCreado() {
        return this.vehiculosRepos.ultimoCreado();
    }

    //Metodo para obtener el ultimo vehiculo actualizado    
    async getUltimoActualizado() {
        return this.vehiculosRepos.ultimoActualizado();
    }
}
