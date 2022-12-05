const { authJwt } = require("../middleware");
const clienteController = require('../controllers/cliente.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
    });
  
    app.post("/cliente/", clienteController.create );
    app.get("/cliente/", clienteController.findAll );
    app.get("/cliente/:id", clienteController.findById );
    app.put("/cliente/:id", clienteController.update  );
    app.delete("/cliente/:id", clienteController.deleteById );
  };