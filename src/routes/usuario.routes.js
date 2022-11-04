require('dotenv').config()
//Ruta
const routes = require('express').Router();

const jwt = require('jsonwebtoken');

//Logica
const controller = require('../controllers/usuario.controller');

//Credenciais
const SECRET = process.env.SECRET

// Functions
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({msg: 'Acceso no permitido!'})
    }
    try {
        jwt.verify(token, SECRET)
        next()
    } catch(error){
        res.status(400).json({msg: "Token Inválido"})
    }
}


//Register User
routes.post('/', controller.addUser)


//Login User
//routes.post('/login', controller)


//Metodo de peticion
routes.get('/', controller.findUsers);

routes.get('/:id', checkToken, controller.findUserById);

routes.put('/:id', controller.updateUser);

routes.delete('/:id', controller.deleteById);

//Modulo
module.exports = routes;