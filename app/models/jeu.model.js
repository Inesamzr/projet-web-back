const mongoose = require("mongoose");

const Jeu = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Catjeu",
      required : true
  }],
  platforms : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Plateforme",
      required : true,
  }]
});

module.exports = mongoose.model("Jeu", Jeu);
