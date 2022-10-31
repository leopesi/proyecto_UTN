//Objeto
const controller = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

//Model
const User = require('../models/model')

//Credenciais
const SECRET = process.env.SECRET

//Register Use
controller.registerPost = (async (req, res) => {
    console.log(req.body)
    const {nombre, apellido, email, password, confirmpassword} = req.body

    //validation
    if (!nombre) {
        return res.status(422).json({message: 'O nome é obrigatório!'})
    }
    if (!apellido) {
        return res.status(422).json({message: 'O nome é obrigatório!'})
    }
    if (!email) {
        return res.status(422).json({message: 'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({message: 'A senha é obrigatória!'})
    }
    if (password !== confirmpassword) {
        return res.status(422).json({message: 'A senha não confere com a anterior'})
    }

    // Check if user exists
    const userExists = await User.findOne({ where:{ email: email}})
    if (userExists) {
        return res.status(422).json({msg: 'Por favor insira outro email'})
    }
    // Create Password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    // Create User
    const user = new User({
        nombre,
        apellido,
        email,
        password: passwordHash,
    })
    try {
        await user.save()
        res.status(201).json({ msg: "Usuário criado com sucesso!"})
    }catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: "Erro no Servidor"
        })
    }

});

//funcion
controller.getList = (async (req, res) => {
    res.send('Cadastro GET List')

});

controller.getId = (async (req, res) => {
    res.send('Cadastro GET Id')

});

controller.post = (async (req, res) => {
    res.send("Cadastro POST");  

});

controller.put = (async (req, res) => {
    res.send('Cadastro PUT')

});

controller.delete = (async (req, res) => {
    res.send('Cadastro DELETE')

});

//Modulo
module.exports = controller;