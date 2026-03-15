//frontendnext/src/util/status.module.tsx
//Modulo para un modal dedicado al cambio de estado de un vehiculo
import React, {useState} from 'react';
import { Vehiculo } from '../types';

interface ModalStatusProps {
    vehiculo: Vehiculo;
    onStatusChange: (id: number, nuevoEstado: string) => void;
    onClose: () => void;
    onConfirm: () => void;
}

const ModalStatus = ({ vehiculo, onStatusChange, onClose, onConfirm }: ModalStatusProps) => {
    const [nuevoEstado, setNuevoEstado] = useState(vehiculo?.estado || "");

    if(!vehiculo) return null; //Si no hay vehiculo, no mostrar el modal

    return(
        <div className='modal fade show d-block' style={{ background: 'rgba(0,0,0,0.5)'}}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Cambiar Estado del Vehiculo</h5>
                        <button type='button' className='btn-close' onClick={onClose}></button>
                    </div>
                    {/* Select para elegir el nuevo estado */}
                    <div className='modal-body'>
                        <label className='form-label'>Selecciona un estado</label>
                        <select className='form-select' value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                            <option value="Disponible">Disponible</option>
                            <option value="En Reparacion">En Reparacion</option>
                            <option value="Vendido">Vendido</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-secondary' onClick={onClose}>Cancelar</button>
                        <button className='btn btn-primary' onClick={() => {onStatusChange(vehiculo.idvehiculo!, nuevoEstado); onConfirm();}}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalStatus;