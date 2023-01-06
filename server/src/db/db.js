const Sequelize = require('sequelize')
require('dotenv').config()
var bcrypt = require("bcrypt");
const { DB_DATABASE, DB_USER, DB_PASS, DB_HOST, DB_PORT} = require('../config.js')

//Credenciais


const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
    host: DB_HOST,
    //port: DB_PORT,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('¡Conexión con db exitosa!');
}).catch(function(){
    console.log('error de conexión!');
})

sequelize.sync({force: true}).then(() => {
  Role.bulkCreate([
    {
      "id" : 1,
      "name" : "user"
    },
    {
      "id" : 2,
      "name" : "moderator"
    },
    {
      "id" : 3,
      "name" : "admin"
    }
  ]);
  User.create(
    {
      "nombre": "guest",
      "apellido": "silva",
      "email": "guest@guest.com",
      "password": bcrypt.hashSync("123456", 8),
  }
  ).then(user => {
    user.setRoles([3])
  });

  User.create(
    {
      "nombre": "guest2",
      "apellido": "peres",
      "email": "peres@guest.com",
      "password": bcrypt.hashSync("123456", 8),
  }
  ).then(user => {
    user.setRoles([1])
  });

  Cliente.bulkCreate([
    {
      "nombre": "Carl",
      "apellido": "Sagan",
      "email": "carlsagan34@viking.com",
      "telefono": "9542687521"
  },
  {
    "nombre": "Murphy",
    "apellido": "Cooper",
    "email": "MurphysCooper@lazaro.com",
    "telefono": "9542687521"
  },
  {
    "nombre": "Ayrton",
    "apellido": "Senna",
    "email": "ayrtonsenna@turner.com",
    "telefono": "9542687521"
  }
  ]
)

  Direccion.bulkCreate([
    {
      "provincia": "Minas Gerais",
      "ciudad": "Araguari",
      "calle": "Dinorah Pacca",
      "numero": "355",
      "zipcode": "38442052",
      "clienteId": "1"
  },
  {
    "provincia": "Buenos Aires",
    "ciudad": "Buenos Aires",
    "calle": "Gurriti",
    "numero": "355",
    "zipcode": "38442052",
    "clienteId": "2"
},
{
  "provincia": "Minas Gerais",
  "ciudad": "Uberlândia",
  "calle": "Olegário Maciel",
  "numero": "1001",
  "zipcode": "38442052",
  "clienteId": "3"
}])
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/usuario.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.cliente = require('../models/cliente.model')(sequelize, Sequelize);
db.direccion = require('../models/direccion.model')(sequelize, Sequelize)

const Role = db.role;
const Cliente = db.cliente;
const Direccion = db.direccion;
const User = db.user;

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.cliente.hasMany(db.direccion, { as: "direccion" });
db.direccion.belongsTo(db.cliente, {
  foreignKey: "clienteId",
  as: "cliente",
});

db.ROLES = ["user",  "moderator","admin",];

module.exports = db;