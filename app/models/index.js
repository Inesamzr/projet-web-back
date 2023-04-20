const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.guide = require("./guide.model");
db.jeu = require("./jeu.model");
db.plateforme = require("./plateforme.model");
db.catjeu = require("./catjeu.model");
db.catguide = require("./catguide.model");


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;