const express = require('express');
const router = express.Router();
const guideController = require('../controllers/recherche.controller');

// Route de recherche de guides
router.get('/guides', guideController.searchGuides);

module.exports = router;
