const Comment = require('../models/Comment');

async function getComments(req, res) {
  const { denunciaId } = req.params;

  try {
    const comentarios = await Comment.getComments(denunciaId);

    res.json({
      success: true, 
      message: `Cometários de ${denunciaId} recuperados`, 
      data: comentarios});
  } catch (err) {
    res.status(500).send('Algo de errado aconteceu ao recuperar comentários');
  }
}

async function createComment(req,res) {
  const { denunciaId } = req.params;

  try {
    const { comment, author } = req.body;

    await Comment.createComment({denunciaId, comment, author});

    res.json({success: true, message: `Comentário registrado com sucesso!`});
  } catch (err) {
    res.status(500).send('Erro ao comentar');
  }
}

module.exports = { getComments, createComment }