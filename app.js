//Objeto
const express = require('express')
const morgan = require('morgan')

//Servidor
const app = express();

port = 8080

//Settings
app.use(express.json()) // Parser da Requisição HTTP
app.use(morgan('dev'))  //Middleware de logs
app.use(require('./src/routes/index.routes'))  //Ruta


app.listen(port, ()=> {
    console.log(`Server funcionando en el puerto ${port}!`)
})