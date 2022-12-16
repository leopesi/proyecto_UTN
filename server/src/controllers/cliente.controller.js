const db = require('../db/db')
const Cliente = db.cliente;

var postCliente = {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById,
}

async function create(req, res){
    const {nombre, apellido, email, telefono} = req.body
    if(!nombre) {
        return res.status(422).json({message: "Se requiere el nombre!"})
    }
    if(!apellido) {
        return res.status(422).json({message: "Se requiere el apellido!"})
    }
    if(!email) {
        return res.status(422).json({message: "se requiere el email!"})
    }
    if(!telefono) {
        return res.status(422).json({message: "Se requiere el telefono!"})
    }
    console.log(req.body)

    const clienteReq = {
        nombre,
        apellido,
        email,
        telefono
    }
    await Cliente.create(clienteReq).
    then((result) => {
        res.send({ id: result.id})
        res.status(201).json({msg: "Cliente criado com éxito!"})
    })
    .catch((error) => {
        console.log(error);
    });
}

async function findAll(req, res) {
    await Cliente.findAll().
    then((data) => {
        res.send(data);
        console.log('Lista de clientes encontrada!')
    })
    .catch((error) => {
        console.log(error);
    });

}

async function findById(req, res) {
    await Cliente.findByPk(req.params.id).
    then((data) => {
        res.send(data)
        console.log('Cliente encontrado.')
    })
    .catch((error) => {
        console.log(error);
    });
}

async function update(req, res) {
    const {nombre, apellido, email, telefono} = req.body
    var cliente = {
        nombre,
        apellido,
        email,
        telefono
    };

    Cliente.update(cliente, { where: { id: req.params.id } }).
        then((data) => {
            res.status(204).json({
                message: "Cliente actualizado exitosamente!",
                tutorial: cliente
                
            })
        })
        .catch((error) => {
            console.log(error);
        });
};

async function deleteById(req, res) {
    Cliente.destroy({ where: { id: req.params.id } }).
        then((data) => {
            res.status(204).json({
                message: "Cliente apagado exitosamente!",
                tutorial: data
            })
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = postCliente;