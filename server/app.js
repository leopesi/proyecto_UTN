require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

//Settings
app.use(cors())
app.use(express.json()) // Parser da Requisição HTTP
app.use(morgan('dev'))  //Middleware de logs
//app.use(require('./src/routes/index.routes'))  

// database
require("./src/db/db")

//Rutas
require('./src/routes/usuario.routes')(app);
require('./src/routes/auth.routes')(app);


app.listen(PORT, ()=> {
    console.log(`Server funcionando en el puerto ${PORT}!`)
})