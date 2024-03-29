const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role; 



verifyToken = (req, res, next) => {
  var token = req.headers.authorization;
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  token = token.split(' ')[1]
  console.log(token)
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};



/*isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};*/ 

isAdmin = (req, res, next) => {
  User.findById(req.userInfo)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(500).send({ message: "User not found." });
      }

      Role.find({ _id: { $in: user.roles } })
        .exec()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Admin Role!" });
        })
        .catch(error => {
          res.status(500).send({ message: error.message });
        });
    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    });
};


isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;