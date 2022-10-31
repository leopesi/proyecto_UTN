const Sequelize = require('sequelize')
require('dotenv').config()

//Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const sequelize = new Sequelize('teste', dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('Conexão com o banco de dados bem sucedida!');
}).catch(function(){
    console.log('Erro de conexão');
})

module.exports = sequelize