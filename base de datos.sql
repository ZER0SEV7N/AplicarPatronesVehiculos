-- Crear la base de datos
DROP DATABASE IF EXISTS VehiculosDB;
CREATE DATABASE IF NOT EXISTS VehiculosDB ;

-- Usar la base de datos
use VehiculosDB;

-- Crear la tabla de Marcas
CREATE TABLE marcas (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear la tabla de tipos de vehiculos
CREATE TABLE tipos_vehiculos (
    idtipovehiculo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

-- Crear la tabla de vehiculos (terrestres)
CREATE TABLE vehiculos (
    idvehiculo INT AUTO_INCREMENT PRIMARY KEY,
    idtipovehiculo INT NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    matricula CHAR(7) NOT NULL UNIQUE,
    anio_fabricacion YEAR NOT NULL,
    idmarca INT NOT NULL,
    FOREIGN KEY (idmarca) REFERENCES marcas(idmarca),
    FOREIGN KEY (idtipovehiculo) REFERENCES tipos_vehiculos(idtipovehiculo)
);

-- Insertar datos en la tabla de marcas
INSERT marcas VALUES
(NULL, 'Toyota'),
(NULL, 'Honda'),
(NULL, 'Ford'),
(NULL, 'Chevrolet'),
(NULL, 'BMW'),
(NULL, 'Mercedes-Benz'),
(NULL, 'Audi'),
(NULL, 'Volkswagen'),
(NULL, 'Nissan');

-- Insertar datos en la tabla de tipos de vehiculos
INSERT tipos_vehiculos VALUES
(NULL, 'Automovil'),
(NULL, 'Motocicleta'),
(NULL, 'Camioneta'),
(NULL, 'Camion'),
(NULL, 'SUV'),
(NULL, 'Sedan'),
(NULL, 'Todo Terreno');

-- Crear procedimiento almacenado para insertar un nuevo vehiculo
DELIMITER //
CREATE PROCEDURE SP_Insertar_Vehiculo(
    IN p_idtv INT,
    IN p_modelo VARCHAR(50),
    IN p_color VARCHAR(20),
    IN p_matricula CHAR(7),
    IN p_anio_fabricacion YEAR,
    IN p_idmarca INT
)
BEGIN
    INSERT vehiculos (idtipovehiculo, modelo, color, matricula, anio_fabricacion, idmarca)
    VALUES (
        p_idtv,
        p_modelo,
        p_color,
        p_matricula,
        p_anio_fabricacion,
        p_idmarca
    );
    SELECT COUNT(idvehiculo) AS "Total de Vehiculos : " FROM vehiculos;

END //
DELIMITER ;

-- Crear procedimiento almacenado para actualizar un vehiculo
DELIMITER //
CREATE PROCEDURE SP_Actualizar_Vehiculo(
    IN p_idvehiculo INT,
    IN p_modelo VARCHAR(50),
    IN p_color VARCHAR(20),
    IN p_matricula CHAR(7),
    IN p_anio_fabricacion YEAR,
    IN p_idmarca INT
)
BEGIN
    UPDATE vehiculos
    SET modelo = p_modelo,
        color = p_color,
        matricula = p_matricula,
        anio_fabricacion = p_anio_fabricacion,
        idmarca = p_idmarca
    WHERE idvehiculo = p_idvehiculo;

    SELECT p_idvehiculo AS "ID del Vehiculo Actualizado", modelo, color, matricula, anio_fabricacion, (SELECT nombre FROM marcas WHERE idmarca = p_idmarca) AS marca
    FROM vehiculos
    WHERE idvehiculo = p_idvehiculo;
END //
DELIMITER ;

-- Crear procedimiento para filtrar vehiculos por diferentes criterios
DELIMITER //
CREATE PROCEDURE SP_Filtrar_Vehiculos(
    IN p_modelo VARCHAR(50),
    IN p_color VARCHAR(20),
    IN p_matricula CHAR(7),
    IN p_tv VARCHAR(20),
    IN p_idmarca INT
)
BEGIN
    SELECT *, 
        (SELECT nombre FROM marcas WHERE idmarca = v.idmarca) AS marca,
        (SELECT nombre FROM tipos_vehiculos WHERE idtipovehiculo = v.idtipovehiculo) AS tipo_vehiculo
    FROM vehiculos v
    JOIN marcas m ON v.idmarca = m.idmarca
    JOIN tipos_vehiculos tv ON v.idtipovehiculo = tv.idtipovehiculo
    WHERE (v.modelo = p_modelo OR p_modelo IS NULL)
    AND (v.color = p_color OR p_color IS NULL)
    AND (v.matricula = p_matricula OR p_matricula IS NULL)
    AND (tv.nombre = p_tv OR p_tv IS NULL)
    AND (v.idmarca = p_idmarca OR p_idmarca IS NULL);
END //
DELIMITER ;
