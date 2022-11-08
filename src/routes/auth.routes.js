require('dotenv').config()
//Ruta
const routes = require('express').Router();
const authController = require('../controllers/auth.controller');


//Login User
routes.post('/auth/register', authController.register )
routes.post('/auth/login', authController.login )


//Modulo
module.exports = routes;