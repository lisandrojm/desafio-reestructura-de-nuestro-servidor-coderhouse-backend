/* ************************************************************************** */
/* /src/components/sessions/index.js - Contiene las rutas y controladores de  
sessionsController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router'); // Assuming you have a CustomRouter defined similarly to the first code snippet
const sessionsController = require('./sessionsController/sessionsController');

class SessionsRoutes extends CustomRouter {
  constructor() {
    super(); // Set the base path for the routes
    this.setupRoutes();
  }

  setupRoutes() {
    const basePath = '/api/sessions'; // Almacena el prefijo de la ruta

    // Rutas para manejar las sesiones
    this.get(`${basePath}/session`, sessionsController.getSession);
    this.get(`${basePath}/deletesession`, sessionsController.deleteSession);
  }
}

module.exports = new SessionsRoutes();
