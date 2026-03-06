//frontendVite/src/util/tableModule.jsx
//Componente para la tabla de datos
import React from 'react'
import { Vehiculo } from '../types';

//Definir los props
interface tableModuleProps {
    data: Vehiculo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onChangeStatus: (id: number, newStatus: 'Disponible' | 'en Reparacion' | 'Inactivo') => void;
}

const TableModule = ({ data, onEdit, onDelete, onChangeStatus }: tableModuleProps) => {
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
                            <td className='text-centes'> No Se encontraron vehiculos</td>
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
                                <td>{item.estado}</td>
                                <td>{item.marca || "No establecida"}</td>
                                <td>
                                    <button 
                                     className="btn btn-primary btn-sm me-2" 
                                     onClick={() => onEdit(item.idvehiculo!)}>
                                        <i className="bi bi-pencil"></i>Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.idvehiculo!)}>
                                        <i className="bi bi-trash"></i>Eliminar
                                    </button>
                                    <button className='btn btn-warning btn-sm' onClick={() => onChangeStatus(item.idvehiculo!, item.estado === 'Disponible' ? 'en Reparacion' : item.estado === 'en Reparacion' ? 'Inactivo' : 'Disponible')}>
                                        <i className="bi bi-exclamation-triangle"></i> Cambiar Estado
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

export default TableModule;