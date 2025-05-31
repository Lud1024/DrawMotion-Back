const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  nombre: String,
  filename: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Drawing', drawingSchema);
