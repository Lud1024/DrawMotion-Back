const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { guardarDibujo, obtenerTodos, obtenerPorId } = require('../controllers/save.controller')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), guardarDibujo)
router.get('/', obtenerTodos)
router.get('/:id', obtenerPorId)

module.exports = router
