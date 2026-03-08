//frontendnext/src/components/filter.Component.tsx
//Componente para el filtro de busqueda en el listado de vehiculos
import React from 'react';
import { Marca, TipoVehiculo } from '../types';

interface FilterComponentProps {
    filtros: {
        idtv: string;
        idmarca: string;
        modelo: string;
        color: string;
        matricula: string;
    };
    marcas: Marca[];
    tiposVehiculo: TipoVehiculo[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onReset: () => void;
    onAddNew: () => void;
}

const FilterComponent = ({ filtros, marcas, tiposVehiculo, onChange, onReset, onAddNew }: FilterComponentProps) => {
    return (
        <div className="card shadow-sm mb-4">
            <div className='card-header bg-dark text-white'>
                <h2 className='card-title m-0 h5'>Filtros de Busqueda</h2>
            </div>
            <div className='card-body'>
                <form>
                    <div className='mb-3'>
                        {/* Filtro por tipo de vehiculo */}
                        <label htmlFor='idtv' className='form-label'>Tipo de Vehiculo</label>
                        <select
                            id='idtv'
                            name='idtv'
                            className='form-control'
                            value={filtros.idtv}
                            onChange={onChange}
                        >   
                            <option value=''>Todos los tipos</option>
                            {tiposVehiculo.map((tipo) => (
                                <option key={tipo.idtipovehiculo} value={tipo.idtipovehiculo}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>

                        {/* Filtro por modelo */}
                        <div className='mb-3'>
                            <label htmlFor='modelo' className='form-label'>Modelo</label>
                            <input
                                type='text'
                                id='modelo'
                                name='modelo'
                                className='form-control'
                                value={filtros.modelo}
                                onChange={onChange}
                                placeholder='Buscar por modelo'
                            />
                        </div>

                        {/* Filtro por color */}
                        <div className='mb-3'>
                            <label htmlFor='color' className='form-label'>Color</label>
                            <input
                                type='text'
                                id='color'
                                name='color'
                                className='form-control'
                                value={filtros.color}
                                onChange={onChange}
                                placeholder='Buscar por color'
                            />
                        </div>

                        {/* Filtro por matricula */}
                        <div className='mb-3'>
                            <label htmlFor='matricula' className='form-label'>Matricula</label>
                            <input
                                type='text'
                                id='matricula'
                                name='matricula'
                                className='form-control'
                                value={filtros.matricula}
                                onChange={onChange}
                                placeholder='Buscar por matricula'
                            />
                        </div>

                        {/* Filtro por marca */}
                        <div className="mb-3">
                            <label htmlFor='idmarca' className='form-label'>Marca</label>
                            <select
                                id='idmarca'
                                name='idmarca'
                                className='form-control'
                                value={filtros.idmarca}
                                onChange={onChange}
                            >
                                <option value=''>Todas las marcas</option>
                                {marcas.map((marca) => (
                                    <option key={marca.idmarca} value={marca.idmarca}>
                                        {marca.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Botón para limpiar filtros */}
                        <div className='d-grid mt-4'>
                            <button type='button' onClick={onReset} className='btn btn-outline-secondary'>
                                <i className="bi bi-eraser"></i> Limpiar filtros
                            </button>
                        </div>

                        <hr />
                        {/* Botón para agregar nuevo vehículo */}
                        <div className='text-center mt-4'>
                            <label>¿No encuentras lo que buscas?</label>
                        </div>
                        <div className='d-grid mt-2'>
                            <button type='button' onClick={onAddNew} className='btn btn-primary'>
                                <i className="bi bi-plus-lg"></i> Agregar nuevo vehiculo
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterComponent;