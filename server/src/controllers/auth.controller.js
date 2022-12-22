require('dotenv').config()
const db = require("../db/db");
const SECRET = process.env.SECRET;
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  // Save User to Database
  const {nombre, apellido, email, password} = req.body
  if(!nombre) {
    return res.status(422).json({message: 'Se requiere el nombre!'})
  }
  if(!apellido) {
    return res.status(422).json({message: 'Se requiere el apellido!'})
  }
  if(!email) {
    return res.status(422).json({message: 'Se requiere el email'})
  }
  if(!password) {
    return res.status(422).json({message: 'La contraseña es obliatoria!'})
  }
  // Create Password
  const salt = 8
  const passwordHash = bcrypt.hashSync(password, salt)

  // Create User
  const newUser = {
      nombre,
      apellido,
      email,
      password: passwordHash,
  }

  User.create(newUser)
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuario registrado con éxito!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Usuario registrado con éxito!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      nombre: req.body.nombre
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};