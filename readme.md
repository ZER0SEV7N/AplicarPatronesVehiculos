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

Primer Patron: Singleton
> Se utiliza en database.js para unicamente tener una instancia de base de datos iniciada, utilizo la libreria sequelize para aplicar este patron.

Segundo Patron: Repository
> Lo utilizo en los 4 repositorios de mi carpeta repository, actua como capa intermedia entre la logica de negocio y el acceso a los datos. Define los comandos SQL en la clase.

Tercer Patron: Template Method
> Lo utilizo en mi repository: Primero defino una superClase llamada baseRepository donde se definen los metodos **getAll** y **getById**. Dichos metodos se heredan en los 3 repositorios, con la diferencia de que en el repositorio vehiculos tiene los demas metodos para el CRUD, a diferencia de tipos_vehiculos y marcas que unicamente utilizan los elementos del base. Evitando escribir codigo innecesario.

Patron de arquitectura: MVC
> Se utiliza para la distribucion de carpetas y logica dentro del backend.
> Model: Representa los datos y la logica de negocio.
> View: Presenta los datos al usuario atravez del API.
> Controller: Maneja las peticiones del usuario, interactua con ambos y selecciona que vista mostrar.
