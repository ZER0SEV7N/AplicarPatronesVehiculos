//backend/src/services/dashboard.service.js
//Servicio para el dashboard
export default class DashboardService {
    constructor(vehiculosRepos, TVRepos, MarcasRepos){
        this.vehiculosRepos = vehiculosRepos;
        this.TVRepos = TVRepos;
        this.marcasRepos = MarcasRepos;
    }

    //Metodo para obtener el resumen de vehiculos
    async getResumenCompleto(){
        try{
            //Ejecuta todas las consultas necesarias para obtener el resumen completo
            const [
                resumenDashboard, 
                ultimoCreado,
                ultimoActualizado,
                graficoTipos,
                graficoMarcas
            ] = await Promise.all([
                this.vehiculosRepos.estadisticasDashboard(),
                this.vehiculosRepos.ultimoCreado(),
                this.vehiculosRepos.ultimoActualizado(),
                this.TVRepos.resumenTiposVehiculos(),
                this.marcasRepos.resumenMarcas()
            ])
            //Retornar un Json con toda la informacion del dashboard
            return {
               estadisticas: {
                    totales: resumenDashboard, 
                    ultimoInsertado: ultimoCreado,
                    ultimoActualizado: ultimoActualizado
                },
                datosGraficos: {
                    graficoTipos: graficoTipos,
                    graficoMarcas: graficoMarcas
                }
            }
        } catch (error) {
            throw new Error("Error al obtener el resumen del dashboard");
        }
    }
}