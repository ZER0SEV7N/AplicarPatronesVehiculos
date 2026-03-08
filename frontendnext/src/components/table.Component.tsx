//frontendVite/src/Component/table.Component.jsx
//Componente con la tabla de listado de vehiculos, elementos ya definidos.
import React from 'react'
import { Vehiculo } from '../types';

//Definir los props
interface tableComponentProps {
    data: Vehiculo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onChangeStatus: (vehiculo: Vehiculo) => void;
}

const TableComponent = ({ data, onEdit, onDelete, onChangeStatus }: tableComponentProps) => {
    return ( 
        <div className='table-responsive'>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo Vehiculo</th>
                        <th>Modelo</th>
                        <th>Color</th>
                        <th>Matricula</th>
                        <th>Año fabricacion</th>
                        <th>Marca </th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center py-4">
                                No se encontraron vehículos o hubo un error al cargar.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            
                            <tr key={item.idvehiculo}>
                                <td>{item.idvehiculo}</td>
                                <td>{item.tipo_vehiculo ||  "No establecido"}</td>
                                <td>{item.modelo}</td>
                                <td>{item.color}</td>
                                <td>{item.matricula}</td>
                                <td>{item.anio_fabricacion}</td>
                                <td>{item.marca || "No establecida"}</td>
                                <td>{item.estado}</td>
                                <td>
                                    <button 
                                     className="btn btn-primary btn-sm me-2" 
                                     onClick={() => onEdit(item.idvehiculo!)}>
                                        <i className="bi bi-pencil"></i>Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.idvehiculo!)}>
                                        <i className="bi bi-trash"></i>Eliminar
                                    </button>
                                    <button className='btn btn-warning btn-sm' onClick={() => onChangeStatus(item)}>
                                        <i className="bi bi-arrow-repeat"></i> Cambiar Estado
                                    </button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent;