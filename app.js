require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;

// Load Firebase credentials
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// Firestore reference
const db = admin.firestore();

// Middleware
app.use(express.json());

app.get('/denuncias', async (req, res) => {

  try {
    const snapshot = await db.collection('tb_denuncias').get();

    if (snapshot.empty) {
      return res.status(404).send('Denuncias não encontradas!');
    }

    const complaints = [];
    snapshot.forEach(doc => {
      complaints.push({ id: doc.id, ...doc.data() });
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }

});

app.post('/denuncias', async (req, res) => {
  try {
    const { titulo, descricao, localizacao } = req.body;
    const reference = db.collection('tb_denuncias').doc();

    await reference.set({
      titulo,
      descricao,
      like: 0,
      imagem: "",
      localizacao: new admin.firestore.GeoPoint(localizacao[0], localizacao[1]),
      data: admin.firestore.Timestamp.now()
    })

    res.json({success: true, message: "Denuncia criada com sucesso!"});
  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }

});

app.delete('/denuncias/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('tb_denuncias').doc(id).delete();
    res.json({success: true, message: `Denúncia ${id} deletado com sucesso`});
  } catch (err) {
    res.status(500).send('Erro ao deletar');
  }
});

// Basic route
app.get('/ponto-recarga', async (req, res) => {
  try {
    const snapshot = await db.collection('tb_pontos_recarga').get();

    if (snapshot.empty) {
      return res.status(404).send('Pontos de recarga não encontrados!');
    }

    const rechargePoints = [];
    snapshot.forEach(doc => {
      rechargePoints.push({ id: doc.id, ...doc.data() });
    });

    res.json(rechargePoints);
  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
