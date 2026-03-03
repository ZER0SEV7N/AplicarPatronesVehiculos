-- Crear la base de datos
DROP DATABASE IF EXISTS VehiculosDB;
CREATE DATABASE IF NOT EXISTS VehiculosDB ;

-- Usar la base de datos
use VehiculosDB;

-- Crear la tabla de Marcas
CREATE TABLE marcas (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(30) NOT NULL
);

-- Crear la tabla de tipos de vehiculos
CREATE TABLE tipos_vehiculos (
    idtipovehiculo INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(20) NOT NULL
);

-- Crear la tabla de vehiculos (terrestres)
CREATE TABLE vehiculos (
    idvehiculo INT AUTO_INCREMENT PRIMARY KEY,
    idtipovehiculo INT NOT NULL,
    modelo CHAR(30) NOT NULL,
    color CHAR(20) NOT NULL,
    matricula CHAR(7) NOT NULL UNIQUE CHECK (LENGTH(matricula) <= 7),
    anio_fabricacion YEAR NOT NULL CHECK (anio_fabricacion > 1900 AND anio_fabricacion <= YEAR(CURDATE())),
    idmarca INT NOT NULL,
    estado ENUM('Disponible', 'En Reparacion', 'Inactivo') DEFAULT 'Disponible',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
(NULL, 'Nissan'),
(NULL, 'Porsche'),
(NULL, 'Kia'),
(NULL, 'Hyundai'),
(NULL, 'Mazda');

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
    IN p_modelo CHAR(50),
    IN p_color CHAR(20),
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

CALL SP_Insertar_Vehiculo(1, 'Corolla', 'Blanco', 'ABC-1234', 2020, 1);
CALL SP_Insertar_Vehiculo(2, 'CBR600RR', 'Rojo', 'XYZ-5678', 2019, 2);
CALL SP_Insertar_Vehiculo(3, 'F-150', 'Azul', 'DEF-9012', 2021, 3);

-- Crear procedimiento almacenado para actualizar un vehiculo
DELIMITER //
CREATE PROCEDURE SP_Actualizar_Vehiculo(
    IN p_idvehiculo INT,
    IN p_modelo CHAR(50),
    IN p_color CHAR(20),
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
    IN p_modelo CHAR(50),
    IN p_color CHAR(20),
    IN p_matricula CHAR(7),
    IN p_idtv INT,
    IN p_idmarca INT
)
BEGIN
    SELECT *, 
        (SELECT nombre FROM marcas WHERE idmarca = v.idmarca) AS marca,
        (SELECT nombre FROM tipos_vehiculos WHERE idtipovehiculo = v.idtipovehiculo) AS tipo_vehiculo
    FROM vehiculos v
    JOIN marcas m ON v.idmarca = m.idmarca
    JOIN tipos_vehiculos tv ON v.idtipovehiculo = tv.idtipovehiculo
    WHERE (p_modelo IS NULL OR v.modelo LIKE CONCAT('%', p_modelo, '%'))
    AND (p_color IS NULL OR v.color LIKE CONCAT('%', p_color, '%'))
    AND (p_matricula IS NULL OR v.matricula LIKE CONCAT('%', p_matricula, '%'))
    AND (p_idtv IS NULL OR v.idtipovehiculo = p_idtv)
    AND (p_idmarca IS NULL OR v.idmarca = p_idmarca);
END //
DELIMITER ;

-- Crear procedimiento para cambiar el estado de un vehiculo
DELIMITER //
CREATE PROCEDURE SP_Cambiar_Estado(
    IN p_idvehiculo INT,
    in p_estado ENUM
)
BEGIN 
    UPDATE vehiculos
    SET estado = p_estado
    WHERE idvehiculo = p_idvehiculo;

    SELECT p_idvehiculo AS "ID del vehiculo Actualizado", estado
    FROM vehiculos
    WHERE idvehiculo = p_idvehiculo;
END //
DELIMITER ;

-- Crear procedimiento para obtener todos los registros de vehiculos
DELIMITER //
CREATE PROCEDURE SP_Obtener_Registros()
BEGIN
    SELECT *, 
        (SELECT nombre FROM marcas WHERE idmarca = v.idmarca) AS marca,
        (SELECT nombre FROM tipos_vehiculos WHERE idtipovehiculo = v.idtipovehiculo) AS tipo_vehiculo
    FROM vehiculos v
    JOIN marcas m ON v.idmarca = m.idmarca
    JOIN tipos_vehiculos tv ON v.idtipovehiculo = tv.idtipovehiculo;
END //
DELIMITER ;
