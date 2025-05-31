const nodemailer = require('nodemailer');

// Verifica que las variables de entorno estén definidas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ EMAIL_USER o EMAIL_PASS no están definidos en el archivo .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Confirmar conexión con el servidor SMTP al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error verificando conexión SMTP:', error);
  } else {
    console.log('📧 Servidor de correo listo para enviar mensajes');
  }
});

const sendSuccessRegistration = async (to, name) => {
  try {
    const mailOptions = {
      from: `"DrawMotion" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Registro exitoso',
      html: `
        <h2>Hola ${name},</h2>
        <p>¡Gracias por registrarte en <strong>DrawMotion</strong>!</p>
        <p>Estamos emocionados de que empieces a usar la plataforma.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Correo de registro enviado a ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error al enviar correo de registro a ${to}:`, error);
  }
};

const sendPasswordRecovery = async (to, token) => {
  try {
    const url = `http://localhost:5173/recuperar/${token}`;
    const mailOptions = {
      from: `"DrawMotion" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Recuperar contraseña',
      html: `
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${url}">${url}</a>
        <p>Este enlace es válido por 15 minutos.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Correo de recuperación enviado a ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error al enviar correo de recuperación a ${to}:`, error);
  }
};

module.exports = {
  sendSuccessRegistration,
  sendPasswordRecovery
};
