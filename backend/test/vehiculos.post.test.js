//backend/test/vehiculos.post.test.js
//Pruebas unitarias a los endpoints relacionados a vehiculos
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints POST de vehiculos", () => {

    //Prueba para crear un vehiculo
    //POST /api/vehiculos
    //REQUIERE:
    /*{
    "idtipovehiculo": ,
    "modelo": "",
    "color": "",
    "matricula": "" <-Deben de ser 7 caracteres exactos,
    "anio_fabricacion": <-Debe ser un año entre 1900 y el año actual 2026,
    "idmarca": 
    }*/
   describe("POST /api/vehiculos", () => {
        it("Deberia crear un nuevo vehiculo", async () => {
            //Prueba con datos validos
            const vehiculoBien = {
                "idtv": 1,
                "modelo": "Ranger",
                "color": "Negro",
                "matricula": "ABC-123",
                "anio_fabricacion": 2020,
                "idmarca": 1
            }
            const res = await request(app).post("/api/vehiculos").send(vehiculoBien)
            expect(res.statusCode).toEqual(201);
        })
        test("Deberia devolver un error 400 al enviar los datos mal", async () => {
            //Prueba con datos invalidos
            const vehiculoMal = {
                "idtv": 100,
                "modelo": "Turbo GT",
                "color": "Gris",
                "matricula": "345-678",
                "anio_fabricacion": 2020,
                "idmarca": 100
            }
            const res = await request(app).post("/api/vehiculos").send(vehiculoMal);
            expect(res.statusCode).toEqual(400);
        })

        test("Deberia devolver un error 400 al enviar un año invalido y la matricula menor a 7 caracteres", async () => {
            //Prueba con un año de fabricación menor a 1900 y una matricula con menos de 7 caracteres
            const vehiculoMal = {
                "idtv": 1,
                "modelo": "Turbo GT",
                "color": "Gris",
                "matricula": "ABC-43278",
                "anio_fabricacion": 1899,
                "idmarca": 1
            }
            const res = await request(app).post("/api/vehiculos").send(vehiculoMal);
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
            const res = await request(app).post("/api/vehiculos").send(vehiculoMal);
            expect(res.statusCode).toEqual(400);
        });    
    });
});