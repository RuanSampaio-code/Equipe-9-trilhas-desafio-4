const { db } = require('../config/firebase');

async function createUser(uid, data) {
  return db.collection('users').doc(uid).set(data);
}

async function getUser(uid) {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? doc.data() : null;
}

module.exports = { createUser, getUser };
