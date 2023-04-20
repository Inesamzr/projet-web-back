const mongoose = require("mongoose");

const Catguide = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Catguide", Catguide);
