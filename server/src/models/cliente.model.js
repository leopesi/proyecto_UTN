module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('client', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
        },
        apellido: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            isEmail: true,
        },
        telefono: {
            type: Sequelize.STRING,
        },
    });
    return Client
}