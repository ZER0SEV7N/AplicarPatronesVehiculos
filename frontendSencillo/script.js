//Script para consumir el API del backend de vehiculos
//Todas las peticiones se realizan desde la url http://localhost:3000/vehiculos

const apiUrl = "http://localhost:3000/api";

//Funcion para formatear el cuerpo de la tabla
function formatearTabla(data) {
    const fila = document.getElementById("vehiculo-list");
    fila.innerHTML = "";
    data.forEach((vehiculo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${vehiculo.idvehiculo}</td>
            <td>${vehiculo.tipo_vehiculo}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.color}</td>
            <td>${vehiculo.matricula}</td>
            <td>${vehiculo.anio_fabricacion}</td>
            <td>${vehiculo.marca || ""}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarVehiculo(${vehiculo.idvehiculo})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarVehiculo(${vehiculo.idvehiculo})">Eliminar</button>
            </td>`;
    fila.appendChild(row);
  });
}

//Funcion para mostrar los vehiculos del backend
async function mostrarVehiculos() {
    //Obtener los filtros seleccionados
    const filtroTipo = document.getElementById("Tv-select")?.value;
    const filtroModelo = document.getElementById("filtro-modelo")?.value;
    const filtroColor = document.getElementById("filtro-color")?.value;
    const filtroMatricula = document.getElementById("filtro-matricula")?.value;
    const filtroMarca = document.getElementById("marcas-select")?.value;

    //Imprimir los filtros seleccionados
    console.log("Filtros seleccionados:", {
        filtroTipo,
        filtroModelo,
        filtroColor,
        filtroMatricula,
        filtroMarca,
    });

    //Construir la url con los filtros como query params
    const params = new URLSearchParams();
    if (filtroTipo) params.append("tv", filtroTipo);
    if (filtroModelo) params.append("modelo", filtroModelo);
    if (filtroColor) params.append("color", filtroColor);
    if (filtroMatricula) params.append("matricula", filtroMatricula);
    if (filtroMarca) params.append("idmarca", filtroMarca);

    const url = `${apiUrl}/vehiculos?${params.toString()}`;
    //Realizar la petición al backend
    try {
        const res = await fetch(url);
        if (res.ok) {
        const data = await res.json();
        formatearTabla(data);
        }
    } catch (e) {
        console.error("Error al obtener los vehiculos: ", e);
        const fila = document.getElementById("vehiculo-list");
        fila.innerHTML =
        "<tr><td colspan='8'>Error al cargar los vehiculos</td></tr>";
    }
}

//Funcion para cargar los tipos de vehiculos y marcas en los select
async function cargarTipos() {
    try {
        const res = await fetch(`${apiUrl}/tipos-vehiculos`);
        if (res.ok) {
        const data = await res.json();
        const select = document.getElementById("Tv-select");
        data.forEach((tipo) => {
            const option = document.createElement("option");
            option.value = tipo.idtipovehiculo;
            option.textContent = tipo.nombre;
            select.appendChild(option);
        });
        }
    } catch (e) {
        console.error("Error al cargar los tipos de vehiculos: ", e);
    }
}

//Funcion para cargar las marcas en el select
async function cargarMarcas() {
    try {
        const res = await fetch(`${apiUrl}/marcas`);
        if (res.ok) {
        const data = await res.json();
            const select = document.getElementById("marcas-select");
            data.forEach((marca) => {
            const option = document.createElement("option");
            option.value = marca.idmarca;
            option.textContent = marca.nombre;
            select.appendChild(option);
            });
        }
    } catch (e) {
        console.error("Error al cargar las marcas: ", e);
    }
}

//Funcion para eliminar un vehiculo
async function eliminarVehiculo(idvehiculo) {
    if (confirm("¿Está seguro de eliminar este vehículo?")) {
        try {
            fetch(`${apiUrl}/vehiculos/${idvehiculo}`, {
                method: "DELETE",
            }
            ).then((res) => {
                if (res.ok) {
                    alert("Vehículo eliminado correctamente");
                    window.location.reload();
                }
            });
        } catch (e) {
            console.error("Error al eliminar el vehículo: ", e);
        }
    }
}

//Funcion para el manejo del formulario de creación y edición de un vehiculo
async function ManejarFormulario() {
    //Obtener el id del vehiculo a editar de la url
    const form = document.getElementById("vehiculos-form");
    //Cargar los elementos del formulario si se esta editando un vehiculo
    const params = new URLSearchParams(window.location.search);
    const idvehiculo = params.get("idvehiculo");
    if (idvehiculo) {
        try {
            const res = await fetch(`${apiUrl}/vehiculos/${idvehiculo}`);
            if(res.ok){
                const data = await res.json();
                document.getElementById("modelo").value = data.modelo;
                document.getElementById("color").value = data.color;
                document.getElementById("matricula").value = data.matricula;
                document.getElementById("aniofabricacion").value = data.aniofabricacion;
                document.getElementById("Tv-select").value = data.idtipovehiculo;
                document.getElementById("marcas-select").value = data.idmarca;
                document.getElementById("Tv-select").disabled = true;
            }
        } catch (e) {
            console.error("Error al cargar el vehículo: ", e);
        }
    }else form.reset();
        
    //Agregar el evento submit al formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        //Obtener los datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const payload = {
            modelo: data.modelo,
            color: data.color,
            matricula: data.matricula,
            anio_fabricacion: parseInt(data.aniofabricacion),
            idmarca: parseInt(data.idmarca),
        };

        if (!idvehiculo) {
            payload.idtv = parseInt(data.idtv);
        }
        console.log("Datos del formulario: ", payload);

        //Realizar la petición al backend para crear o actualizar el vehiculo
        try {
            let res;
            //Actualizar si se mando el id del vehiculo, sino crear un nuevo vehiculo
            if (idvehiculo) {
                res = await fetch(`${apiUrl}/vehiculos/${idvehiculo}`,
                    {
                        method: "PATCH",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );
            //Si no se mando el id, se maneja el formulario como creacion
            } else {
                res = await fetch(`${apiUrl}/vehiculos`,
                    {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );
            }
            if (res.ok) {
                alert(idvehiculo ? "Vehículo actualizado correctamente" : "Vehículo creado correctamente");
                window.location.href = "index.html";
            } else{
                const error = await res.json();
                alert(idvehiculo ? `Error al actualizar el vehículo: ${error.message}` : `Error al crear el vehículo: ${error.message}`);
                console.error("Error en la respuesta del servidor: ", error);
            }
        } catch (e) {
            console.error("Error al guardar el vehículo: ", e);
        }
    });
}

//Funcion para cargar el navbar modularizado
async function cargarNavbar() {
  try {
    const res = await fetch('layout/navbar.html');
    if (res.ok) {
      const navbarHtml = await res.text();
      const navbarContainer = document.getElementById('navbar-container');
      if (navbarContainer) {
        navbarContainer.innerHTML = navbarHtml;
      }
    }
  } catch (e) {
    console.error("Error al cargar el navbar: ", e);
  }
}

//Funcion para mandar el id del vehiculo a editar al formulario de edición
function editarVehiculo(idvehiculo) {
    window.location.href = `form.html?idvehiculo=${idvehiculo}`;
}

//Cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    //Primero cargar los select y el navbar
    cargarTipos();
    cargarMarcas();
    cargarNavbar();
    
    //Unicamente cargar en el formulario
    if (document.getElementById("vehiculos-form")) {
        ManejarFormulario();
    }

    //Unicamente cargar en la tabla de vehiculos
    if (document.getElementById("vehiculo-list")) {
        mostrarVehiculos();
        const filtros = document.getElementById("filtro-form");
        if (filtros) {
            document.addEventListener("reset", () => {
                mostrarVehiculos();
            });
            const inputs = document.querySelectorAll("#filtro-form input, #filtro-form select");
            inputs.forEach((input) => {
                input.addEventListener("input", () => {
                    mostrarVehiculos();
                });
                input.addEventListener("change", () => {
                    mostrarVehiculos();
                });
            });
        }
    }
});
