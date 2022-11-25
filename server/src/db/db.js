const Sequelize = require('sequelize')
require('dotenv').config()

//Credenciais
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('¡Conexión con db exitosa!');
}).catch(function(){
    console.log('error de conexión!');
})

sequelize.sync({alter: true})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/usuario.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

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

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;