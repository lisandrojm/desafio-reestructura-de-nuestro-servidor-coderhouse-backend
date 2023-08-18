# desafio_reestructura-de-nuestro-servidor

# DESAFÍO ENTREGABLE - Reestructura de nuestro servidor - Coderhouse/Backend

Este repositorio contiene la reestructura de nuestro servidor con las siguientes características:

### Modelo de capas:

- El proyecto se ha construido siguiendo los principios de la Arquitectura Orientada a Servicios (SOA), la cual se basa en la creación de componentes individuales denominados "servicios". Cada uno de estos servicios cumple una función particular y establece comunicación con otros servicios utilizando estándares abiertos. Esta estructura promueve la mejora de la flexibilidad, fomenta la reutilización de elementos y facilita la integración fluida de sistemas.

### Aspectos incluidos:

- El proyecto cuenta con capas de routing, controladores, servicios, con las vistas bien separadas y con las responsabilidades
  delegadas.

### Configuración de Variables de Entorno (.env)

- La información delicada está almacenada en un archivo .env. Esto nos permite acceder a estos datos a través de variables de entorno, mejorando la seguridad y organización de nuestra aplicación.

## Requisitos

Asegúrate de tener los siguientes requisitos instalados en tu entorno de desarrollo:

- Node.js
- MongoDB

## Instrucciones de instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/lisandrojm/desafio_refactor-a-nuestro-login
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd desafio_refactor-a-nuestro-login
   ```

3. Instala las dependencias del proyecto ejecutando el siguiente comando:

   ```bash
   npm install
   ```

4. Configura la conexión a la base de datos MongoDB y todas las variables de entorno en el archivo `.env`. Puedes copiar el archivo `.env.example` y renombrarlo a `.env`, luego actualiza los valores con tu configuración:

   ```bash
   cp .env.example .env
   ```

   Asegúrate de tener MongoDB en ejecución , la URL de conexión correcta y todas las variables de entorno configuradas en el archivo `.env`.

5. Inicia la aplicación con el siguiente comando:

   ```bash
   npm start
   ```

   Esto iniciará el servidor Node.js y estará escuchando en el puerto especificado en el archivo `.env`.

6. Accede a la aplicación en tu navegador web ingresando la siguiente URL:

   ```
   http://localhost:<PUERTO_DE_LA_APP>
   ```

   Asegúrate de reemplazar `<PUERTO_DE_LA_APP>` con el número de puerto especificado en el archivo `.env`.

7. Ahora podrás utilizar la vista de Login en la aplicación.

## Credenciales de Admin para testing de roles de usuario:

### Email:

```
adminCoder@coder.com
```

### Password:

```
adminCod3r123
```

## Video Testing

Video

## Estructura del proyecto (directorios relevantes para el desafío)

Aquí tienes la estructura del proyecto con descripciones para cada directorio:

El proyecto sigue la siguiente estructura de directorios:

- `/src/config`: Contiene los archivos de configuración de la aplicación.

  - `/src/config/index.js`: Archivo de configuración que exporta variables de entorno y configuraciones generales.
  - `/src/config/mongo.js`: Archivo de configuración de Mongoose para establecer la conexión a la base de datos MongoDB.
  - `/src/config/passport.js`: Archivo de configuración de Passport para generar las estrategias de autenticación y autorización,.

- `/src/components/auth`: Contiene los archivos relacionados con la funcionalidad de la autenticación y autorización.

  - `/src/components/auth/index.js`: Archivo de entrada que exporta los componentes relacionados.
  - `/src/components/auth/authController/authController.js`: Controlador de los distintos metodos de autenticación y autorización.
  - `/src/components/auth/authServices/authServices.js`: Servicios de los métodos que implementen servicios.

- `/src/components/sessions`: Contiene los archivos relacionados con la funcionalidad de las sessions.

  - `/src/components/sessions/index.js`: Archivo de entrada que exporta los componentes relacionados.
  - `/src/components/sessions/sessionsController/sessionsController.js`: Controlador de los distintos metodos de las sessions.
  - `/src/components/sessions/sessionsServices/sessionsServices.js`: Servicios de los métodos que implementen servicios.

- `/.env.example`: Archivo de ejemplo que muestra la estructura y variables de entorno requeridas para la configuración de la aplicación.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- Express.js (v4.18.2): Framework de Node.js para construir aplicaciones web.
- UUID (v9.0.0): Biblioteca para generar identificadores únicos.
- Cors (v2.8.5): Middleware para permitir peticiones HTTP entre diferentes dominios.
- Dotenv (v16.3.1): Carga variables de entorno desde un archivo .env.
- Express-handlebars (v7.0.7): Motor de plantillas para Express.js.
- MongoDB (v5.6.0): Driver de MongoDB para Node.js.
- Mongoose (v7.3.1): Modelado de objetos de MongoDB para Node.js.
- Multer (v1.4.5-lts.1): Middleware para manejar datos de formulario multipart/form-data.
- Socket.io (v4.6.2): Biblioteca para la comunicación en tiempo real basada en WebSockets.
- Sweetalert2 (v11.7.12): Biblioteca para mostrar mensajes y alertas personalizadas.
- Connect-mongo (v5.0.0): Middleware para almacenar sesiones de Express.js en MongoDB.
- Cookie-parser (v1.4.6): Middleware para analizar cookies en las solicitudes de Express.js.
- Express-session (v1.17.3): Middleware para manejar sesiones en Express.js.
- Mongoose-paginate-v2 (v1.7.1): Plugin de paginación para Mongoose.
- Bcrypt (v5.1.0): Biblioteca para el hashing seguro de contraseñas.
- Passport (v0.6.0): Middleware para autenticación en Node.js.
- Passport-github2 (v0.1.12): Estrategia de autenticación para Passport usando OAuth 2.0 con GitHub.
- Passport-local (v1.0.0): Estrategia de autenticación para Passport basada en credenciales locales.

## DevDependencies

El proyecto utiliza las siguientes devDependencies:

- Nodemon (v2.0.22): Utilidad que monitoriza cambios en los archivos y reinicia automáticamente la aplicación.

Estas dependencias pueden ser instaladas ejecutando el comando `npm install` en el directorio del proyecto.
