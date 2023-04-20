const express = require("express");
const router = express.Router();
const plateformeController = require("../controllers/plateforme.controller")


//création d'une nouvelle plateforme
router.post("/", plateformeController.createPlateforme);

//récupération de toutes les plateformes
router.get("/", plateformeController.getAllPlateformes);


//mise à jour d'une plateforme existante
router.put("/:id", plateformeController.updatePlateforme);

//suppression d'une plateforme existante
router.delete("/:id", plateformeController.deletePlateforme);

module.exports = router;