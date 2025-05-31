const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendSuccessRegistration, sendPasswordRecovery } = require('../services/mailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Correo ya registrado' });

    const user = new User({ name, email, password });
    await user.save();
    await sendSuccessRegistration(email, name);
    res.status(201).json({ msg: 'Usuario registrado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.recover = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Correo no registrado' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await sendPasswordRecovery(email, token);
    res.json({ msg: 'Correo de recuperación enviado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    user.password = newPassword;
    await user.save();

    res.json({ msg: 'Contraseña actualizada correctamente' });
  } catch (e) {
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
};
