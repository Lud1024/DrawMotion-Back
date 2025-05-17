const mongoose = require('mongoose')

const connectDB = async () => {
  try {

    console.log('✅ Conectado a MongoDB')
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error)
    process.exit(1)
  }
}

module.exports = connectDB
