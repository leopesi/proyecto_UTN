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
        return res.status(401).json({msg: 'Acesso negado!'})
    }
    try {
        jwt.verify(token, SECRET)
        next()
    } catch(error){
        res.status(400).json({msg: "Token Inválido"})
    }
}

routes.get('/', async (req, res) => {
    res.send('Hola Mundo!')
})
//Register User
routes.post('/auth/register', controller.registerPost)

//Login User
routes.post('/auth/login', controller.loginPost)

//Metodo de peticion
routes.get('/usuario', controller.getList);

routes.get('/usuario/:id', checkToken, controller.getId);

routes.post('/usuario/create/', controller.post);

routes.put('/usuario/:id', controller.put);

routes.delete('/usuario/:id', controller.delete);

//Modulo
module.exports = routes;