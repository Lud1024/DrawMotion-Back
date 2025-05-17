const mongoose = require('mongoose')

const DrawingSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  filename: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Drawing', DrawingSchema)
