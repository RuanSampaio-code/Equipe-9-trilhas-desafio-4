const { db, admin } = require('../config/firebase');
    
async function getComments(denunciaId) {
    const snapshot = await db.collection('tb_denuncias')
      .doc(denunciaId)
      .collection('comments')
      .get();
 
    if (snapshot.empty) {
      return [];
    }

    const comentarios = [];
    snapshot.forEach(doc => {
      comentarios.push({ id: doc.id, ...doc.data() });
    });     

    return comentarios;
}

async function createComment({
  denunciaId, 
  comment, 
  author
}) {
    const complaintRef = db.collection('tb_denuncias').doc(denunciaId);

    await complaintRef
      .collection('comments')
      .add({
        comment,
        author: author || "Anônimo",
        createdAt: admin.firestore.Timestamp.now(),
      });   

    await complaintRef.update({
      commentCounter: admin.firestore.FieldValue.increment(1),
    });
}

module.exports = {getComments, createComment}