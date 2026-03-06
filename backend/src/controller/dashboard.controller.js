//backend/src/services/dashboard.service.js
//Controlador para el dashboard
export default class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }

    //Obtener el resumen completo para el dashboard
    async getDashboardResumen(req, res){
        try{
            const data = await this.dashboardService.getDashboardResumen();
            res.status(200).json(data);
        }catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
