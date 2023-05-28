const express = require('express');
const router = express.Router();
const { addFavoriteGuide, removeFavoriteGuide, getGuideFavoriteStatus } = require('../controllers/favorites.controller.js');
const { verifyToken } = require('../middlewares/authJwt.js');

// Ajouter un guide aux favoris d'un utilisateur
router.post('/add', verifyToken,addFavoriteGuide);

// Supprimer un guide des favoris d'un utilisateur
router.delete('/remove/:guideId',verifyToken, removeFavoriteGuide);

// Obtenir le statut de favori d'un guide pour un utilisateur
router.get('/:guideId', getGuideFavoriteStatus); 

module.exports = router;
