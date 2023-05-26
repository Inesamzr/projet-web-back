const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  /*const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });*/

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }

  console.log(user)

  
    if (req.body.roles) {
      Role.find(
      {
        role: { $in: req.body.roles },
      })
        .then((roles) => {
          user.roles = roles.map((role) => role._id);
          console.log(user)
          User.create(user)
          .then(user => {
            return res.status(201).send(user)
          })
          .catch(err => {
            res.status(500).send({ message: err });
            return;
          });
        })
        .catch(err => {
          res.status(500).send({ message: err });
          return;
        });
    } else {
      Role.findOne({ name: "user" })
      .then(role => {
        user.roles = [role._id];
        User.create(user)
          .then(() => {
            res.send({ message: "User was registered successfully!" }).status(201)
          })
          .catch()
      });
    }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 }); // 24 hours


    const authorities = user.roles.map(role => role.name)

    console.log(authorities)

    req.session.token = token;
    
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token: token
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};