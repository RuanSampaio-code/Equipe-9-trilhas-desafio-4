const admin = require('firebase-admin');
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://inova-transporte-publico.firebaseio.com", // substitua com seu projectId real
  storageBucket: "inova-transporte-publico.appspot.com" 
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, admin, auth };
