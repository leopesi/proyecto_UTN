//Ruta
const routes = require('express').Router();

//Logica
const controller = require('../controllers/usuario.controller');

//Metodo de peticion
routes.get('/usuario', controller.getList);

routes.get('/usuario/:id', controller.getId);

routes.post('/usuario/create/', controller.post);

routes.put('/usuario/:id', controller.put);

routes.delete('/usuario/:id', controller.delete);

//Modulo
module.exports = routes;