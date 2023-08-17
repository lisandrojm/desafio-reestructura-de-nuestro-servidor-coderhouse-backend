/* ************************************************************************** */
/* /src/components/messages/index.js - Contiene las rutas y controladores de 
messagesController.js. */
/* ************************************************************************** */

const CustomRouter = require('../../routes/router');
const messagesController = require('./messagesController/messagesController');
const { validateMessageId } = require('../../utils/routes/routerParams');

class Messages extends CustomRouter {
  constructor() {
    super(); // Set the base path for the routes
    this.setupRoutes();
  }

  setupRoutes() {
    // Middleware para manejar el parámetro mid
    this.router.param('mid', validateMessageId);

    const basePath = '/api/chat'; // Almacena el prefijo de la ruta

    // Rutas para manejar los mensajes
    this.get(`${basePath}/`, messagesController.getAllMessages);
    this.post(`${basePath}/`, messagesController.addUserMessage);
    this.delete(`${basePath}/:mid`, messagesController.deleteUserMessage);
  }
}

module.exports = new Messages();
