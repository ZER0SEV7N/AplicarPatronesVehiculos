//backend/test/vehiculos.get.test.js
//Pruebas unitarias a los endpoints relacionados a vehiculos
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints GET de vehiculos", () => {

    //Prueba para obtener todos los vehiculos 
    //GET /api/vehiculos
    describe("GET /api/vehiculos", () => {
        it("Deberia devolver un json de vehiculos", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/vehiculos");
            expect(res.statusCode).toEqual(200);
            //Verificar que el cuerpo de la respuesta sea un array de objetos con las propiedades correctas
            expect(res.body).toBeInstanceOf(Array);
            res.body.forEach(element => {
                expect(element).toHaveProperty("idvehiculo");
                expect(element).toHaveProperty("idtipovehiculo");
                expect(element).toHaveProperty("modelo");
                expect(element).toHaveProperty("color");
                expect(element).toHaveProperty("matricula");
                expect(element).toHaveProperty("anio_fabricacion");
                expect(element).toHaveProperty("idmarca");
            });
        })
    })
    test("Deberia devolver un error 404 si el endpoint no existe", async () => {
        const res = await request(app).get("/api/vehiculos123");
        expect(res.statusCode).toEqual(404);
    });

    //Prueba para obtener un vehiculo al pasar su id
    //GET /api/vehiculos/:id
    describe("GET /api/vehiculos/:id", () => {
        it("Deberia devolver un json con la informacion de un vehiculo en especifico", async () => {
            //Prueba con un id valido
            const res = await request(app).get("/api/vehiculos/1");
            expect(res.statusCode).toEqual(200);
            //Verificar que el cuerpo tenga las propiedades correctas
            expect(res.body).toHaveProperty("idvehiculo");
            expect(res.body).toHaveProperty("idtipovehiculo");
            expect(res.body).toHaveProperty("modelo");
            expect(res.body).toHaveProperty("color");
            expect(res.body).toHaveProperty("matricula");
            expect(res.body).toHaveProperty("anio_fabricacion");
            expect(res.body).toHaveProperty("idmarca");
        })
    })
    test("Deberia devolver un error 400 si el id no existe", async() => {
        const res = await request(app).get("/api/vehiculos/2469");
        expect(res.statusCode).toEqual(400);
    })

    //Prueba para filtrar un vehiculo por diferentes criterios
    //GET /api/vehiculos?modelo=&color=&matricula=&anio_fabricacion=&idtipovehiculo=&idmarca=;
    /* Filtra por cualquiera de los siguientes criterios:
    modelo: string,
    color: string,
    matricula: string,
    tipo de vehiculo: idtipovehiculo Integer,
    marca: idmarca Integer
    */
    describe("GET /api/vehiculos?modelo=&color=&matricula=&anio_fabricacion=&idtipovehiculo=&idmarca=", () => {
        it("Deberia devolver un json con los vehiculos que coincidan con el criterio de busqueda", async () => {
            //Prueba con un criterio de búsqueda válido
            const res = await request(app).get("/api/vehiculos?modelo=Ranger");
            expect(res.statusCode).toEqual(200);
            //Verificar que el cuerpo de la respuesta sea un array de objetos con las propiedades correctas
            expect(res.body).toBeInstanceOf(Array);
            res.body.forEach(element => {
                expect(element).toHaveProperty("idvehiculo");
                expect(element).toHaveProperty("idtipovehiculo");
                expect(element).toHaveProperty("modelo");
                expect(element).toHaveProperty("color");
                expect(element).toHaveProperty("matricula");
                expect(element).toHaveProperty("anio_fabricacion");
                expect(element).toHaveProperty("idmarca");
            });
        })
    })
    test("Deberia devolver un error 200 si el criterio de búsqueda es inválido, Aunque sin elementos", async () => {
        const res = await request(app).get("/api/vehiculos?modelo=Ranger&color=Azul&matricula=XYZ-1234&idtipovehiculo=100&idmarca=100");
        expect(res.statusCode).toEqual(200);
        //Verificar que el cuerpo de la respuesta sea un array vacío
        expect(res.body.length).toEqual(0);
    });

});