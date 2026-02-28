//backend/src/controller/marcas.controller.js
export default class MarcasController {
    constructor(marcasRepos) {
        this.marcasRepos = marcasRepos;
    }

    //Obtener todas las marcas
    async obtenerMarcas(req, res){
        try {
            const marcas = await this.marcasRepos.getAll();
            res.status(200).json(marcas);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Obtener una marca por id
    async obtenerMarcaPorId(req, res){
        try {
            const marca = await this.marcasRepos.getById(req.params.id);
            if (!marca) return res.status(404).json({ error: 'Marca no encontrada' });
            res.status(200).json(marca);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }   
}