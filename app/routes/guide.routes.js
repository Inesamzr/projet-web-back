const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guide.controller');
const { verifyToken } = require('../middlewares/authJwt')

//récupération de tous les guides existants
router.get('/',guideController.getAllGuides);

//afficher les guide par plateforme
router.get('/plateforme/:plateforme', guideController.getGuidesByPlateforme);

//affichage d'un guide spécifique
router.get('/:id', guideController.getGuideById);

//création d'un guide 
router.post('/', verifyToken, guideController.createGuide);
//router.post('/', guideController.createGuide);

//mise à jour d'un guide
router.put('/:id', guideController.updateGuide);

//suppréssion d'un guide
router.delete('/:id', guideController.deleteGuide);


module.exports = router; 