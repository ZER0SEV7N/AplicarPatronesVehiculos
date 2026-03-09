-- Crear la base de datos
DROP DATABASE IF EXISTS VehiculosDB;
CREATE DATABASE IF NOT EXISTS VehiculosDB;

-- Usar la base de datos
use VehiculosDB;

-- Crear la tabla de Marcas
CREATE TABLE marcas (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de tipos de vehiculos
CREATE TABLE tipos_vehiculos (
    idtipovehiculo INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de vehiculos (terrestres)
CREATE TABLE vehiculos (
    idvehiculo INT AUTO_INCREMENT PRIMARY KEY,
    idtipovehiculo INT NOT NULL,
    modelo CHAR(30) NOT NULL,
    color CHAR(20) NOT NULL,
    matricula CHAR(7) UNIQUE CHECK (LENGTH(matricula) <= 7),
    anio_fabricacion YEAR NOT NULL CHECK (anio_fabricacion > 1900 AND anio_fabricacion <= 2100),
    idmarca INT NOT NULL,
    estado ENUM('Disponible', 'En Reparacion', 'Vendido', 'Inactivo') DEFAULT 'Disponible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idmarca) REFERENCES marcas(idmarca),
    FOREIGN KEY (idtipovehiculo) REFERENCES tipos_vehiculos(idtipovehiculo)
);

-- Insertar datos en la tabla de marcas
INSERT marcas VALUES
(NULL, 'Toyota', DEFAULT),
(NULL, 'Honda', DEFAULT),
(NULL, 'Ford', DEFAULT),
(NULL, 'Chevrolet', DEFAULT),
(NULL, 'BMW', DEFAULT),
(NULL, 'Mercedes-Benz', DEFAULT),
(NULL, 'Audi', DEFAULT),
(NULL, 'Volkswagen', DEFAULT),
(NULL, 'Nissan', DEFAULT),
(NULL, 'Porsche', DEFAULT),
(NULL, 'Kia', DEFAULT),
(NULL, 'Hyundai', DEFAULT),
(NULL, 'Mazda', DEFAULT);

-- Insertar datos en la tabla de tipos de vehiculos
INSERT tipos_vehiculos VALUES
(NULL, 'Automovil', DEFAULT),
(NULL, 'Motocicleta', DEFAULT),
(NULL, 'Camioneta', DEFAULT),
(NULL, 'Camion', DEFAULT),
(NULL, 'SUV', DEFAULT),
(NULL, 'Sedan', DEFAULT),
(NULL, 'Todo Terreno', DEFAULT);
