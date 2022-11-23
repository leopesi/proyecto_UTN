require('dotenv').config()
const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/usuario.controller');

//Credenciais
const SECRET = process.env.SECRET
const API_URL = "http://localhost:8080/api/test/";

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(API_URL + "all", 
    controller.allAccess);
  
    app.get(API_URL + "user",
      [authJwt.verifyToken],
      controller.userBoard
    );
  
    app.get(API_URL + "mod",
      [authJwt.verifyToken, 
      authJwt.isModerator],
      controller.moderatorBoard
    );
  
    app.get(API_URL + "admin",
      [authJwt.verifyToken, 
      authJwt.isAdmin],
      controller.adminBoard
    );
  };
/*
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
routes.post('/user/search', userController.search);
routes.get('/user', userController.find);
routes.get('/user/:id', userController.findById);
routes.put('/user/:id', userController.update);
routes.delete('/user/:id', checkToken, userController.deleteById);

//Modulo
module.exports = routes;*/