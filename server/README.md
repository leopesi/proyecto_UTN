# Proyecto final del curso Programador Web Avanzado da UTN - (Universidad Tecnológica Nacional - Buenos Aires)

### :open_file_folder: server/
#### :file_cabinet: <i>package.json</i>
>Este package.json es un archivo de configuración para un proyecto de Node.js. 
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
<hr>

### :open_file_folder: server/
#### :file_cabinet: <i>app.js</i>
>Este script está configurando un servidor Express.js e importando varios módulos para manejar diferentes funcionalidades.
El servidor está configurado para escuchar la puerta 8080, pero también puede usar uns puerta especificado en una variable de entorno. 
El script también está configurando middlewares para manejar CORS, análisis de JSON y registros, además de importar rutas para diferentes funcionalidades como:
 gestión de roles, autenticación, clientes y direcciones. Además, está importando un archivo de conexión a la base de datos.
Al final, está iniciando el servidor en el puerto especificado y mostrando un mensaje de confirmación en la consola.

```javascript
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
<hr>

### :open_file_folder: server/src
#### :file_cabinet: <i>config.js</i>
>Este código está exportando un objeto con varias propiedades que se establecen con variables de entorno o valores predeterminados. Las propiedades incluyen información de conexión de base de datos, como el puerto, el host, el nombre de usuario y la contraseña, así como el nombre de la base de datos. También se establece una propiedad llamada "SECRET" que se establece con una variable de entorno o un valor predeterminado. Todo el objeto se congela para evitar cualquier cambio accidental en el futuro.
```javascript
module.exports = Object.freeze({
  DB_PORT: process.env.DB_PORT || 7986,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "password",
  DB_DATABASE:  process.env.DB_DATABASE || "UTN",
  SECRET: process.env.SECRET || jDdsalkjjU32&FE14DF

}) 
```
<hr>

### :open_file_folder: server/src/controllers
#### :file_cabinet: <i>auth.controller.js</i>
>Este código es un ejemplo de un controlador de usuario en Node.js que utiliza la biblioteca Sequelize para interactuar con una base de datos. Se utilizan diferentes módulos, como dotenv, jsonwebtoken y bcrypt, para manejar la autenticación y encriptación de contraseñas. El controlador tiene dos funciones principales: signup y signin. La función signup se utiliza para registrar un nuevo usuario en la base de datos, mientras que la función signin se utiliza para iniciar sesión en la aplicación. Ambos controladores manejan errores y devuelven respuestas HTTP apropiadas en caso de éxito o error.

```javascript
require('dotenv').config()
const db = require("../db/db");
const SECRET = process.env.SECRET || 123456789;
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  // Save User to Database
  const {nombre, apellido, email, password} = req.body
  if(!nombre) {
    return res.status(422).json({message: 'Se requiere el nombre!'})
  }
  if(!apellido) {
    return res.status(422).json({message: 'Se requiere el apellido!'})
  }
  if(!email) {
    return res.status(422).json({message: 'Se requiere el email'})
  }
  if(!password) {
    return res.status(422).json({message: 'La contraseña es obliatoria!'})
  }
  // Create Password
  const salt = 8
  const passwordHash = bcrypt.hashSync(password, salt)

  // Create User
  const newUser = {
      nombre,
      apellido,
      email,
      password: passwordHash,
  }

  User.create(newUser)
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuario registrado con éxito!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([3]).then(() => {
          res.send({ message: "Usuario registrado con éxito!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      nombre: req.body.nombre
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
```
<hr>

### :open_file_folder: server/src/controllers
#### :file_cabinet: <i>cliente.controller.js</i>
>Este código es un archivo de rutas de una aplicación web que maneja operaciones CRUD (crear, leer, actualizar y eliminar) para una tabla de clientes en una base de datos. Utiliza la librería '../db/db' para importar la configuración de la base de datos y el modelo de cliente. Luego define varias funciones asíncronas, cada una correspondiente a una operación CRUD específica (crear, encontrar todos, encontrar por ID, actualizar y eliminar por ID). Cada función maneja la lógica necesaria para realizar la operación correspondiente (por ejemplo, validando si los campos requeridos están presentes en la solicitud, buscando o actualizando un registro en la base de datos, etc.) y establece una respuesta apropiada para el cliente (por ejemplo, un mensaje de éxito o un error). Finalmente, el archivo exporta un objeto que contiene todas estas funciones para que puedan ser utilizadas en otra parte de la aplicación.

```javascript
const db = require('../db/db')
const Cliente = db.cliente;

var postCliente = {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById,
}

async function create(req, res){
    const {nombre, apellido, email, telefono} = req.body
    if(!nombre) {
        return res.status(422).json({message: "Se requiere el nombre!"})
    }
    if(!apellido) {
        return res.status(422).json({message: "Se requiere el apellido!"})
    }
    if(!email) {
        return res.status(422).json({message: "se requiere el email!"})
    }
    if(!telefono) {
        return res.status(422).json({message: "Se requiere el telefono!"})
    }
    console.log(req.body)

    const clienteReq = {
        nombre,
        apellido,
        email,
        telefono
    }
    await Cliente.create(clienteReq).
    then((result) => {
        res.send({ id: result.id})
        res.status(201).json({msg: "Cliente criado com éxito!"})
    })
    .catch((error) => {
        console.log(error);
    });
}

async function findAll(req, res) {
    await Cliente.findAll().
    then((data) => {
        res.send(data);
        console.log('Lista de clientes encontrada!')
    })
    .catch((error) => {
        console.log(error);
    });

}

async function findById(req, res) {
    await Cliente.findByPk(req.params.id).
    then((data) => {
        res.send(data)
        console.log('Cliente encontrado.')
    })
    .catch((error) => {
        console.log(error);
    });
}

async function update(req, res) {
    const {nombre, apellido, email, telefono} = req.body
    var cliente = {
        nombre,
        apellido,
        email,
        telefono
    };

    Cliente.update(cliente, { where: { id: req.params.id } }).
        then((data) => {
            res.status(204).json({
                message: "Cliente actualizado exitosamente!",
                tutorial: cliente
                
            })
        })
        .catch((error) => {
            console.log(error);
        });
};

async function deleteById(req, res) {
    Cliente.destroy({ where: { id: req.params.id } }).
        then((data) => {
            res.status(204).json({
                message: "Cliente apagado exitosamente!",
                tutorial: data
            })
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = postCliente;
```
<hr>

### :open_file_folder: server/src/controllers
#### :file_cabinet: <i>direccion.controller.js</i>
>Este código es un archivo de controlador para una tabla de direcciones en una base de datos. Utiliza la librería '../db/db' para importar la configuración de la base de datos y el modelo de direcciones. Luego define varias funciones asíncronas, cada una correspondiente a una operación CRUD específica (crear, encontrar todos, encontrar por ID, actualizar y eliminar por ID, encontrar por ID de cliente). Cada función maneja la lógica necesaria para realizar la operación correspondiente (por ejemplo, validando si los campos requeridos están presentes en la solicitud, buscando o actualizando un registro en la base de datos, etc.) y establece una respuesta apropiada para el cliente (por ejemplo, un mensaje de éxito o un error). Finalmente, el archivo exporta un objeto que contiene todas estas funciones para que puedan ser utilizadas en otra parte de la aplicación.

```javascript
const db = require('../db/db')
const Direccion = db.direccion;

var direccionController = {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById,
    findByClienteId: findByClienteId,
}

async function create(req, res){
    const {provincia, ciudad, calle, numero, zipcode} = req.body
    console.log(`req.body ${provincia, ciudad, calle, numero, zipcode}`)
    const clienteId = req.params.id
    console.log(`clienteId ${clienteId}`)
    if(!provincia) {
        return res.status(422).json({message: "Se requiere la provincia!"})
    }
    if(!ciudad) {
        return res.status(422).json({message: "Se requiere la ciudad!"})
    }
    if(!calle) {
        return res.status(422).json({message: "se requiere la calle!"})
    }
    if(!numero) {
        return res.status(422).json({message: "Se requiere el numero!"})
    }
    if(!zipcode) {
        return res.status(422).json({message: "Se requiere el zipcode!"})
    }
    console.log(req.body)

    const direccionReq = {
        provincia,
        ciudad,
        calle,
        numero,
        zipcode,
        clienteId,
    }
    console.log(direccionReq)
    await Direccion.create(direccionReq).
    then((data) => {
        res.send(data)
        res.status(201).json({msg: "Direccion criada com éxito!"})
    })
    .catch((error) => {
        console.log(error);
    });
}

async function findAll(req, res) {
    await Direccion.findAll().
    then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
    });

}

async function findById(req, res) {
    await Direccion.findByPk(req.params.id).
    then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.log(error);
    });
}

async function findByClienteId(req, res) {
    await Direccion.findOne({ where: { clienteId: req.params.id } }).
    then((data) => {
        res.send(data)
        console.log(`Direccion encontrado. ${data}`)
    })
    .catch((error) => {
        console.log(error);
    });
}

async function update(req, res) {
    const {provincia, ciudad, calle, numero, zipcode} = req.body
    var direccion = {
        provincia,
        ciudad,
        calle,
        numero,
        zipcode
    };

    Direccion.update(direccion, { where: { id: req.params.id } }).
        then((data) => {
            res.status(204).json({
                message: "Direccion actualizado exitosamente!",
                tutorial: direccion
                
            })
        })
        .catch((error) => {
            console.log(error);
        });
};

async function deleteById(req, res) {
    Direccion.destroy({ where: { id: req.params.id } }).
        then((data) => {
            res.status(204).json({
                message: "Direccion apagada exitosamente!",
                tutorial: data
            })
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = direccionController;

```
<hr>

### :open_file_folder: server/src/controllers
#### :file_cabinet: <i>role.controller.js</i>
>Este código maneja diferentes tipos de acceso (público, usuario, administrador y moderador) para diferentes secciones de la aplicación. Utiliza la función exports para exportar cada una correspondiente a un tipo de acceso específico.

```javascript
exports.allAccess = (req, res) => {
  res.status(200).send("Contenido público.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido del usuario.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenido del administrador.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Contenido del moderador.");
};
```

<hr>

### :open_file_folder: server/src/controllers
#### :file_cabinet: <i>direccion.controller.js</i>
>

```javascript

```

<hr>

### :open_file_folder: server/src/controllers
#### :file_cabinet: <i>direccion.controller.js</i>
>

```javascript

```