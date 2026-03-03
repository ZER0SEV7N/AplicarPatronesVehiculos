//backend/test/vehiculos.patch.test.js
//Pruebas unitarias a los endpoints relacionados a vehiculos
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints PATCH de vehiculos", () => {

    //Prueba para actualizar un vehiculo
    //PATCH /api/vehiculos/:id
    //REQUIERE:
    /*{
    idvehiculo: "",
    modelo: "",
    color: "",
    matricula: "";
    anio_fabricacion: "",
    idmarca: ""
    }
    */
    describe("PATCH /api/vehiculos/:id", () => {
        it("Deberia actualizar un vehiculo existente", async () => {
            //Prueba con datos validos
            const id = 1;
            const vehiculoBien = {
                "modelo": "Ranger XLT",
                "color": "Rojo oscuro",
                "matricula": "SE0-PQ3",
                "anio_fabricacion": 2021,
                "idmarca": 5
            }
            const res = await request(app).patch(`/api/vehiculos/${id}`).send(vehiculoBien);
            expect(res.statusCode).toEqual(200);
        })
        test("Deberia devolver un error 400 si no encuentra el id del vehiculo", async () => {
            //Prueba con un id que no existe
            const id = 77 //EXECUTE ORDER 77 REFERENCE
            const res = await request(app).patch(`/api/vehiculos/${id}`);
            expect(res.statusCode).toEqual(400);
        })
        test("Deberia devolver un error 400 al enviar un dato invalido", async () => {
            //Prueba con un año de fabricación mayor al año actual y una matricula con más de 7 caracteres
            const id = 1;
            const vehiculoMal = {
                "modelo": "Ranger XLT",
                "color": "Rojo oscuro",
                "matricula": "SE0-PQ2-123",
                "anio_fabricacion": 2090,
                "idmarca": 5
            }
            const res = await request(app).patch(`/api/vehiculos/${id}`).send(vehiculoMal);
            expect(res.statusCode).toEqual(400);
        })
        test("Deberia devolver un error 400 si falta algun campo obligatorio", async () => {
            //Prueba con un campo obligatorio faltante
            const vehiculoMal = {
                "idtv": 1,
                "modelo": "Turbo GT",
                "color": "Gris",
                "anio_fabricacion": 2020,
                "idmarca": 1
            }
            const res = await request(app).patch(`/api/vehiculos/1`).send(vehiculoMal);
            expect(res.statusCode).toEqual(400);
        });  
    });
});