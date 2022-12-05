const db = require('../db/db')
const Direccion = db.direccion;

var direccionController = {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById,
}

async function create(req, res){
    const {provincia, ciudad, calle, numero, zipcode} = req.body
    if(!provincia) {
        return res.status(422).json({message: "Se requiere la provincia!"})
    }
    if(!ciudad) {
        return res.status(422).json({message: "Se requiere la ciudad!"})
    }
    if(!calle) {
        return res.status(422).json({message: "se requiere la calle!"})
    }
    if(!numero) {
        return res.status(422).json({message: "Se requiere el numero!"})
    }
    if(!zipcode) {
        return res.status(422).json({message: "Se requiere el zipcode!"})
    }
    console.log(req.body)

    const direccionReq = {
        provincia,
        ciudad,
        calle,
        numero,
        zipcode
    }
    try {
        await Direccion.create(direccionReq)
        res.status(201).json({msg: "Direccion criada com éxito!"})
    }
    catch {
        res.status(500).json({msg: "Error del Servidor!"})
    }
}

async function findAll(req, res) {
    await Direccion.findAll().
    then((data) => {
        res.send(data);
        console.log('Lista de direcciones encontrada!')
    })
    .catch((error) => {
        console.log(error);
    });

}

async function findById(req, res) {
    await Direccion.findByPk(req.params.id).
    then((data) => {
        res.send(data)
        console.log('Direccion encontrado.')
    })
    .catch((error) => {
        console.log(error);
    });
}

async function update(req, res) {
    const {provincia, ciudad, calle, numero, zipcode} = req.body
    var direccion = {
        provincia,
        ciudad,
        calle,
        numero,
        zipcode
    };

    Direccion.update(direccion, { where: { id: req.params.id } }).
        then((data) => {
            res.status(200).json({
                message: "Direccion actualizado exitosamente!",
                tutorial: direccion
                
            })
        })
        .catch((error) => {
            console.log(error);
        });
};

async function deleteById(req, res) {
    Direccion.destroy({ where: { id: req.params.id } }).
        then((data) => {
            res.status(200).json({
                message: "Direccion apagada exitosamente!",
                tutorial: data
            })
        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = direccionController;

