//backend/src/test/marcas.get.test.js
//Pruebas unitarias a los endpoints relacionados a marcas de vehiculos
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints GET de marcas de vehiculos", () => {
    //Prueba para obtener todas las marcas de vehiculos
    //GET /api/marcas
    describe("GET /api/marcas", () => {
        it("Deberia devolver un json y el codigo 200 de marcas de vehiculos", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/marcas")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
    test("Deberia devolver un error 404 si el endpoint es incorrecto", async () => {
        const res = await request(app).get("/api/marcasinvalido");
        expect(res.statusCode).toEqual(404);
    })

    //Prueba para obtener un tipo de vehiculo por su id
    //GET /api/marcas/:id
    //Prueba con un id valido
    describe("GET /api/marcas/:id", () => {
        it("Deberia devolver un json y el codigo 200 de la marca con el id especificado", async () => {
            const res = await request(app).get("/api/marcas/3");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("idmarca");
            expect(res.body).toHaveProperty("nombre");
        })
    });
    test("Deberia devolver un error 404 si el id no existe", async () => {
        const res = await request(app).get("/api/marcas/999");
        expect(res.statusCode).toEqual(404);
    });
});