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
        //Ejecuta todas las consultas necesarias para obtener el resumen completo
        const [
            statsEstados,
            ultimoCreado,
            ultimoActualizado,
            graficoTipos,
            graficoMarcas
        ] = await Promise.all([
            this.vehiculosRepos.resumenVehiculos(),
            this.vehiculosRepos.ultimoCreado(),
            this.vehiculosRepos.ultimoActualizado(),
            this.TVRepos.resumenTiposVehiculos(),
            this.marcasRepos.resumenMarcas()
        ])
        //Retornar un Json con toda la informacion del dashboard
        return {
            tarjetaTotales: statsEstados, //Resumen de estados de vehiculos
            actividadReciente: {
                ultimoCreado: ultimoCreado, //Ultimo vehiculo creado
                ultimoActualizado: ultimoActualizado //Ultimo vehiculo actualizado
            },
            datosGraficos: {
                graficoTipos: graficoTipos, //Datos para el grafico de tipos de vehiculos
                graficoMarcas: graficoMarcas //Datos para el grafico de marcas
            }
        }
    }
}