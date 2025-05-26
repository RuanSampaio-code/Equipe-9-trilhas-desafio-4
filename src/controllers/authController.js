const { auth } = require('../config/firebase');
const { createUser, getUser } = require('../models/User');

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password });
    await createUser(userRecord.uid, { email, name, createdAt: new Date() });
    res.status(200).json({success: true, message: "Usuário registrado com sucesso"});
  } catch (error) {
    res.status(400).json({ success: false, message: 'Erro ao registrar usuário: ' + error.message} );
  }
};

const login = async (req, res) => {
  // Login com Firebase Admin não permite autenticar com email/senha diretamente.
  // Aqui você usaria o Firebase Client SDK no front-end ou outro sistema com JWT
  res.render('login', { error: 'Login precisa ser feito pelo cliente' });
};

module.exports = { register, login };
