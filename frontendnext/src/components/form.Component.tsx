//frontendNext/src/components/form.Component.tsx
//Componente para la vista del formulario de creacion/edicion de vehiculos
import React from "react";
import { Marca, TipoVehiculo } from "@/src/types";

interface FormComponentProps {
    formData: any;
    marcas: Marca[];
    tiposVehiculo: TipoVehiculo[];
    isEditMode: boolean;
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onCancel: () => void;
}

const FormComponent = ({ formData, marcas, tiposVehiculo, isEditMode, onSubmit, onChange, onCancel }: FormComponentProps) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                <h2 className="card-title m-0 h5">
                    {isEditMode ? "Editar Vehiculo" : "Crear Nuevo Vehiculo"}
                </h2>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                {/* Campos del formulario */}
                    <div className="mb-3">
                        <label htmlFor="idtv" className="form-label">Tipo de Vehiculo</label>
                        <select
                            id="idtv"
                            name="idtv"
                            className="form-control"
                            value={formData.idtv}
                            onChange={onChange}
                            required disabled={isEditMode} 
                        >
                            <option value="">Seleccionar tipo</option>
                            {tiposVehiculo.map((tipo) => (
                                <option key={tipo.idtipovehiculo} value={tipo.idtipovehiculo}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="modelo" className="form-label">Modelo</label>
                        <input
                            type="text"
                            id="modelo"
                            name="modelo"
                            className="form-control"
                            value={formData.modelo}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            className="form-control"
                            value={formData.color}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="matricula" className="form-label">Matricula</label>
                        <input
                            type="text"
                            id="matricula"
                            name="matricula"
                            className="form-control"
                            value={formData.matricula}
                            onChange={onChange}
                            required
                            minLength={7}
                            maxLength={7}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="anio_fabricacion" className="form-label">Año de Fabricacion</label>
                        <input
                            type="number"
                            id="anio_fabricacion"
                            name="anio_fabricacion"
                            className="form-control"
                            value={formData.anio_fabricacion}
                            onChange={onChange}
                            required
                            min={1900}
                            max={new Date().getFullYear()}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idmarca" className="form-label">Marca</label>
                        <select
                            id="idmarca"
                            name="idmarca"
                            className="form-control"
                            value={formData.idmarca}
                            onChange={onChange}
                            required
                        >
                            <option value="">Seleccionar marca</option>
                            {marcas.map((marca) => (
                                <option key={marca.idmarca} value={marca.idmarca}>
                                    {marca.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select
                            id="estado"
                            name="estado"
                            className="form-control"
                            value={formData.estado}
                            onChange={onChange}
                            required
                        >
                            <option value="">Seleccionar estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="En Reparacion">En Reparacion</option>
                            <option value="Vendido">Vendido</option>
                            <option value="No Disponible">No Disponible</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEditMode ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormComponent;