const User = require('../models/usuario.model');

var UserCrud = {
    findAll: findAll,
    create: create,
    findById: findById,
    update: update,
    deleteById: deleteById,

}

function findAll() {
    return User.findAll( {attributes: {exclude: ['password'] }} );
}

function findById(id) {
    return User.findByPk(id, {attributes: {exclude: ['password'] } });
}

function deleteById(id) {
    return User.destroy({ where: { id: id } });
}

function create(user) {
    var newUser = new User(user);
    return newUser.save();
}

function update(user, id) {
    return User.update(user, { where: { id: id } });
}
module.exports = UserCrud;