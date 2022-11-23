//Objeto
const CRUD = require('../controllers/crud');
const bcrypt = require('bcrypt')
const User = require('../models/usuario.model');
require('dotenv').config()

//Credenciais
const SECRET = process.env.SECRET

var userController = {
    search: search,
    find: find,
    findById: findById,
    update: update,
    deleteById: deleteById
}
//funcion

async function search(req, res) {
    const { nombre, apellido, email } = req.body;

  let mysql =
    "SELECT * from users4s WHERE nombre = ? AND apellido = ? AND email = ?";
  db.query(mysql, [nombre, apellido, email], (err, result) => {
    if (err) res.send(err);
    res.send(result);
    console.log(`Result --> ${result}`)
  });
}

async function find(req, res) {
    CRUD.findAll().

        then((data) => {
            res.send(data);
            console.log('Lista de usuarios encontrada.')
        })
        .catch((error) => {
            console.log(error);
        });

};
async function findById(req, res) {
    CRUD.findById(req.params.id).
        then((data) => {
            res.send(data)
            console.log('Usuário encontrado.')
        })
        .catch((error) => {
            console.log(error);
        });
};

async function update(req, res) {
    const {nombre, apellido, email} = req.body
    var user = {
        nombre,
        apellido,
        email,
    };
    CRUD.update(user, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User updated successfully",
                usuario: user
                
            })
            console.log('Usuário atualizado.')
        })
        .catch((error) => {
            console.log(error);
        });
};

async function deleteById(req, res) {
    CRUD.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User deleted successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });

};


//Modulo
module.exports = userController;