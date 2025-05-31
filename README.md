DrawMotion - Backend

Este es el backend de la aplicación DrawMotion, una plataforma para crear dibujos con

gestos utilizando IA. Este servidor gestiona el almacenamiento de imágenes, usuarios y

autenticación mediante JWT, así como el envío de correos.

Tecnologías utilizadas

- Node.js

- Express

- MongoDB (con Mongoose)

- JWT

- Bcrypt

- Nodemailer

Estructura del proyecto

DrawMotion-Back/

├── controllers/ # Controladores de rutas

├── models/ # Modelos de Mongoose

├── routes/ # Definición de endpoints

├── services/ # Servicios auxiliares (correo, autenticación)

├── uploads/ # Carpeta de imágenes guardadas

├── config/ # Configuraciones de MongoDB, env, etc.

├── .env.example # Variables de entorno (ejemplo)

└── app.js # Archivo principal

Instalación y configuración

1. Clona el repositorio:

git clone https://github.com/tu-usuario/DrawMotion-Back.git

cd DrawMotion-Back

2. Instala las dependencias:

npm install

3. Crea el archivo .env basado en .env.example:

cp .env.example .env

4. Llena las variables del archivo .env:

PORT=5000

MONGO_URI=mongodb://<usuario>:<contraseña>@<host>:27017/drawmotion

JWT_SECRET=tu_clave_secreta

5. Inicia el servidor:

node app.js

Endpoints principales

- POST /auth/register: Registro de usuarios

- POST /auth/login: Inicio de sesión

- POST /guardar: Guardar imagen

- GET /imagenes: Obtener imágenes guardadas

- DELETE /imagenes/:id: Eliminar imagen por ID

Seguridad

- Contraseñas encriptadas con bcrypt.

- Autenticación con JWT.

- Middleware para rutas protegidas.

Notificaciones

- Se envía correo de bienvenida tras el registro.

Pruebas

Usa Postman o Thunder Client para probar los endpoints. Las rutas protegidas

requieren token en el header:

Authorization: Bearer <token>
