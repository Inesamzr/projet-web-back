const { user } = require("../models");
const User = require("../models/user.model")


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


exports.getAllUsers = (req, res) => {
  User.find().populate('roles')
    .then(users => {
      //users.roles = users.roles.map(role => role.name)
      /*users.map(user => {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles.map(r => {
            console.log(r["role"])
            return r.role
          })
        }
      })*/
      res.status(200).send(users)
    })
}