//Objeto
const controller = {}

//funcion
controller.getList = (async (req, res) => {
    res.send('Cadastro GET List')

});

controller.getId = (async (req, res) => {
    res.send('Cadastro GET Id')

});

controller.post = (async (req, res) => {
    res.send("Cadastro POST");  

});

controller.put = (async (req, res) => {
    res.send('Cadastro PUT')

});

controller.delete = (async (req, res) => {
    res.send('Cadastro DELETE')

});

//Modulo
module.exports = controller;