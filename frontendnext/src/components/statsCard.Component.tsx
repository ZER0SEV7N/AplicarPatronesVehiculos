//Frontendnext/src/components/statsCard.Component.tsx
//Componente para mostrar estadisticas en el dashboard, reutilizable para diferentes tipos de datos
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

//Definir interface
interface StatsCardProps {
    titulo: string;
    descripcion?: string;
    valor: number | string;
    icono: LucideIcon;
    color?: string; 
    claseBorde?: string;
}

const StatsCard = ({ titulo, descripcion, valor, icono: Icono, color = "text-muted-foreground", claseBorde }: StatsCardProps) => {
    return (
        <Card className={`border bg-card transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${claseBorde}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {titulo}
                </CardTitle>
                <Icono className={`h-5 w-5 ${color}`}/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">
                    {valor}
                </div>
                {descripcion && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {descripcion} 
                    </p>
                )}

            </CardContent>
        </Card>
    )
};

export default StatsCard;