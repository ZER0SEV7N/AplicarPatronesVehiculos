# rest-vehiculos
### Proyecto REST para la gestion de vehiculos
Crud Simple de vehiculos con base de datos mySQL/MariaDB usando procedimientos almacenados y aplicando patrones 

## Instalar librerias
```bash
npm install
```

## Ejecutar el programa
```bash
npm run dev
```

## Ejecutar una prueba en especifico
```bash
npm test -- ${nombre.peticion}
```
## Ejecutar todas las pruebas
```bash
npm test
```


Primer Patron: Singleton
> Se utiliza en database.js para unicamente tener una instancia de base de datos iniciada, utilizo la libreria sequelize para aplicar este patron.

Segundo Patron: Repository
> Lo utilizo en los 4 repositorios de mi carpeta repository, actua como capa intermedia entre la logica de negocio y el acceso a los datos. Define los comandos SQL en la clase.

Tercer Patron: Template Method
> Lo utilizo en mi repository: Primero defino una superClase llamada baseRepository donde se definen los metodos **getAll** y **getById**. Dichos metodos se heredan en los 3 repositorios, con la diferencia de que en el repositorio vehiculos tiene los demas metodos para el CRUD, a diferencia de tipos_vehiculos y marcas que unicamente utilizan los elementos del base. Evitando escribir codigo innecesario.

Cuarto Patron: Dependecy Injection
> Lo utilizo en todas mis clases [models -> repositories -> services -> controller] en lugar de crear sus propias dependencias, estas son enviadas a travez del constructor. Ejemplo: Al instanciar mi vehiculosController, inyecto la instancia vehiculosServices previamente configurado.  

Patron de arquitectura: MVC
> Se utiliza para la distribucion de carpetas y logica dentro del backend.

> Model: Define la estructura de los datos y la logica de negocio mediante sequelize.

> View: Presenta los datos al usuario atravez del API REST, obtorgando respuestas en el formato JSON.

> Controller: Actua como intermediario, procesando las peticiones HTTP y coordinando la logica entre el servicio y la respuesta.
