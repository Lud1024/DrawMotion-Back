const fs = require('fs')
const path = require('path')
const Drawing = require('../models/Drawing')

exports.guardarDibujo = async (req, res) => {
  try {
    const { nombre } = req.body
    if (!req.file || !nombre) {
      console.log('❌ Petición inválida. Falta archivo o nombre.')
      return res.status(400).json({ error: 'Faltan datos' })
    }

    const nuevoDibujo = new Drawing({
      nombre,
      filename: req.file.filename
    })

    await nuevoDibujo.save()

    console.log(`✅ Dibujo guardado: ${nombre} -> ${req.file.filename}`)
    res.status(200).json({ message: 'Dibujo guardado con éxito', id: nuevoDibujo._id })
  } catch (error) {
    console.error('❌ Error en guardarDibujo:', error)
    res.status(500).json({ error: 'Error al guardar el dibujo' })
  }
}

exports.obtenerTodos = async (req, res) => {
  try {
    const dibujos = await Drawing.find().sort({ fecha: -1 })
    res.json(dibujos)
  } catch (error) {
    console.error('❌ Error al obtener dibujos:', error)
    res.status(500).json({ error: 'Error al obtener los dibujos' })
  }
}

exports.obtenerPorId = async (req, res) => {
  try {
    const dibujo = await Drawing.findById(req.params.id)
    if (!dibujo) {
      return res.status(404).json({ error: 'Dibujo no encontrado' })
    }

    const filePath = path.join(__dirname, '../uploads', dibujo.filename)
    res.sendFile(filePath)
  } catch (error) {
    console.error('❌ Error al obtener dibujo por ID:', error)
    res.status(500).json({ error: 'Error al obtener el dibujo' })
  }
}
