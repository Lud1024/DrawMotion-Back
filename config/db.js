const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://drawmotion:claveSegura123@18.216.101.35:27017/drawdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    })
    console.log('✅ Conectado a MongoDB')
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error)
    process.exit(1)
  }
}

module.exports = connectDB
