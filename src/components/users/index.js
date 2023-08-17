/* ************************************************************************** */
/* /src/components/users/index.js - Contiene las rutas y controladores de 
usersController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router'); // Assuming you have a CustomRouter defined similarly to the first code snippet
const usersController = require('./usersController/usersController');
const { validateUserId } = require('../../utils/routes/routerParams');

class UsersRoutes extends CustomRouter {
  constructor() {
    super(); // Set the base path for the routes
    this.setupRoutes();
  }

  setupRoutes() {
    // Middleware para manejar los parámetros cid y pid
    this.router.param('uid', validateUserId);

    const basePath = '/api/session/useradmin'; // Almacena el prefijo de la ruta

    // Rutas para manejar los usuarios
    this.get(`${basePath}/`, usersController.getUsers);
    this.post(`${basePath}/recovery`, usersController.recoveryUser);
    this.get(`${basePath}/:uid`, usersController.getUserById);
    this.put(`${basePath}/:uid`, usersController.updateUser);
    this.delete(`${basePath}/:uid`, usersController.deleteUser);
  }
}

module.exports = new UsersRoutes();
