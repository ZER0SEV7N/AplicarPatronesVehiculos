//frontendnext/src/app/page.tsx
//Pagina principal, Dashboard con resumen de vehiculos, acceso a tablas y graficos
//Haciendo uso de shadcn
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDashboardData from "@/src/hooks/dashboard.Hooks";
import StatsCard from "@/src/components/statsCard.Component";
import { Car, CheckCircle, XCircle, BarChart3, Hammer, Receipt, PieChart as PieChartIcon } from "lucide-react";
//Importar componentes para los graficos
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//Definir la constante de colores para los graficos
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8",  "#a4de6c", "#8dd1e1", "#ff0000", "#ed57db", "#e9602e"];

export default function Home() {
  //Calcular el porcentaje de cada estado para mostrar en la descripción de las tarjetas
  const calcularPorcentaje = (valor:number) => {
    if(totalVehiculos ===0 ) return "0%";
    return `${((valor / totalVehiculos) * 100).toFixed(1)}% del inventario`;
  }
  
  //Obtener los datos del dashboard usando el hook personalizado
  const { totalVehiculos, 
    vehiculosActivos, 
    vehiculosInactivos, 
    vehiculosReparacion, 
    vehiculosVendidos,
    marcasMasPopulares, 
    tiposMasPopulares,
    ultimoCreado,
    ultimoActualizado } = useDashboardData(); 
  return (  
    <div className="p-8 space-y-8 mt-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard General</h1>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard 
          titulo="Total de Vehiculos" 
          descripcion="En inventario" 
          valor={totalVehiculos || 0} 
          icono={Car} 
          color="text-blue-500"
          claseBorde="shadow-blue-500/20 hover:shadow-blue-500/40"
        />
        <StatsCard 
          titulo="Vehiculos Activos" 
          descripcion={calcularPorcentaje(vehiculosActivos)} 
          valor={vehiculosActivos || 0} 
          icono={CheckCircle} 
          color="text-green-500"
          claseBorde="shadow-green-500/20 hover:shadow-green-500/40"
        />
        <StatsCard 
          titulo="Inactivos" 
          descripcion={calcularPorcentaje(vehiculosInactivos)} 
          valor={vehiculosInactivos || 0} 
          icono={XCircle} 
          color="text-red-500"
          claseBorde="shadow-red-500/20 hover:shadow-red-500/40"
        />
        <StatsCard 
          titulo="En Mantenimiento" 
          descripcion={calcularPorcentaje(vehiculosReparacion)} 
          valor={vehiculosReparacion || 0} 
          icono={Hammer} 
          color="text-yellow-500"
          claseBorde="shadow-yellow-500/20 hover:shadow-yellow-500/40"
        />
        <StatsCard 
          titulo="Vendidos" 
          descripcion={calcularPorcentaje(vehiculosVendidos)} 
          valor={vehiculosVendidos || 0} 
          icono={Receipt} 
          color="text-purple-500"
          claseBorde="shadow-purple-500/20 hover:shadow-purple-500/40"
        />
      </div>

      {/* Sección de Últimos Movimientos */}
      <div className="grid grid-cols 1 md:grid-cols-2 gap-6">
        
        {/* Último Vehículo Creado */}
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex">
              <Car className="h-5 w-5 mr-2 text-green-500" />
              Último Vehículo Creado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {ultimoCreado ? (
              <div>
                <p className="font-semibold text-lg text-foreground">{ultimoCreado.marca} {ultimoCreado.modelo}</p>
                <p className="text-xs mt-1">Registrado el: {new Date(ultimoCreado.created_at).toLocaleString('es-PE')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Matrícula: <span className="font-medium text-foreground">{ultimoCreado.matricula}</span> - Tipo: {ultimoCreado.tipo_vehiculo}
                </p>
                <p className="text-xs mt-1">Estado: <span className="font-medium text-foreground">{ultimoCreado.estado}</span></p>
              </div>
            ) : (
              <p className="text-muted-foreground">No hay vehículos creados recientemente.</p>
            )}
          </CardContent>
        </Card>

        {/* Último Vehículo Actualizado */}
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex">
              <Car className="h-5 w-5 mr-2 text-blue-500" />
              Último Vehículo Actualizado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {ultimoActualizado ? (
              <div>
                <p className="font-semibold text-lg text-foreground">{ultimoActualizado.marca} {ultimoActualizado.modelo}</p>
                <p className="text-xs mt-1">Actualizado el: {new Date(ultimoActualizado.updated_at).toLocaleString('es-PE')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Matrícula: <span className="font-medium text-foreground">{ultimoActualizado.matricula}</span> - Tipo: {ultimoActualizado.tipo_vehiculo}
                </p>
                <p className="text-xs mt-1">Estado: <span className="font-medium text-foreground">{ultimoActualizado.estado}</span></p>
              </div>
            ) : (
              <p className="text-muted-foreground">No hay vehículos actualizados recientemente.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sección de Gráficos a 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico 1: Barras */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base font-medium">Marcas más populares</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
               data={marcasMasPopulares} 
               id="grafico-marcas">
                <CartesianGrid 
                 strokeDasharray="3 3" vertical={false} />
                <XAxis 
                 dataKey="marca" 
                 stroke="#888888" 
                 fontSize={12} 
                 tickLine={false} 
                 axisLine={false} 
                 interval={0}
                 angle={45}
                 textAnchor="start"
                 height={80}
                />
                <YAxis 
                 stroke="#888888" 
                 fontSize={12} 
                 tickLine={false} 
                 axisLine={false} 
                />
                <Tooltip 
                 cursor={{ fill: "var(--muted)" }} 
                 contentStyle={{ borderRadius: "8px" }} 
                />
                <Bar 
                 dataKey="total_vehiculos" 
                 radius={[4, 4, 0, 0]} 
                 name="Vehículos"
                >
                  {marcasMasPopulares?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico 2: Dona */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base font-medium">Distribución por Tipo</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="grafico-tipos">
                <Pie
                  data={tiposMasPopulares}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="total_vehiculos" 
                  nameKey="tipo_vehiculo"   
                  label
                >
                  {tiposMasPopulares?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}