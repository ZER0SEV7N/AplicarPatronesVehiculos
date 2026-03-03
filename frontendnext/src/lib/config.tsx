//frontendnext/src/lib/config.tsx
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; 

//Crear una instancia de axios con la URL configurada
const api = axios.create({
    baseURL: API_BASE_URL, 
    headers: {
        "Content-Type": "application/json"
    }
});

//Interceptar respuestas 
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            alert(`Error: ${error.response.data.message || "Ocurrió un error en el servidor."}`);
        } else if (error.request) {
            console.error("No se recibió respuesta del servidor:", error.request);
            alert("Error: No se recibió respuesta del servidor.");
        } else {
            console.error("Error al configurar la solicitud:", error.message);
            alert(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
)

export default api;