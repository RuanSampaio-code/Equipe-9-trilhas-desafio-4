const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/comentarios/:denunciaId', commentController.getComments);
router.post('/comentarios/:denunciaId', commentController.createComment);

module.exports = router;