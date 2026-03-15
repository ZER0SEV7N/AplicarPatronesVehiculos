//frontendnext/src/types/index.ts
//Archivo para definir los tipos de datos e interfaces utilizadas en la aplicación
export interface Marca {
    idmarca: number;
    nombre: string;
}

export interface TipoVehiculo {
    idtipovehiculo: number;
    nombre: string;
}

export interface Vehiculo {
    idvehiculo?: number;
    idtv: number;
    modelo: string;
    color: string;
    matricula: string;
    anio_fabricacion: number;
    idmarca: number;
    estado?: 'Disponible' | 'En Reparacion' | 'Vendido' | 'Inactivo';
    
    tipo_vehiculo?: string;
    marca?: string;
}