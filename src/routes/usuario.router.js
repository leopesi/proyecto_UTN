//Ruta
const routes = require('express').Router();

//Logica
const controller = require('../controllers/usuario.controller');

routes.get('/', async (req, res) => {
    res.send('Hola Mundo!')
})
//Register Use
routes.post('/auth/register', controller.registerPost)

//Metodo de peticion
routes.get('/usuario', controller.getList);

routes.get('/usuario/:id', controller.getId);

routes.post('/usuario/create/', controller.post);

routes.put('/usuario/:id', controller.put);

routes.delete('/usuario/:id', controller.delete);

//Modulo
module.exports = routes;