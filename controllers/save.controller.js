const fs = require('fs');
const path = require('path');
const Drawing = require('../models/Drawing');

exports.guardarDibujo = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!req.file || !nombre) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevoDibujo = new Drawing({
      nombre,
      filename: req.file.filename,
      userId: req.user.id, 
    });

    await nuevoDibujo.save();

    res.status(200).json({ message: 'Dibujo guardado con éxito', id: nuevoDibujo._id });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el dibujo' });
  }
};

exports.obtenerTodos = async (req, res) => {
  try {
    const dibujos = await Drawing.find({ userId: req.user.id }).sort({ fecha: -1 });
    res.json(dibujos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los dibujos' });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const dibujo = await Drawing.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!dibujo) {
      return res.status(404).json({ error: 'Dibujo no encontrado o no autorizado' });
    }

    const filePath = path.join(__dirname, '../uploads', dibujo.filename);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el dibujo' });
  }
};
