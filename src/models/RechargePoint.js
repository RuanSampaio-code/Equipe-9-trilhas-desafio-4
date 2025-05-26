const { db, admin } = require('../config/firebase');

async function getRechargePoints() {
    const snapshot = await db.collection('tb_pontos_recarga').get();

    if (snapshot.empty) {
      return [];
    }

    const rechargePoints = [];
    snapshot.forEach(doc => {
      rechargePoints.push({ id: doc.id, ...doc.data() });
    });   

    return rechargePoints;
}

module.exports = {getRechargePoints}