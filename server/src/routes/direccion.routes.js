const { authJwt } = require("../middleware");
const direccionController = require('../controllers/direccion.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
    });
  
    app.post("/direccion/:id", direccionController.create);
    app.get("/direccion/", direccionController.findAll );
    app.get("/direccion/:id", direccionController.findById );
    app.get("/direccion/cliente/:id", direccionController.findByClienteId );
    app.put("/direccion/:id", direccionController.update  );
    app.delete("/direccion/:id", direccionController.deleteById );
  };