require('dotenv').config()
const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/usuario.controller');

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

//Metodo de peticion
routes.get('/user', checkToken, userController.find);

routes.get('/user/:id', checkToken, userController.findById);

routes.put('/user/:id', checkToken, userController.update);

routes.delete('/user/:id', checkToken, userController.deleteById);

//Modulo
module.exports = routes;