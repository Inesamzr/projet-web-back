const express = require("express");
const { authJwt } = require("../middlewares");
const router = express.Router();
const controller = require("../controllers/user.controller");


router.get('/users', controller.getAllUsers);

router.get("/all", controller.allAccess);

router.get("/user", [authJwt.verifyToken], controller.userBoard);

router.get("/mod",[authJwt.verifyToken, authJwt.isModerator],controller.moderatorBoard);

router.get("/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);


module.exports = router