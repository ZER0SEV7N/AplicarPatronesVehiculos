//frontendNext/src/hooks/dashboard.Hooks.tsx
//Archivo para el dashboard, mostrando estadisticas generales de vehiculos
import React, {useState, useEffect} from "react";
import api from "../lib/config";

const useDashboardData = () => {
    //Estados para las estadísticas
    const [totalVehiculos, setTotalVehiculos] = useState(0);
    const [vehiculosActivos, setVehiculosActivos] = useState(0);
    const [vehiculosInactivos, setVehiculosInactivos] = useState(0);
    const [vehiculosReparacion, setVehiculosReparacion] = useState(0);
    const [vehiculosVendidos, setVehiculosVendidos] = useState(0);

    //Estado para los temporales
    const [ultimoCreado, setUltimoCreado] = useState<any>(null);
    const [ultimoActualizado, setUltimoActualizado] = useState<any>(null);

    //Estados para los gráficos
    const [marcasMasPopulares, setMarcasMasPopulares] = useState<{marca: string, total_vehiculos: number}[]>([]);
    const [tiposMasPopulares, setTiposMasPopulares] = useState<{tipo_vehiculo: string, total_vehiculos: number}[]>([]);

    //Cargar datos al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try{
                //Llamar al endpoint del dashboard para obtener todas las estadísticas
                const res = await api.get("/dashboard/resumen");
                const dashboardData = res.data;
                //Montar los estados con los datos obtenidos
                setTotalVehiculos(dashboardData.estadisticas.totales.total_vehiculos || 0);
                setVehiculosActivos(dashboardData.estadisticas.totales.Disponibles || 0);
                setVehiculosInactivos(dashboardData.estadisticas.totales.Inactivos || 0);
                setVehiculosReparacion(dashboardData.estadisticas.totales.Reparacion || 0);
                setVehiculosVendidos(dashboardData.estadisticas.totales.Vendidos || 0);
                setUltimoCreado(dashboardData?.estadisticas?.ultimoInsertado || null);
                setUltimoActualizado(dashboardData?.estadisticas?.ultimoActualizado || null);

                //Procesar los datos para los gráficos, asegurando que sean arrays
                const marcasData = dashboardData?.datosGraficos?.graficoMarcas;
                setMarcasMasPopulares(Array.isArray(marcasData) ? marcasData : (marcasData ? [marcasData] : []));                
                const tiposData = dashboardData?.datosGraficos?.graficoTipos;
                setTiposMasPopulares(Array.isArray(tiposData) ? tiposData : (tiposData ? [tiposData] : []));
            } catch (error) {
                console.error("Error al cargar las estadísticas:", error);
            }
        };
        cargarDatos();
    }, []);

    return {
        totalVehiculos,
        vehiculosActivos,
        vehiculosInactivos,
        vehiculosReparacion,
        vehiculosVendidos,
        marcasMasPopulares,
        tiposMasPopulares,
        ultimoCreado,
        ultimoActualizado
    };
}

export default useDashboardData;