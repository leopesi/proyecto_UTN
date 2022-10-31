const express = require('express')
const morgan = require('morgan')

require('dotenv').config()

const app = express();

// Parser da Requisição HTTP
app.use(express.json())

//Middleware de logs
app.use(morgan('dev'))

const models = require('./src/models/model')
port = 8080

//Ruta
app.use(require('./src/routes/usuario.router'))

app.get('/', async (req, res) => {
    res.send('Hola Mundo!')
})

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
})