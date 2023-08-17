/* ************************************************************************** */
/* /src/components/roles/index.js - Contiene las rutas y controladores de  
rolesController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router'); // Assuming you have a CustomRouter defined similarly to the first code snippet
const rolesController = require('./rolesController/rolesController');

class RolesRoutes extends CustomRouter {
  constructor() {
    super(); // Set the base path for the routes
    this.setupRoutes();
  }

  setupRoutes() {
    const basePath = '/api/sessions'; // Almacena el prefijo de la ruta

    // Rutas para manejar los roles
    this.get(`${basePath}/admintest`, rolesController.getAdmin);
    this.get(`${basePath}/usertest`, rolesController.getUser);
  }
}

module.exports = new RolesRoutes();
