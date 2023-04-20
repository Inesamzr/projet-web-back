const express = require('express');
const router = express.Router();
const { imageMiddleware } = require("../middlewares/imageMiddleware");
const jeuController = require('../controllers/jeu.controller');

//création d'un nouveau jeu
router.post('/', imageMiddleware,jeuController.createJeu);

//récupération d'un jeu spécifique par son ID
router.get('/:id', jeuController.getJeuById);

//récupération de tous les jeux
router.get('/', jeuController.getAllJeux);


//mise à jour d'un jeu existant
router.put('/:id', imageMiddleware, jeuController.updateJeu);

//suppression d'un jeu existant
router.delete(':/id', jeuController.deleteJeu);

module.exports = router;