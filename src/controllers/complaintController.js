const Complaint = require('../models/Complaint');

async function getComplaint(req, res) {

  try {
    const complaints = await Complaint.getComplaints();
    res.json(complaints);
  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }

}

async function createComplaint(req, res) {
  try {
    await Complaint.createComplaint(req.body);

    res.json({success: true, message: "Denuncia criada com sucesso!"});
  } catch (error) {
    res.status(500).send(`Error getting recharge points: ${error.message}`);
  }
}

async function deleteComplaint(req, res) {
    const { id } = req.params;

    try {
      await Complaint.deleteComplaint(id);
      res.json({success: true, message: `Denúncia ${id} deletado com sucesso`});
    } catch (err) {
        res.status(500).send('Erro ao deletar');
    }
}

module.exports = {getComplaint, createComplaint, deleteComplaint}