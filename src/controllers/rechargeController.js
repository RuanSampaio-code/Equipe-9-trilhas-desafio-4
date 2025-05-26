const { db, admin } = require('../config/firebase');
const RechargePoint = require('../models/RechargePoint');

async function getRechargePoints(req, res) {
  try {
    const rechargePoints = await RechargePoint.getRechargePoints();

    res.json(rechargePoints);
  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }

}

module.exports = { getRechargePoints }