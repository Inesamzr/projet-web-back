const mongoose = require("mongoose");

const Guide = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Catguide",
    required: true
  }],
  game : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Jeu",
    required: true,
  },
  objective : {
    type : String,
    required : true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


module.exports = Guide;
