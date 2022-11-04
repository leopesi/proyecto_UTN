const User = require('../models/usuario.model');

var UserCrud = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser
}

function findAll() {
    return User.findAll();
}

function findById(id) {
    return User.findByPk(id);
}

function deleteById(id) {
    return User.destroy({ where: { id: id } });
}

function create(pesi) {
    var newUser = new Pesi(pesi);
    return newUser.save();
}

function updateUser(user, id) {
    var updateuser = {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        password: user.password,
    };
    return User.update(updateuser, { where: { id: id } });
}
module.exports = UserCrud;