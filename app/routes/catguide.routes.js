const express = require("express");
const router = express.Router();
const catguideController = require("../controllers/catguide.controller");

//création d'une nouvelle catégorie de guide
router.post("/",catguideController.createCatguide);

//récuparation de toutes les catégories de guides 
router.get("/",catguideController.getAllCatguides);

//mise à jour d'une catégorie de guide 
router.put("/:id",catguideController.updateCatguide);

//suppression d'une catégorie de guide 
router.delete("/:id", catguideController.deleteCatguide);

module.exports = router;