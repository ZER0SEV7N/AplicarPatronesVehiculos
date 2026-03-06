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
import ModalStatus from "@/src/util/status.module";

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
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<Vehiculo | null>(null);
    const [showModal, setShowModal] = useState(false);

    //Cargar datos a los selects y tabla al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try{
                const [ marcasRes, tiposRes] = await Promise.all([
                    api.get("/marcas"),
                    api.get("/tipos-vehiculos")
                ]);
                setMarcas(marcasRes.data);
                setTiposVehiculo(tiposRes.data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        cargarDatos();
    }, []);

    //Funcion para cargar los vehiculos segun los filtros
    const cargarVehiculos = async () => {
        try{
            const res = await api.get("/vehiculos", { params: filtros });
            console.log("Vehiculos cargados:", res.data);
            setVehiculos(res.data);
        }catch (error) {
            console.error("Error al cargar los vehiculos:", error);
        }
    };

   //Recargar los vehiculos cada vez que se actualicen los filtros
   useEffect(() => {
        //Definir un timeout
        const timeoutId = setTimeout(() => {
            cargarVehiculos();
            }, 500); //Esperar 500ms después del último cambio en los filtros
            return () => clearTimeout(timeoutId); 
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

    //Funcion para abrir el modal de cambio de estado
    const handleStatusChange = (vehiculo: Vehiculo) => {
        setVehiculoSeleccionado(vehiculo);
        setShowModal(true);
    };

    //Funcion para confirmar el cambio de estado en el modal
    const confirmarCambioEstado = async (id: number, nuevoEstado: string) => {
        try {
            await api.patch(`/vehiculos/${id}/estado`, { estado: nuevoEstado });
            setShowModal(false);
            cargarVehiculos(); 
        } catch (error) {
            console.error("Error al actualizar estado:", error);
        }
    };

    return (
        <div className="container" style={{ marginTop: "60px"}}>
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
            {/* Modal de cambio de estado */}
            {showModal && vehiculoSeleccionado && (
                <ModalStatus
                    vehiculo={vehiculoSeleccionado}
                    onStatusChange={confirmarCambioEstado}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => setShowModal(false)}
                />
            )}
        </div>
    )
}