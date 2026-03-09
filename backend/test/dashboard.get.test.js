//backend/test/dashboard.get.test.js
//Pruebas unitarias a los endpoints relacionados a los dashboards
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints GET de dashboards", () => {    
    //Prueba para obtener el resumen general del dashboard
    //GET /api/dashboard/resumen
    describe("GET /api/dashboard/resumen", () => {
        it("Deberia devolver un json y un codigo 200 con el resumen completo del dashboard", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/dashboard/resumen")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Object);
            expect(Array.isArray(res.body)).toBe(false);
        });
    });
    test("Deberia devolver un error 404 si el endpoint es incorrecto", async () => {
        const res = await request(app).get("/api/dashboard/resumengeneral");
        expect(res.statusCode).toEqual(404);
    });

    //Prueba para obtener el resumen de vehiculos
    //GET /api/dashboard/resumen/vehiculos
    describe("GET /api/resumen/vehiculos", () => {
        it("Deberia devolver un json y un codigo 200 con el resumen de vehiculos", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/resumen/vehiculos")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeDefined();
        });
    });
    test("Deberia devolver un error 404 si el endpoint es incorrecto", async () => {
        const res = await request(app).get("/api/dashboard/resumenvehiculos");
        expect(res.statusCode).toEqual(404);
    })

    //Prueba para obtener el resumen de vehiculos por marca
    //GET /api/dashboard/resumen/marcas
    describe("GET /api/resumen/marcas", () => {
        it("Deberia devolver un json con el resumen de vehiculos por marca", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/resumen/marcas")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
    test("Deberia devolver un error 404 si el endpoint es incorrecto", async () => {
        const res = await request(app).get("/api/dashboard/resumenvehiculosmarca");
        expect(res.statusCode).toEqual(404);
    })

    //Prueba para obtener el resumen de vehiculos por tipo
    //GET /api/dashboard/resumen/tipos-vehiculos
    describe("GET /api/resumen/tipos-vehiculos", () => {
        it("Deberia devolver un json con el resumen de vehiculos por tipo", async () => {
            //Prueba con el endpoint correcto
            const res = await request(app).get("/api/resumen/tipos-vehiculos")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
    test("Deberia devolver un error 404 si el endpoint es incorrecto", async () => {
        const res = await request(app).get("/api/dashboard/resumenvehiculostipo");
        expect(res.statusCode).toEqual(404);
    });


});



