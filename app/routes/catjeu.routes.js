const express = require('express');
const router = express.Router();
const catjeuController = require('../controllers/catjeu.controller')


//création d'une nouvelle catégorie de jeu
router.post('/',catjeuController.createCatjeu);

//récupération de toutes les catégories de jeux
router.get('/',catjeuController.getAllCatjeux);

//mise à jour d'une catégorie de jeu existante
router.put('/:id', catjeuController.updateCatjeu);

//suppression d'une catégorie de jeu existante
router.delete('/:id',catjeuController.deleteCatjeu);


module.exports = router;
