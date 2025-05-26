const { db, admin } = require('../config/firebase');

async function getComplaints() {
  try {
    const complaintsSnapshot = await db.collection('tb_denuncias').get();
    const complaints = []

    for (const complaintDoc of complaintsSnapshot.docs) {
      const complaintData = complaintDoc.data();

      complaints.push({
        id: complaintDoc.id,
        ...complaintData,
      });
    }

    return complaints;

  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }
}

async function createComplaint({
    author,
    // email,
    // contact
    title, 
    description,
    localization,
    category,
    busline,   
}) {
    const reference = db.collection('tb_denuncias').doc();

    await reference.set({
      author: author || "Anônimo",
      // email,
      // contact,

      title,
      description,
      category,
      busline,

      image: "",

      latitude: localization[0],
      longitude: localization[1],
      commentCounter: 0,
      date: admin.firestore.Timestamp.now()
    });
}

async function deleteComplaint(denunciaId) {
    await db.collection('tb_denuncias').doc(denunciaId).delete();
}

module.exports = {getComplaints, createComplaint, deleteComplaint}