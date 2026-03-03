//backend/src/test/tv.get.test.js
//Pruebas unitarias a los endpoints relacionados a tipos de vehiculos
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints GET de tipos de vehiculos", () => {
    //Prueba para obtener todos los tipos de vehiculos
    //GET /api/tipovehiculos
    describe("GET /api/tipos-vehiculos", () => {
        it("Deberia devolver un json de tipos de vehiculos", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/tipos-vehiculos")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
    test("Deberia devolver un error 404 si el endpoint es incorrecto", async () => {
        const res = await request(app).get("/api/tipovehiculos");
        expect(res.statusCode).toEqual(404);
    })

    //Prueba para obtener un tipo de vehiculo por su id
    //GET /api/tipos-vehiculos/:id
    //Prueba con un id valido
    describe("GET /api/tipos-vehiculos/:id", () => {
        it("Deberia devolver un json del tipo de vehiculo con el id especificado", async () => {
            const res = await request(app).get("/api/tipos-vehiculos/3");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("idtipovehiculo");
            expect(res.body).toHaveProperty("nombre");
        })
    });
    test("Deberia devolver un error 404 si el id no existe", async () => {
        const res = await request(app).get("/api/tipos-vehiculos/999");
        expect(res.statusCode).toEqual(400);
    });
});