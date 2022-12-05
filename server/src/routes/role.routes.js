const { authJwt } = require("../middleware");
const roleController = require('../controllers/role.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
    });
  
    app.get("/role/all", roleController.allAccess);
    app.get("/role/user", authJwt.verifyToken, roleController.userBoard);
    app.get("/role/mod", [authJwt.verifyToken, authJwt.isModerator], roleController.moderatorBoard);
    app.get("/role/admin", [authJwt.verifyToken, authJwt.isAdmin], roleController.adminBoard);
  };