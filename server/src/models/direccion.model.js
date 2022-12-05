module.exports = (sequelize, Sequelize) => {
    const Direccion = sequelize.define('Direccion', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        provincia: {
            type: Sequelize.STRING,
        },
        ciudad: {
            type: Sequelize.STRING,
        },
        calle: {
            type: Sequelize.STRING,
        },
        numero: {
            type: Sequelize.INTEGER,
        },
        zipcode: {
            type: Sequelize.STRING,
        },
    });
    return Direccion
}