const db = require("../db/db");

const Sequelize = require('sequelize');

const User = db.define('users3', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },


})
//Criar a tabela caso ainda não esteja criada
//User.sync();


//Verifica e faz alteração na tabela caso exista alguma
User.sync({alter: false})



module.exports = User;