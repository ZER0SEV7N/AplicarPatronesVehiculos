//backend/src/repositories/base.repository.js
//Clase base para usar en los repositorios
//Unicamente metodos comunes a todos los repositorios

export default class BaseRepos {
    constructor(model) {
        this.model = model;
    }

    //Metodo getAll (obtener todos los registros);
    async getAll() {
        return this.model.findAll();
    }

    //Metodo getById (obtener un registro por su id)
    async getById(id) {
        return this.model.findByPk(id);
    }

}

