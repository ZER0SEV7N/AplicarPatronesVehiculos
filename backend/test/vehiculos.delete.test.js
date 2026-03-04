//backend/test/vehiculos.delete.test.js
//Pruebas unitarias a los endpoints relacionados a vehiculos
import request from 'supertest';
import app from '../src/app.js';
//Configurar el servidor de pruebas
describe("Pruebas unitarias para los endpoints DELETE de vehiculos", () => {
 
    //Prueba para eliminar un vehiculo
    //DELETE /api/vehiculos/:id
    //REQUIERE:
    /*{
    idvehiculo: ""
    }*/
    describe("DELETE /api/vehiculos/:id", () => {
        it("Deberia eliminar un vehiculo existente y enviar el codigo 204", async () => {
            //Prueba con un id valido
            const id = 2;
            const res = await request(app).delete(`/api/vehiculos/${id}`);
            expect(res.statusCode).toEqual(204);
            expect(res.body).toEqual({});
        })
    })
    test("Deberia devolver un error 400 si el id del vehiculo no existe", async () => {
        //Prueba con un id que no existe
        const id = 77 
        const res = await request(app).delete(`/api/vehiculos/${id}`);
        expect(res.statusCode).toEqual(400);
    });
});