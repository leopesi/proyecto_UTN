//Objeto
const controller = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

//Model
const User = require('../models/model')

//Credenciais
const SECRET = process.env.SECRET

//Register User
controller.registerPost = (async (req, res) => {
    console.log(req.body)
    const {nombre, apellido, email, password, confirmpassword} = req.body

    //validation
    if (!nombre) {
        return res.status(422).json({message: 'Se requiere el nombre!'})
    }
    if (!apellido) {
        return res.status(422).json({message: 'Se requiere el apellido!'})
    }
    if (!email) {
        return res.status(422).json({message: 'Se requiere el email!'})
    }
    if (!password) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (password !== confirmpassword) {
        return res.status(422).json({message: 'La confirmación de la contraseña es obligatoria'})
    }

    // Check if user exists
    const userExists = await User.findOne({ where:{ email: email}})
    if (userExists) {
        return res.status(422).json({msg: 'El usuario ya existe, registre otro email'})
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
        res.status(201).json({ msg: "Usuario creado con éxito!"})
    }catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: "Error del Servidor"
        })
    }

});

//Login
controller.loginPost = (async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body

    // Validations
    if (!email) {
        return res.status(422).json({message: 'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({message: 'A senha é obrigatória!'})
    }

    // Check if user exists
    const user = await User.findOne({ where:{ email: email}})
    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
    }

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(404).json({msg: 'Senha Inválida'})
    }

    try {
        const token = jwt.sign(
            {
                id: user._id,
            },
            SECRET,
        )
        res.status(200).json({msg:'Autenticação realizada com sucesso', token})
    } catch (err) {
        console.log(error)
        res.status(500).json({msg:'erro'})
    }
 
})

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