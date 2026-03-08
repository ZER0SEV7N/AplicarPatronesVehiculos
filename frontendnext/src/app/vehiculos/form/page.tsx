//frontendnext/src/app/vehiculos/page.tsx
//Archivo para el formulario de creacion/edicion de vehiculos
"use client";
import FormComponent from "@/src/hooks/form.Hooks";
import api from "@/src/lib/config";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Vehiculo } from "@/src/types";

export default function formPage(){
    const searchParams = useSearchParams();
    const id = searchParams.get("id")

    const [vehiculo, setVehiculo] = useState<Vehiculo | undefined>(undefined);
    
    //Cargar datos del vehiculo al editar
    useEffect(() => {
        if(id){
            //Si hay un id en los parametros, cargar el vehiculo para editar
            api.get(`vehiculos/${id}`).then((response) => {
                setVehiculo(response.data);
            })
            .catch((error) => {
                console.error("Error al cargar el vehiculo:", error);
                alert("Error al cargar el vehiculo. Por favor, intenta nuevamente.");
            });
        }
    }, [id]);

    return (
        <div className="container">
            <FormComponent vehiculo={vehiculo} />
        </div>
    );
}