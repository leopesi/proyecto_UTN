# Proyecto final del curso Programador Web Avanzado da UTN - (Universidad Tecnológica Nacional - Buenos Aires)

## :open_file_folder: server/
### :file_cabinet: <i>package.json</i>
Este package.json es un archivo de configuración para un proyecto de Node.js. 
En la sección "dependencias", se especifican las librerías externas que el proyecto necesita para funcionar. Algunas de las dependencias incluyen bcrypt para la encriptación de contraseñas, cors para manejar el acceso a recursos cruzados en el lado del servidor, dotenv para configurar variables de entorno, express para manejar las solicitudes y respuestas HTTP, jsonwebtoken para la generación y validación de tokens de autenticación, y sequelize para interactuar con una base de datos. El nombre del proyecto es "proyecto_utn" y la versión actual es "1.0.0". En la sección "scripts", se incluyen scripts para iniciar el servidor en modo desarrollo o producción. El autor del proyecto es "Leonardo Pesi" y la licencia es "ISC". En la sección "devDependencies" se especifican las dependencias solo necesarias para el desarrollo.
```shell
{
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.3.3",
    "sequelize": "^6.25.2"
  },
  "name": "proyecto_utn",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
  },
  "author": "Leonardo Pesi",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "morgan": "^1.10.0",
    "nodemon": "^2.0.20"
  }
}
```
## :open_file_folder: server/
### :file_cabinet: <i>app.js</i>
Este script está configurando un servidor Express.js e importando varios módulos para manejar diferentes funcionalidades.
El servidor está configurado para escuchar la puerta 8080, pero también puede usar uns puerta especificado en una variable de entorno. 
El script también está configurando middlewares para manejar CORS, análisis de JSON y registros, además de importar rutas para diferentes funcionalidades como:
 gestión de roles, autenticación, clientes y direcciones. Además, está importando un archivo de conexión a la base de datos.
Al final, está iniciando el servidor en el puerto especificado y mostrando un mensaje de confirmación en la consola.

```shell
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

//Settings
app.use(cors())
app.use(express.json()) // Parser da Requisição HTTP
app.use(morgan('dev'))  //Middleware de logs

//database
require("./src/db/db")

//Rutas
require('./src/routes/role.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/cliente.routes')(app);
require('./src/routes/direccion.routes')(app);

app.listen(PORT, ()=> {
    console.log(`Server funcionando en el puerto ${PORT}!`)
})
```

## :open_file_folder: server/
### :file_cabinet: <i>app.js</i>