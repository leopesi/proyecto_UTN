const Sequelize = require('sequelize')

const sequelize = new Sequelize('teste', 'root','Meta1001', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('Conexão bem sucedida!');
}).catch(function(){
    console.log('Erro de conexão');
})

module.exports = sequelize