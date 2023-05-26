const express = require("express");
const { authJwt } = require("../middlewares");
const router = express.Router();
const controller = require("../controllers/user.controller");

// Importer le contrôleur pour les fonctionnalités des favoris
//const favoritesController = requir(AJOUTER UN E)("../controllers/favorites.controller");



router.get('/users', controller.getAllUsers);

router.get("/all", controller.allAccess);

router.get("/user", [authJwt.verifyToken], controller.userBoard);

router.get("/mod",[authJwt.verifyToken, authJwt.isModerator],controller.moderatorBoard);

router.get("/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

// Ajouter un guide aux favoris d'un utilisateur
//router.post('/users/favorites', [authJwt.verifyToken], favoritesController.addFavoriteGuide);

// Supprimer un guide des favoris d'un utilisateur
//router.delete('/users/favorites/:guideId', [authJwt.verifyToken], favoritesController.removeFavoriteGuide);

module.exports = router