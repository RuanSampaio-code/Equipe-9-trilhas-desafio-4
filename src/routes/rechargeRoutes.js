const express = require('express');
const router = express.Router();
const rechargeController = require('../controllers/rechargeController');

// Basic route
router.get('/ponto-recarga', rechargeController.getRechargePoints);

module.exports = router;

