-- Crear la base de datos
DROP DATABASE IF EXISTS VehiculosDB;
CREATE DATABASE IF NOT EXISTS VehiculosDB ;

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
    estado ENUM('Disponible', 'En Reparacion', 'Vendido', 'No Disponible', 'Inactivo') DEFAULT 'Disponible',
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

-- Crear procedimiento almacenado para insertar un nuevo vehiculo
DELIMITER //
CREATE PROCEDURE SP_Insertar_Vehiculo(
    IN p_idtv INT,
    IN p_modelo CHAR(50),
    IN p_color CHAR(20),
    IN p_matricula CHAR(7),
    IN p_anio_fabricacion YEAR,
    IN p_idmarca INT,
    IN p_estado ENUM('Disponible', 'En Reparacion', 'Vendido', 'No Disponible', 'Inactivo')
)
BEGIN
    INSERT vehiculos (idtipovehiculo, modelo, color, matricula, anio_fabricacion, idmarca, estado)
    VALUES (
        p_idtv,
        p_modelo,
        p_color,
        p_matricula,
        p_anio_fabricacion,
        p_idmarca,
        p_estado
    );
    SELECT COUNT(idvehiculo) AS "Total de Vehiculos : " FROM vehiculos;
END //
DELIMITER ;

CALL SP_Insertar_Vehiculo(1, 'Corolla', 'Blanco', 'ABC-123', 2020, 1, 'Disponible');
CALL SP_Insertar_Vehiculo(2, 'CBR600RR', 'Rojo', 'XYZ-567', 2019, 2, 'Disponible');
CALL SP_Insertar_Vehiculo(3, 'F-150', 'Azul', 'DEF-901', 2021, 3, 'Disponible');

-- Crear procedimiento almacenado para actualizar un vehiculo
DELIMITER //
CREATE PROCEDURE SP_Actualizar_Vehiculo(
    IN p_idvehiculo INT,
    IN p_modelo CHAR(50),
    IN p_color CHAR(20),
    IN p_matricula CHAR(7),
    IN p_anio_fabricacion YEAR,
    IN p_idmarca INT,
    IN p_estado ENUM('Disponible', 'En Reparacion', 'Vendido', 'No Disponible', 'Inactivo')
)
BEGIN
    UPDATE vehiculos
    SET modelo = p_modelo,
        color = p_color,
        matricula = p_matricula,
        anio_fabricacion = p_anio_fabricacion,
        idmarca = p_idmarca,
        estado = p_estado
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
    SELECT v.idvehiculo, 
        v.idtipovehiculo, 
        v.modelo, 
        v.color, 
        v.matricula, 
        v.anio_fabricacion, 
        v.idmarca, 
        v.estado,
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
    IN p_estado ENUM('Disponible', 'En Reparacion', 'Vendido', 'No Disponible', 'Inactivo')
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
CREATE PROCEDURE SP_Resumen_Total()
    SELECT COUNT(idvehiculo) AS "Total de Vehiculos"
    FROM vehiculos;
//
DELIMITER ;

-- Crear procedimiento para obtener el ultimo registro insertado de vehiculo
DELIMITER //
CREATE PROCEDURE SP_Ultimo_Creado()
BEGIN
    SELECT v.idvehiculo, v.modelo, v.matricula, v.created_at, m.nombre AS marca, tv.nombre AS tipo_vehiculo
    FROM vehiculos v
    JOIN marcas m ON v.idmarca = m.idmarca
    JOIN tipos_vehiculos tv ON v.idtipovehiculo = tv.idtipovehiculo
    ORDER BY v.idvehiculo DESC
    LIMIT 1;
END //
DELIMITER ;

-- Crear procedimiento para obtener el ultimo registro actualizado de vehiculo
DELIMITER //
CREATE PROCEDURE SP_Ultimo_Actualizado()
BEGIN
    SELECT v.idvehiculo, v.modelo, v.matricula, v.updated_at, m.nombre AS marca, tv.nombre AS tipo_vehiculo
    FROM vehiculos v
    JOIN marcas m ON v.idmarca = m.idmarca
    JOIN tipos_vehiculos tv ON v.idtipovehiculo = tv.idtipovehiculo
    WHERE v.updated_at > v.created_at
    ORDER BY v.updated_at DESC
    LIMIT 1;
END //
DELIMITER ;

-- Crear procedimiento para resumen de marcas de vehiculos
DELIMITER //
CREATE PROCEDURE SP_Resumen_Marcas()
BEGIN
    SELECT m.nombre AS marca, COUNT(v.idvehiculo) AS total_vehiculos
    FROM marcas m
    LEFT JOIN vehiculos v ON m.idmarca = v.idmarca
    GROUP BY m.idmarca, m.nombre
    ORDER BY total_vehiculos DESC;
END //
DELIMITER ;

-- Crear procedimiento para resumen de tipos de vehiculos
DELIMITER //
CREATE PROCEDURE SP_Resumen_Tipos()
BEGIN
    SELECT tv.nombre AS tipo_vehiculo, COUNT(v.idvehiculo) AS total_vehiculos
    FROM tipos_vehiculos tv
    LEFT JOIN vehiculos v ON tv.idtipovehiculo = v.idtipovehiculo
    GROUP BY tv.idtipovehiculo, tv.nombre
    ORDER BY total_vehiculos DESC;
END //
DELIMITER ;

-- Crear procedimiento para resumen de estados de vehiculos
DELIMITER //
CREATE PROCEDURE SP_Resumen_Dashboard()
BEGIN
    SELECT 
        COUNT(idvehiculo) AS total_vehiculos,
        SUM(CASE WHEN estado = 'Disponible' THEN 1 ELSE 0 END) AS Disponibles,
        SUM(CASE WHEN estado = 'En Reparacion' THEN 1 ELSE 0 END) AS Reparacion,
        SUM(CASE WHEN estado = 'Inactivo' THEN 1 ELSE 0 END) AS Inactivos,
        SUM(CASE WHEN estado = 'Vendido' THEN 1 ELSE 0 END) AS Vendidos,
        SUM(CASE WHEN estado = 'No Disponible' THEN 1 ELSE 0 END) AS No_Disponibles
    FROM vehiculos;
END //
DELIMITER ;
