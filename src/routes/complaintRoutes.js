const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/denuncias', complaintController.getComplaint);
router.post('/denuncias', complaintController.createComplaint );
router.delete('/denuncias/:id', complaintController.deleteComplaint);

module.exports = router;