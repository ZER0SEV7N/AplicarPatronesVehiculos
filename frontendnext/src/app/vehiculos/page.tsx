//frontendnext/src/app/vehiculos/page.tsx
//Archivo principal para la vista de las tablas de vehiculos, 
//punto de entrada para la interfaz de usuario, 
//redirecciona al formulario de creacion/edicion,
//Filtra los vehiculos por tipo, marca, modelo, color y matricula
"use client";
import React, {useState, useEffect} from "react";
import api from "@/src/lib/config";
import { useRouter } from "next/navigation";
import { Vehiculo, Marca, TipoVehiculo } from "@/src/types";
import TableModule from "@/src/util/table.Module";
import FilterModule from "@/src/util/filter.module";

export default function VehiculosPage() {
    const router = useRouter();
    
    //Estados
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [tiposVehiculo, setTiposVehiculo] = useState<TipoVehiculo[]>([]);
    const filtrosIniciales = {idtv: "",
        idmarca: "",
        modelo: "",
        color: "",
        matricula: ""};
    const [filtros, setFiltros] = useState(filtrosIniciales);

    //Cargar datos a los selects y tabla al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try{
                const [ marcasRes, tiposRes] = await Promise.all([
                    api.get("/marcas"),
                    api.get("/tipos-vehiculo")
                ]);
                setMarcas(marcasRes.data);
                setTiposVehiculo(tiposRes.data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        cargarDatos();
    }, []);

   //Cargar la tabla de vehiculos cada vez que cambien los filtros
   useEffect(() => {
        const cargarVehiculos = async () => {
            try{
                const res = await api.get("/vehiculos", { params: filtros });
                setVehiculos(res.data);
            }catch (error) {
                console.error("Error al cargar los vehiculos:", error);
            }
        };

        //Definir un timeout
        const timeoutId = setTimeout(() => {
            cargarVehiculos();
            }, 500); //Esperar 500ms después del último cambio en los filtros
            return () => clearTimeout(timeoutId); //Limpiar el timeout si los filtros cambian antes de los 500ms
    }, [filtros]);

    //Funcion para manejar los cambios en los filtros
    const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            [name]: value,
        }));
    };

    //Funcion para eliminar un vehiculo
    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este vehiculo?")){
            try {
                await api.delete(`/vehiculos/${id}`);
                setVehiculos((prevVehiculos) => prevVehiculos.filter((v) => v.idvehiculo !== id));
                alert("Vehiculo eliminado exitosamente");
            }
            catch (error) {
                console.error("Error al eliminar el vehiculo:", error);
                alert("Error al eliminar el vehiculo. Por favor, intenta nuevamente.");
            }
        }
    };

    //Funcion para cambiar el estado de un vehiculo
    const handleStatusChange = async (id: number, nuevoEstado: string) => {}

    return (
        <div className="container" style={{ marginTop: "120px"}}>
            <div className="row">
            {/* Filtros */}
                <div className="col-lg-3 col-md-4 mb-4">
                    <FilterModule
                        filtros={filtros}
                        marcas={marcas}
                        tiposVehiculo={tiposVehiculo}
                        onChange={handleFiltroChange}
                        onReset={() => setFiltros(filtrosIniciales)}
                        onAddNew={() => router.push("/vehiculos/form")}
                     />
                </div>
                
                {/* Tabla de vehiculos */}
                <div className="col-lg-9 col-md-8">
                    <TableModule
                        data={vehiculos}
                        onEdit={(id) => router.push(`/vehiculos/form?id=${id}`)}
                        onDelete={handleDelete}
                        onChangeStatus={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    )
}