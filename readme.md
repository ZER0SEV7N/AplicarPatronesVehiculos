# rest-vehiculos
### Proyecto REST para la gestion de vehiculos
Crud Simple de vehiculos con base de datos mySQL/MariaDB usando procedimientos almacenados y aplicando patrones 

## Instalar librerias
```bash
npm install
```

Primer Patron: Singleton
> Se utiliza en database.js para unicamente tener una instancia de base de datos iniciada.

Segundo Patron: Repository
> Se utiliza en las carpetas de repository: Contiene la logica de persistencia SQL, donde llama los procedimientos almacenados.

Patron de arquitectura: MVC
> Se utiliza para la distribucion de carpetas y logica dentro del backend.

