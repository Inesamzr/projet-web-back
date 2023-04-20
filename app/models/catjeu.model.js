const mongoose = require("mongoose");

const Catjeu = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Catjeu", Catjeu);
