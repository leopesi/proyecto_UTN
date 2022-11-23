const userController = require('../controllers/usuario.controller');
const API_URL = "/api/test/";

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
    });
  
    app.get(API_URL + "all", userController.allAccess);
  
    //app.get(API_URL + "user", [authJwt.verifyToken], userController.userBoard);
  
    //app.get(API_URL + "mod", [authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard);
  
    //app.get(API_URL + "admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);
  };