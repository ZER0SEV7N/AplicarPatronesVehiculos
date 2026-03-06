//backend/src/controller/base.controller.js
//Clase base para utilizar en el resto de controladores
//Unicamente metodos comunes:

export default class BaseController {
    constructor(controller) {
        this.controller = controller;
    }
    
    //Metodo para obtener un elemento
    async getById(req, res){
        try{
            const objeto = await this.controller.getById(req.params.id)
            if(!objeto) return res.status(404).json({error: "No se encontró el elemento"})
            res.status(200).json(objeto)
        }catch (error) {
            res.status(400).json({ error: error.message})
        }
    }

    //Metodo para obtener todos los elementos
    async getAll(req, res){
        try{
            const objeto = await this.controller.getAll()
            res.status(200).json(objeto)
        }catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}