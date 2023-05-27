const express = require('express');
const router = express.Router();
const { addFavoriteGuide, removeFavoriteGuide } = require('../controllers/favorites.controller.js');
const { verifyToken } = require('../middlewares/authJwt.js');

// Ajouter un guide aux favoris d'un utilisateur
router.post('/favorites/add', verifyToken,addFavoriteGuide);

// Supprimer un guide des favoris d'un utilisateur
router.delete('/favorites/remove/:guideId',verifyToken, removeFavoriteGuide);

module.exports = router;
