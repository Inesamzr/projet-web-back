const mongoose = require("mongoose");

const Plateforme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Plateforme", Plateforme);
