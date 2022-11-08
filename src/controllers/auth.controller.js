//Objeto
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/usuario.model')
const CRUD = require('../controllers/crud');

require('dotenv').config()

//Credenciais
const SECRET = process.env.SECRET

var authController = {
    register: register,
    login: login,
    //logout: logout,
}
//Register User
async function register(req, res) {
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
    console.log(email)
    if (userExists) {
        return res.status(422).json({msg: 'El usuario ya existe, registre otro email'})
    }
    // Create Password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    // Create User
    const user = {
        nombre,
        apellido,
        email,
        password: passwordHash,
    }
    try {
        await CRUD.create(user) //todo
        res.status(201).json({ msg: "Usuario creado con éxito!"})
        console.log('Usuario creado com éxito!')
    }catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: "Error del Servidor"
        })
    }

};


 
//Login
async function login(req, res) {
    const {email, password} = req.body

    // Validations
    if (!email) {
        return res.status(422).json({message: 'Se requiere el email!!'})
    }
    if (!password) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }

    // Check if user exists
    const user = await User.findOne({ where:{ email: email}})
    if (!user) {
        return res.status(404).json({msg: 'Usuario no encontrado'})
    }

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(404).json({msg: 'Contraseña invalida'})
    }

    try {
        const token = jwt.sign(
            {
                id: user._id,
            },
            SECRET,
        )
        res.status(200).json({msg:'Autenticación realizada con éxito', token})
        console.log(`Usuario ${email} conectado`)
    } catch (err) {
        console.log(error)
        res.status(500).json({msg:'erro'})
    }
 
}

//Modulo
module.exports = authController;