//Objeto
const CRUD = require('../controllers/crud');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/usuario.model')
require('dotenv').config()

//Credenciais
const SECRET = process.env.SECRET

var userController = {
    addUser: addUser,
    findUsers: findUsers,
    findUserById: findUserById,
    updateUser: updateUser,
    deleteById: deleteById
}
    
//Register User
async function addUser(req, res) {
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
    console.log(email)
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

};
/*
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
*/

//funcion
async function findUsers(req, res) {
    CRUD.findAll().

        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });

};
async function findUserById(req, res) {
    CRUD.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });

};

async function updateUser(req, res) {
    CRUD.updateUser(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
                pesi: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
};

async function deleteById(req, res) {
    CRUD.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                pesi: data
            })
        })
        .catch((error) => {
            console.log(error);
        });

};


//Modulo
module.exports = userController;